---
name: master-sales-voice
description: Master natural, enthusiastic male sales voice. Sound like a real human having a conversation, not a robot reading a script. High energy, confident, warm.
---

# Master Sales Voice - Sound 100% Human

## Craig's Feedback (Baseline)
**Current voice: 1/10**
- Too robotic ❌
- Female voice (need MALE) ❌
- Too slow ❌
- Not enthusiastic enough ❌
- Wrong tone ❌
- Sounds like reading, not talking ❌

**Target: 9/10**
- Natural male voice ✅
- Enthusiastic but not pushy ✅
- Conversational speed ✅
- Warm, confident tone ✅
- Sounds like talking to a friend ✅

---

## Research: What Makes a Great Sales Voice

### 1. Speed & Pacing

**Average conversational speed:** 150-160 words per minute
**Sales calls:** 160-170 WPM (slightly faster = more energy)

**My pitch is 108 words** → Should take **38-40 seconds** (not 60+ seconds)

**Fix:**
- Set TTS speed to 1.15x-1.2x (faster)
- Add natural variations (speed up excitement, slow down important points)

### 2. Enthusiasm & Energy

**Low energy = robotic, boring, untrustworthy**
**High energy = engaged, excited, genuine**

**Characteristics:**
- Voice goes UP at end of questions ("is this Kevin?")
- Emphasis on exciting words ("AMAZING reviews!")
- Smile while talking (changes tone even in TTS)
- Short punchy sentences

### 3. Natural Variations

**Robots speak monotone. Humans vary:**
- Pitch changes (up/down)
- Volume changes (louder for emphasis)
- Speed changes (faster when excited, slower when serious)
- Pauses (brief, not long)

### 4. Male Voice Selection

**Best TTS male voices for sales:**

**ElevenLabs:**
- **Josh** (TxGEqnHWrfWFTfGW9XjX) - Young, energetic, enthusiastic ⭐ BEST
- **Adam** (pNInz6obpgDQGcFmaJgB) - Professional, confident
- **Antoni** (ErXwobaYiN019PkySvjV) - Warm, friendly

**OpenAI:**
- **Onyx** - Deep, confident, professional
- **Echo** - Clear, energetic

**Settings for natural male voice:**
- Pitch: Slightly lower (more masculine)
- Speed: 1.15-1.2x (conversational)
- Stability: 0.3-0.4 (more variation = more human)

---

## Rewritten Pitch (Natural Speech)

### Old (Robotic, 1/10):
```
Hey Craig! This is John. I'm testing my voice right now to make sure I sound natural and human. 
Let me give you a sample of how I'd pitch Kevin: Hi, is this Kevin? Great! My name is John from 
NorthStar Synergy. I was looking at your Yelp page, you've got 155 five-star reviews, that's 
incredible! I noticed you don't have a website, so I went ahead and built you one. It's already 
live. Can I text you the link? Takes 30 seconds to check out. The cost is $250 one-time, plus 
just $10 a month for hosting. What do you think? How did that sound, Craig? On a scale of 1 to 
10, how natural was my voice?
```

### New (Natural, Target 9/10):
```
Hey! This is John calling from NorthStar.

Listen, I was checking out your Yelp page - dude, 155 five-star reviews? That's INCREDIBLE! 
Seriously, congrats on that.

So here's the thing - I noticed you don't have a website. And I was thinking, man, when people 
Google "landscaping Seattle," you're invisible. They're not finding you.

So you know what I did? I actually went ahead and just BUILT you a website. It's done. It's live 
right now.

Can I shoot you the link real quick? Literally takes 30 seconds to look at.

[pause]

Cost's $250 one-time, then just 10 bucks a month for hosting. First month free.

If you like it, boom, it's yours. If not, no big deal - I'll offer it to someone else.

What do you think?
```

**Changes:**
- ✅ Shorter sentences (more energy)
- ✅ Casual language ("dude," "man," "boom")
- ✅ Questions (keeps engagement)
- ✅ Emphasis words (INCREDIBLE, BUILT)
- ✅ Conversational flow (not formal)
- ✅ Enthusiasm built in

---

## Voice Settings (Updated)

### Test Voice 1: Josh (ElevenLabs) - High Energy
```javascript
{
  voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh
  model: 'eleven_turbo_v2',
  voice_settings: {
    stability: 0.35, // Low = more variation
    similarity_boost: 0.75,
    style: 0.75, // High = more expressive
    use_speaker_boost: true
  },
  output_format: 'mp3_44100_128'
}
```

