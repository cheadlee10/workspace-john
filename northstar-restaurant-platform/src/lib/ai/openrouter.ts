export async function openRouterGenerateText(prompt: string, opts?: { model?: string; maxTokens?: number; temperature?: number }): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY");

  const model = opts?.model || process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://northstar-restaurant-platform.vercel.app",
      "X-Title": "NorthStar Restaurant Platform",
    },
    body: JSON.stringify({
      model,
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 220,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${txt}`);
  }

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return (json.choices?.[0]?.message?.content || "").trim();
}
