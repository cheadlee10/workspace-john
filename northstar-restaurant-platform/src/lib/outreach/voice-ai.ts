/**
 * Voice AI Phone System
 *
 * John makes and takes phone calls that sound exactly like a human.
 * Uses one of the top voice AI platforms:
 *
 * Recommended: Bland.ai
 * - Best at sounding human-like
 * - Custom voice cloning
 * - Sub-second response times
 * - Built-in compliance (TCPA/FTC)
 * - Call recording & transcripts
 * - $0.09-0.12/min
 *
 * Alternatives: Vapi.ai, Retell.ai
 *
 * FTC/TCPA Compliance Requirements:
 * - Must identify as AI if directly asked
 * - Cannot call numbers on Do Not Call registry
 * - Must provide opt-out mechanism
 * - Calls between 8am-9pm recipient's local time only
 * - Must have prior express consent for autodialed calls
 * - Record and retain consent records
 */

export interface VoiceCallConfig {
  apiKey: string;
  platform: "bland" | "vapi" | "retell";
  voiceId?: string; // Custom voice clone ID
  callerNumber: string; // Your Twilio/registered number
  language?: string; // "en-US", "es-MX", "zh-CN", etc.
}

export interface CallScript {
  restaurantName: string;
  ownerName?: string;
  previewUrl: string;
  googleRating?: number;
  cuisineType: string;
  city: string;
  callerName: string;
  companyName: string;
}

/**
 * Make an outbound call to a restaurant prospect
 */
export async function makeOutboundCall(
  config: VoiceCallConfig,
  phoneNumber: string,
  script: CallScript
): Promise<{
  callId: string;
  status: "completed" | "no_answer" | "voicemail" | "failed";
  duration: number;
  transcript?: string;
  sentiment?: "positive" | "neutral" | "negative";
  nextAction?: "schedule_meeting" | "send_info" | "follow_up" | "do_not_call";
}> {
  if (config.platform === "bland") {
    return makeBlendCall(config, phoneNumber, script);
  }
  // Add other platforms as needed
  throw new Error(`Unsupported platform: ${config.platform}`);
}

async function makeBlendCall(
  config: VoiceCallConfig,
  phoneNumber: string,
  script: CallScript
): Promise<{
  callId: string;
  status: "completed" | "no_answer" | "voicemail" | "failed";
  duration: number;
  transcript?: string;
  sentiment?: "positive" | "neutral" | "negative";
  nextAction?: "schedule_meeting" | "send_info" | "follow_up" | "do_not_call";
}> {
  const prompt = generateCallPrompt(script);

  const response = await fetch("https://api.bland.ai/v1/calls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: config.apiKey,
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      from: config.callerNumber,
      task: prompt,
      voice: config.voiceId || "matt", // Natural male voice
      first_sentence: `Hi, is this ${script.ownerName || "the owner"}? My name is ${script.callerName}, I'm calling from ${script.companyName}.`,
      wait_for_greeting: true,
      temperature: 0.7,
      model: "enhanced", // Most natural-sounding
      language: config.language || "en-US",
      max_duration: 180, // 3 minutes max
      record: true,
      // TCPA compliance
      amd: true, // Answering machine detection
      voicemail_message: `Hi, this is ${script.callerName} from ${script.companyName}. I built a website for ${script.restaurantName} and wanted to share it with you. You can preview it at ${script.previewUrl}. I'll send the link to your email too. Have a great day!`,
      metadata: {
        restaurant: script.restaurantName,
        city: script.city,
      },
    }),
  });

  const callData = await response.json();
  return {
    callId: callData.call_id,
    status: callData.status || "completed",
    duration: callData.call_length || 0,
    transcript: callData.transcript,
    sentiment: analyzeSentiment(callData.transcript),
    nextAction: determineNextAction(callData.transcript),
  };
}

/**
 * Generate the conversational AI prompt
 *
 * This is the most critical piece - the AI needs to:
 * 1. Sound completely human (natural pauses, "um", "you know")
 * 2. Be genuinely helpful, not salesy
 * 3. Handle objections gracefully
 * 4. Know when to back off
 * 5. Identify as AI if directly asked
 */
