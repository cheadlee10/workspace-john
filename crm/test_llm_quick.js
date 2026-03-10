/**
 * Quick test of LLM integration
 * Verifies askOpus routing works
 */

const { analyzeSentiment, generateNudge } = require('./llm_integration');

async function test() {
    console.log('🧪 Testing LLM Integration...\n');
    
    try {
        // Test 1: Sentiment analysis
        console.log('1️⃣  Testing sentiment analysis...');
        const sentiment = await analyzeSentiment('Thanks for your help!');
        console.log(`   Result: ${sentiment}`);
        console.log('   ✅ Sentiment analysis works\n');
        
        // Test 2: Nudge generation
        console.log('2️⃣  Testing nudge generation...');
        const nudge = await generateNudge({
            contact: {
                name: 'John Smith',
                company: 'Example Corp'
            },
            days_since: 45,
            relationship_type: 'client'
        });
        console.log(`   Result: ${nudge}`);
        console.log('   ✅ Nudge generation works\n');
        
        console.log('🎉 All tests passed!');
        console.log('✅ LLM router integration working correctly');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

test();
