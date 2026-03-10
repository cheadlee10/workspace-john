import { NextRequest, NextResponse } from "next/server";
import { createFaq, getAllFaqs, getPublicFaqs, searchFaqs, getFaqsByCategory } from "@/lib/support/faq-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const publicOnly = searchParams.get("public") === "true";

    let faqs;
    if (query) {
      faqs = await searchFaqs(query);
    } else if (category) {
      faqs = await getFaqsByCategory(category);
    } else if (publicOnly) {
      faqs = await getPublicFaqs();
    } else {
      faqs = await getAllFaqs();
    }

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("[FAQs API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.question || !body.answer) {
      return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
    }
    if (typeof body.question !== "string" || body.question.length > 500) {
      return NextResponse.json({ error: "question must be a string of 500 characters or fewer" }, { status: 400 });
    }
    if (typeof body.answer !== "string" || body.answer.length > 5000) {
      return NextResponse.json({ error: "answer must be a string of 5000 characters or fewer" }, { status: 400 });
    }
    if (body.category && (typeof body.category !== "string" || body.category.length > 100)) {
      return NextResponse.json({ error: "category must be a string of 100 characters or fewer" }, { status: 400 });
    }

    const faq = await createFaq(body);
    return NextResponse.json({ faq }, { status: 201 });
  } catch (err) {
    console.error("[FAQs POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
