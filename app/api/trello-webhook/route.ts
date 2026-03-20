import { NextRequest, NextResponse } from "next/server";
import type { TrelloWebhookPayload } from "./types";

export async function GET(): Promise<NextResponse> {
  return new NextResponse("OK", { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    console.log("[trello-webhook] Card moved to Ready:", {
      id: card.id,
      name: card.name,
      description: card.desc,
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[trello-webhook] Failed to process payload:", error);
    return NextResponse.json(
      { error: "Failed to process webhook payload" },
      { status: 400 }
    );
  }
}
