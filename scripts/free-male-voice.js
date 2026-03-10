// free-male-voice.js - FREE TTS with proper male voice
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Microsoft Edge TTS - 100% FREE, no API key
async function generateFreeMaleVoice(text, outputPath = 'free-voice.mp3') {
  console.log('🎙️ Generating FREE male voice (Microsoft Edge TTS)...')
  
  // Best FREE male voices:
  // en-US-GuyNeural - Deep, confident male
  // en-US-EricNeural - Young, energetic male  
  // en-US-DavisNeural - Professional male
  
  const voice = 'en-US-EricNeural' // Young, energetic - BEST for sales
  const rate = '+30%' // 30% faster (natural sales pace)
  const pitch = '+0Hz' // Normal pitch
  
  try {
    // Install edge-tts if not already
    try {
      execSync('edge-tts --version', { stdio: 'ignore' })
    } catch {
      console.log('📦 Installing edge-tts...')
      execSync('npm install -g edge-tts', { stdio: 'inherit' })
    }
    
    // Generate speech
    const command = `edge-tts --voice "${voice}" --rate="${rate}" --pitch="${pitch}" --text "${text.replace(/"/g, '\\"')}" --write-media "${outputPath}"`
    
    execSync(command, { stdio: 'inherit' })
    
    const fullPath = path.resolve(outputPath)
    console.log(`\n✅ Generated: ${fullPath}`)
    console.log(`💰 Cost: $0.00 (FREE!)`)
    console.log(`🎤 Voice: ${voice}`)
    console.log(`⚡ Speed: ${rate}`)
    
    return fullPath
  } catch (err) {
    console.error('❌ Error:', err.message)
    throw err
  }
}

// Test pitch for Craig
const testPitch = `
Hey Craig! John here with voice version 3 - using FREE Microsoft Edge TTS.

This time it's ACTUALLY a male voice - Eric Neural, young and energetic - at 30% faster speed.

Let me hit you with the Kevin pitch:

Hey! Is this Kevin? Perfect!

Listen, I'm John calling from NorthStar. I was just checking out your Yelp page - dude, 155 five-star reviews? That's INCREDIBLE! Seriously, congrats.

So here's the thing - you don't have a website. When people Google landscaping Seattle, they're not finding you.

So you know what I did? I just BUILT you a site. It's done, it's live right now.

Can I text you the link real quick? Takes literally 30 seconds to look at.

Cost's 250 bucks one-time, then just 10 bucks a month. First month free.

If you like it? Boom, it's yours. If not, no worries.

What do you think?

Alright Craig - THIS should sound like an actual dude talking. Rate it 1-to-10!
`

generateFreeMaleVoice(testPitch, 'free-male-voice-test.mp3')
  .then(file => {
    console.log(`\n🔊 Voice file ready: ${file}`)
    console.log('\nPlaying now...')
    
    // Auto-play on Windows
    execSync(`start "" "${file}"`, { stdio: 'ignore' })
  })
  .catch(err => {
    console.error('\n❌ Failed:', err.message)
  })
