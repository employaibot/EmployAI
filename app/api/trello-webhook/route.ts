import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import type { TrelloWebhookPayload } from "./types";

const TRELLO_WEBHOOK_SECRET = process.env.TRELLO_WEBHOOK_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const AGENT_LISTENER_URL = process.env.AGENT_LISTENER_URL;
const AGENT_SECRET = process.env.AGENT_SECRET;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 50)
}

function verifyTrelloSignature(
  body: string,
  headerSignature: string | null,
): boolean {
  if (!headerSignature || !TRELLO_WEBHOOK_SECRET || !CALLBACK_URL) {
    return false;
  }
  const content = body + CALLBACK_URL;
  const expected = crypto
    .createHmac("sha1", TRELLO_WEBHOOK_SECRET)
    .update(content)
    .digest("base64");
  return crypto.timingSafeEqual(
    Buffer.from(headerSignature),
    Buffer.from(expected),
  );
}

async function forwardToAgentListener(
  taskId: string,
  cardName: string,
  cardDesc: string,
  acceptanceCriteria: string[],
  branchSlug: string,
): Promise<void> {
  if (!AGENT_LISTENER_URL || !AGENT_SECRET) {
    console.warn(
      "[trello-webhook] AGENT_LISTENER_URL or AGENT_SECRET not set — skipping forward",
    );
    return;
  }

  try {
    const response = await fetch(`${AGENT_LISTENER_URL}/run-agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-agent-secret": AGENT_SECRET,
      },
      body: JSON.stringify({
        taskId,
        branchSlug,
        description: `${cardName} — ${cardDesc}`,
        acceptanceCriteria,
      }),
    });

    if (response.ok) {
      console.log(
        `[trello-webhook] Task ${taskId} successfully forwarded to agent listener.`,
      );
    } else {
      console.error(
        `[trello-webhook] Agent listener returned ${response.status} for task ${taskId}.`,
      );
    }
  } catch (err) {
    console.error(
      `[trello-webhook] Failed to forward task ${taskId} to agent listener:`,
      err,
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return new NextResponse("OK", { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const headerSignature = request.headers.get("x-trello-webhook");

  if (!verifyTrelloSignature(body, headerSignature)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload: TrelloWebhookPayload = JSON.parse(body) as TrelloWebhookPayload;
    const { action } = payload;

    if (action.type !== "updateCard") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const listAfter = action.data.listAfter;
    if (!listAfter || listAfter.name !== "Ready") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const card = action.data.card;
    if (!card) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const checklistItems = action.data.checklist?.checkItems ?? [];
    const acceptanceCriteria =
      checklistItems.length > 0
        ? checklistItems.map((item) => item.name)
        : [card.name];

    console.log("ORCHESTRATOR: New task received");
    console.log(`Task ID: ${card.id}`);
    console.log(`Description: ${card.name} — ${card.desc}`);
    console.log(
      `Acceptance criteria:\n${acceptanceCriteria.map((c) => `- ${c}`).join("\n")}`,
    );

    const branchSlug = slugify(card.name)
    await forwardToAgentListener(card.id, card.name, card.desc, acceptanceCriteria, branchSlug);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[trello-webhook] Failed to process payload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
