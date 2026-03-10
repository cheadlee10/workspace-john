// proper-voice.js - Generate MALE voice with proper speed
const OpenAI = require('openai')
const fs = require('fs')
const path = require('path')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function generateMaleVoice(text, outputPath = 'test-voice.mp3') {
  console.log('🎙️ Generating MALE voice (Onyx, 1.5x speed)...')
  
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1-hd',        // High definition
    voice: 'onyx',            // MALE - deep, confident
    speed: 1.5,               // 50% FASTER
    input: text
  })
  
  const buffer = Buffer.from(await mp3.arrayBuffer())
  const fullPath = path.resolve(outputPath)
  fs.writeFileSync(fullPath, buffer)
  
  console.log(`✅ Generated: ${fullPath}`)
  console.log(`💰 Cost: ~$0.01`)
  
  return fullPath
}

// Test with Craig
const testPitch = `
Hey Craig! John here with voice version 3.

Alright, this time I'm using OpenAI's ONYX voice - that's a deep MALE voice - at 1.5x speed.

Let me hit you with the Kevin pitch:

Hey! Is this Kevin? Perfect!

Listen, I'm John calling from NorthStar. I was just checking out your Yelp page - dude, 155 five-star reviews? That's INCREDIBLE! Seriously, congrats.

So here's the thing - you don't have a website. When people Google landscaping Seattle, they're not finding you.

So you know what I did? I just BUILT you a site. It's done, it's live right now.

Can I text you the link real quick? Takes literally 30 seconds to look at.

Cost's 250 bucks one-time, then just 10 bucks a month. First month free.

If you like it? Boom, it's yours. If not, no worries.

What do you think?

Alright Craig - how's THIS version? Better? On the 1-to-10 scale?
`

generateMaleVoice(testPitch, 'voice-test-v3.mp3')
  .then(file => {
    console.log('\n🔊 Play this file:', file)
    console.log('\nIf this STILL sounds wrong, something is misconfigured.')
  })
  .catch(err => {
    console.error('❌ Error:', err.message)
    if (err.message.includes('API key')) {
      console.log('\n⚠️  Need OpenAI API key. Get one at: https://platform.openai.com/api-keys')
      console.log('Then set: $env:OPENAI_API_KEY="sk-..."')
    }
  })
