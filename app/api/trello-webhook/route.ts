import { NextRequest, NextResponse } from "next/server";
import type { TrelloWebhookPayload } from "./types";

const TRELLO_WEBHOOK_SECRET = process.env.TRELLO_WEBHOOK_SECRET;

export async function GET(): Promise<NextResponse> {
  return new NextResponse("OK", { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.headers.get("x-trello-webhook");
  if (!secret || secret !== TRELLO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload: TrelloWebhookPayload = await request.json();
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
        ? checklistItems.map((item) => `- ${item.name}`).join("\n")
        : `- ${card.name}`;

    console.log("ORCHESTRATOR: New task received");
    console.log(`Task ID: ${card.id}`);
    console.log(`Description: ${card.name} — ${card.desc}`);
    console.log(`Acceptance criteria:\n${acceptanceCriteria}`);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[trello-webhook] Failed to process payload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
