// proper-free-voice.js - FREE male voice using edge-tts npm package
const EdgeTTS = require('edge-tts').default
const fs = require('fs')
const path = require('path')

async function generateProperMaleVoice(text) {
  console.log('🎙️ Generating FREE male voice (Microsoft Edge TTS)...')
  
  const tts = new EdgeTTS()
  
  // Set voice: Eric = young energetic male
  await tts.setMetadata('en-US-EricNeural', EdgeTTS.OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
  
  const readable = tts.toStream(text, {
    rate: '+30%', // 30% faster
    pitch: '+0Hz'
  })
  
  const outputPath = path.resolve('craig-test-male-voice.mp3')
  const writable = fs.createWriteStream(outputPath)
  
  return new Promise((resolve, reject) => {
    readable.pipe(writable)
    
    writable.on('finish', () => {
      console.log(`\n✅ Generated: ${outputPath}`)
      console.log(`💰 Cost: $0.00 (FREE!)`)
      console.log(`🎤 Voice: en-US-EricNeural (young male)`)
      console.log(`⚡ Speed: +30% faster`)
      resolve(outputPath)
    })
    
    writable.on('error', reject)
  })
}

const pitch = `Hey Craig! John here. This is voice version 3 using FREE Microsoft Edge TTS. This time it's ACTUALLY a male voice, Eric Neural, young and energetic, at 30 percent faster speed. Let me hit you with the Kevin pitch. Hey! Is this Kevin? Perfect! Listen, I'm John calling from NorthStar. I was just checking out your Yelp page, dude, 155 five-star reviews? That's INCREDIBLE! Seriously, congrats. So here's the thing, you don't have a website. When people Google landscaping Seattle, they're not finding you. So you know what I did? I just BUILT you a site. It's done, it's live right now. Can I text you the link real quick? Takes literally 30 seconds to look at. Cost's 250 bucks one-time, then just 10 bucks a month. First month free. If you like it? Boom, it's yours. If not, no worries. What do you think? Alright Craig, THIS should sound like an actual dude talking. Rate it 1 to 10!`

generateProperMaleVoice(pitch)
  .then(file => {
    console.log('\n🔊 Playing audio...')
    require('child_process').exec(`start "" "${file}"`)
  })
  .catch(err => {
    console.error('❌ Error:', err)
  })