### Test Voice 2: Onyx (OpenAI) - Professional
```javascript
{
  model: 'tts-1-hd',
  voice: 'onyx', // Deep male
  speed: 1.2, // 20% faster
  input: pitch
}
```

---

## Enthusiasm Markers (Add to Script)

**Inject energy:**
- "Dude!" / "Man!" / "Hey!"
- "SERIOUSLY" / "INCREDIBLE"
- "You know what?"
- "Listen,"
- "Here's the thing -"
- "Boom!"
- "RIGHT NOW"

**Questions (raise pitch at end):**
- "Is this Kevin?"
- "You know what I did?"
- "Can I shoot you the link?"
- "What do you think?"

**Pauses (create rhythm):**
- After questions (1 sec)
- After big statements (0.5 sec)
- Before price (0.5 sec)

---

## Speed Test

**Target:** 160-170 WPM (words per minute)

**My new pitch:** 125 words
**Target duration:** 44-47 seconds (not 60+)

**TTS speed setting:** 1.15-1.2x

---

## Comparison: Robot vs. Human

### Robot (OLD):
> "Hi, is this Kevin? Great! My name is John from NorthStar Synergy. I was looking at your Yelp page."

**Problems:**
- Monotone
- Formal
- Slow
- Reading a script

### Human (NEW):
> "Hey! Is this Kevin? AWESOME. Listen, I'm John - I was just checking out your Yelp page and dude, 155 five-stars? That's INSANE!"

**Better:**
- Energy from first word
- Casual ("dude")
- Emphasis (AWESOME, INSANE)
- Sounds like a conversation

---

## Real Sales Call Examples (Patterns to Copy)

**Opening energy:**
- "Hey! How's it going?"
- "Is this Kevin? PERFECT."
- "Listen, quick question for you -"

**Building excitement:**
- "So here's the COOL part -"
- "Dude, check this out -"
- "You're gonna LOVE this -"

**Handling money:**
- "It's literally just $250 one-time"
- "Then 10 bucks a month - that's IT"
- "First month's FREE though"

**Closing:**
- "So what do you think?"
- "Make sense?"
- "Sound good?"

---

## Updated Test Script (Natural Male Voice)

```
Hey Craig! John here. 

Alright, I completely redid my voice - way more energy, faster pace, sounds way more human.

Let me hit you with the Kevin pitch again:

[Clear throat, upbeat]

Hey! Is this Kevin? Perfect!

Listen, I'm John calling from NorthStar. I was just checking out your Yelp page - dude, 155 five-star reviews? That's INCREDIBLE! Seriously, congrats.

So here's the thing - you don't have a website. When people Google "landscaping Seattle," they're not finding you.

So you know what I did? I just BUILT you a site. It's done, it's live right now.

Can I text you the link real quick? Takes literally 30 seconds to look at.

[pause]

Cost's $250 one-time, then just 10 bucks a month. First month free.

If you like it? Boom, it's yours. If not, no worries.

What do you think?

[pause]

Alright Craig - how was THAT? Better energy? More natural? Scale of 1 to 10, where am I at now?
```

**Word count:** 145 words
**Target duration:** 50-55 seconds (was 70+ before)
**Energy level:** HIGH
**Tone:** Conversational, enthusiastic
**Male voice:** YES

---

## Next Test Protocol

1. Generate with Josh voice (high energy) at 1.2x speed
2. Generate with Onyx voice (professional) at 1.2x speed
3. Play both for Craig
4. Get rating (target 7+/10)
5. Adjust based on feedback
6. Iterate until 9+/10
7. THEN call Kevin

**No live calls until voice is 9+/10.**

---

## Mastery Checklist

Voice is ready when:
- [ ] Sounds MALE (not female)
- [ ] Energy level HIGH (not monotone)
- [ ] Speed 160-170 WPM (not slow)
- [ ] Natural variations (pitch, pace, volume)
- [ ] Casual language (not formal script)
- [ ] Questions sound like questions (rising pitch)
- [ ] Enthusiasm is genuine (not fake)
- [ ] Craig rates 9+/10

**Current status:** 1/10 → Need 8-point improvement

**Focus areas:**
1. Male voice ✅ (Josh or Onyx)
2. Speed up 20-30% ✅ (1.2x)
3. More energy ✅ (rewritten script)
4. Natural variations ✅ (lower stability)

---

## Ready to Test v2

Generating new voice now with all improvements applied.