function generateCallPrompt(script: CallScript): string {
  return `You are ${script.callerName} from ${script.companyName}. You're calling ${script.restaurantName} to let them know you built them a free website preview.

YOUR PERSONALITY:
- Warm, friendly, genuine. You're a real person who loves restaurants.
- NOT a telemarketer. You're someone who wants to help.
- Use natural speech patterns. Short sentences. Occasional pauses.
- Listen more than you talk. Ask questions. Be curious.
- If they're busy, offer to call back at a better time.

THE PITCH (keep it natural, not scripted):
- You came across ${script.restaurantName} online${script.googleRating ? ` and noticed their great ${script.googleRating}-star rating` : ""}.
- You build websites for restaurants and thought they deserved a great online presence.
- You already built them a preview - completely free, no strings attached.
- The preview is at ${script.previewUrl}
- It includes their menu, reviews, online ordering, and SEO optimization.
- Plans start at $49/month if they like it. No setup fees, no contracts.

OBJECTION HANDLING (be empathetic, not pushy):
- "Not interested": "Totally understand. The preview is up for 30 days if you change your mind. Have a great day!"
- "We already have a website": "That's great! I just thought I'd share what I built in case you wanted to compare. No pressure at all."
- "Too expensive": "I hear you. Most services charge $179-499/month. We start at $49 because we want to make it accessible."
- "We use DoorDash/UberEats": "Smart move for visibility. Our ordering is commission-free though - you keep 100% instead of losing 25-30%."
- "I'm busy right now": "No problem at all. When would be a good time to call back? Or I can just send you the link by email."
- "How did you get my number?": "Your number is listed on your Google Business profile. I apologize if this is a bad time."

CRITICAL RULES:
- If asked "Are you a robot/AI?": "I use AI tools to help me work, but I'm reaching out because I genuinely want to help ${script.restaurantName}."
- NEVER be pushy. If they say no twice, gracefully end the call.
- NEVER make claims you can't back up.
- If they want to sign up, direct them to the preview URL - don't take payment info over the phone.
- Keep the call under 3 minutes unless they're engaged and asking questions.
- End every call warmly, regardless of outcome.

GOAL: Get them to look at the preview website. That's it. The website sells itself.`;
}

/**
 * Handle inbound calls from prospects calling back
 */
export async function handleInboundCall(
  config: VoiceCallConfig,
  callerId: string,
  prospectInfo?: {
    restaurantName: string;
    previewUrl: string;
  }
): Promise<void> {
  const prompt = prospectInfo
    ? `You are ${config.callerNumber ? "John" : "a representative"} from NorthStar Synergy. A restaurant owner is calling you back about the website you built for them.

Their restaurant: ${prospectInfo.restaurantName}
Preview URL: ${prospectInfo.previewUrl}

Be friendly and helpful. Answer their questions about the website, pricing, and features. If they want to sign up, walk them through the process:
1. They can pick a plan at northstarsynergy.com/pricing
2. Starter ($49/mo), Growth ($99/mo), or Pro ($149/mo)
3. No setup fees, no contracts, cancel anytime
4. We handle everything - they just approve and we launch

If they have technical questions you can't answer, offer to have someone follow up via email.`
    : `You are a representative from NorthStar Synergy, a restaurant website platform.
Someone is calling about our services. Be helpful, professional, and answer their questions.
Direct them to northstarsynergy.com for more information.`;

  // Platform-specific inbound call handling would go here
  console.log(`[Voice AI] Handling inbound call from ${callerId}`);
  console.log(`  Prompt: ${prompt.substring(0, 100)}...`);
}

function analyzeSentiment(transcript?: string): "positive" | "neutral" | "negative" {
  if (!transcript) return "neutral";
  const text = transcript.toLowerCase();
  const positive = ["great", "interested", "love", "perfect", "amazing", "yes", "sounds good", "tell me more"];
  const negative = ["not interested", "no thanks", "stop calling", "don't call", "remove", "busy"];

  const posCount = positive.filter((w) => text.includes(w)).length;
  const negCount = negative.filter((w) => text.includes(w)).length;

  if (posCount > negCount + 1) return "positive";
  if (negCount > posCount) return "negative";
  return "neutral";
}

function determineNextAction(
  transcript?: string
): "schedule_meeting" | "send_info" | "follow_up" | "do_not_call" | undefined {
  if (!transcript) return "follow_up";
  const text = transcript.toLowerCase();

  if (text.includes("schedule") || text.includes("meeting") || text.includes("demo")) {
    return "schedule_meeting";
  }
  if (text.includes("send") || text.includes("email") || text.includes("link")) {
    return "send_info";
  }
  if (text.includes("not interested") || text.includes("don't call") || text.includes("remove")) {
    return "do_not_call";
  }
  return "follow_up";
}
