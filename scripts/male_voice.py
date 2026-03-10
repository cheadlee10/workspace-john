# male_voice.py - FREE male TTS
import asyncio
import edge_tts

async def generate_male_voice():
    text = """Hey Craig! John here. This is voice version 3, using FREE Microsoft Edge TTS. This time it's ACTUALLY a male voice, Eric Neural, young and energetic, at faster speed. Let me hit you with the Kevin pitch. Hey! Is this Kevin? Perfect! Listen, I'm John calling from NorthStar. I was just checking out your Yelp page, dude, 155 five-star reviews? That's INCREDIBLE! Seriously, congrats. So here's the thing, you don't have a website. When people Google landscaping Seattle, they're not finding you. So you know what I did? I just BUILT you a site. It's done, it's live right now. Can I text you the link real quick? Takes literally 30 seconds to look at. Cost's 250 bucks one-time, then just 10 bucks a month. First month free. If you like it? Boom, it's yours. If not, no worries. What do you think? Alright Craig, THIS should sound like an actual dude talking. Rate it 1 to 10!"""
    
    voice = "en-US-EricNeural"  # Young, energetic MALE
    output_file = "male-voice-final.mp3"
    
    rate = "+30%"  # 30% faster
    
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_file)
    
    print(f"\n✅ Generated: {output_file}")
    print(f"💰 Cost: $0.00 (FREE!)")
    print(f"🎤 Voice: {voice} (young male)")
    print(f"⚡ Speed: {rate}")
    
    # Auto-play
    import os
    os.system(f'start "" "{output_file}"')

if __name__ == "__main__":
    asyncio.run(generate_male_voice())
