/**
 * CRM LLM Integration
 * Routes all AI calls through centralized llm-router
 * 
 * Usage from Node.js:
 *   const { generateContactSummary, generateEmailDraft } = require('./llm_integration');
 *   const summary = await generateContactSummary(contactData);
 * 
 * Usage from Python:
 *   import subprocess, json
 *   result = subprocess.run(['node', 'llm_integration.js', 'summarize', json.dumps(data)], capture_output=True)
 *   summary = json.loads(result.stdout)
 */

// Fix environment variable conflict (prioritize OAuth token)
delete process.env.ANTHROPIC_API_KEY;

const { askOpus } = require('C:/Users/chead/llm-router/shared/llm-router');

/**
 * Generate relationship summary for a contact
 * 
 * @param {Object} contactData - Contact info and interaction history
 * @param {string} contactData.name - Contact name
 * @param {string} contactData.email - Contact email
 * @param {string} contactData.company - Company name
 * @param {Array} contactData.interactions - Recent interactions
 * @param {Array} contactData.timeline - Timeline entries
 * @returns {Promise<Object>} { summary_text, key_points[] }
 */
async function generateContactSummary(contactData) {
    const prompt = `You are a personal CRM assistant. Generate a concise relationship summary for this contact.

**Contact:**
Name: ${contactData.name || 'Unknown'}
Email: ${contactData.email}
Company: ${contactData.company || 'Unknown'}

**Recent Interactions:**
${contactData.interactions.slice(0, 10).map(i => 
    `- ${i.timestamp}: ${i.type} - ${i.subject || i.snippet}`
).join('\n')}

**Timeline Highlights:**
${contactData.timeline.slice(0, 5).map(t => 
    `- ${t.timestamp}: ${t.title || t.content.substring(0, 100)}`
).join('\n')}

Generate a relationship summary with:
1. A 2-3 sentence overview of your relationship
2. Key topics you discuss
3. Their communication style (formal, casual, etc.)
4. Any patterns or insights

Return JSON:
{
  "summary_text": "...",
  "key_points": ["...", "...", "..."]
}`;

    try {
        let response = await askOpus(prompt, 'john-code');
        
        // Extract text from response object
        if (typeof response === 'object' && response.text) {
            response = response.text;
        }
        
        // Convert to string
        response = String(response);
        
        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback: return raw response
        return {
            summary_text: response,
            key_points: []
        };
    } catch (error) {
        console.error('Error generating summary:', error);
        throw error;
    }
}

/**
 * Generate email draft with context
 * 
 * @param {Object} draftData - Email context
 * @param {string} draftData.contact_email - Recipient email
 * @param {string} draftData.contact_name - Recipient name
 * @param {Object} draftData.relationship_summary - CRM summary
 * @param {Array} draftData.recent_emails - Recent email thread
 * @param {string} draftData.prompt - User's instruction (e.g., "Follow up on meeting")
 * @returns {Promise<Object>} { subject, body }
 */
async function generateEmailDraft(draftData) {
    const prompt = `You are Craig's email assistant. Draft a professional email.

**To:** ${draftData.contact_name} (${draftData.contact_email})

**Relationship Context:**
${draftData.relationship_summary.summary_text}

**Recent Email Thread:**
${draftData.recent_emails.map(e => 
    `${e.direction === 'outbound' ? 'You' : draftData.contact_name}: ${e.subject}\n${e.snippet}`
).join('\n\n---\n\n')}

**Your instruction:** ${draftData.prompt}

Generate an email that:
1. References context from your relationship
2. Is appropriate for their communication style
3. Is concise and actionable
4. Sounds like Craig (professional but warm)

Return JSON:
{
  "subject": "...",
  "body": "..."
}`;

    try {
        let response = await askOpus(prompt, 'john-outreach');
        
        // Extract text from response object
        if (typeof response === 'object' && response.text) {
            response = response.text;
        }
        
        // Convert to string
        response = String(response);
        
        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback: return raw response as body
        return {
            subject: 'Follow-up',
            body: response
        };
    } catch (error) {
        console.error('Error generating email draft:', error);
        throw error;
    }
}

/**
 * Analyze sentiment of interaction
 * 
 * @param {string} content - Email or message content
 * @returns {Promise<string>} 'positive' | 'neutral' | 'negative'
 */
async function analyzeSentiment(content) {
    const prompt = `Analyze the sentiment of this message. Return only one word: positive, neutral, or negative.

Message:
${content}

Sentiment:`;

    try {
        let response = await askOpus(prompt, 'john-code');
        
        // Extract text from response object
        if (typeof response === 'object' && response.text) {
            response = response.text;
        }
        
        // Convert to string and clean
        const sentiment = String(response).toLowerCase().trim().replace(/['"]/g, '');
        
        if (sentiment.includes('positive')) return 'positive';
        if (sentiment.includes('negative')) return 'negative';
        return 'neutral';
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return 'neutral';
    }
}

/**
 * Extract action items from meeting transcript
 * 
 * @param {Object} meetingData - Meeting info
 * @param {string} meetingData.title - Meeting title
 * @param {string} meetingData.transcript - Full transcript
 * @param {Array} meetingData.attendees - Attendee emails
 * @returns {Promise<Array>} Action items with assignees
 */
async function extractActionItems(meetingData) {
    const prompt = `Extract action items from this meeting transcript.

**Meeting:** ${meetingData.title}

**Attendees:**
${meetingData.attendees.join('\n')}

**Transcript:**
${meetingData.transcript}

Extract all action items with:
1. Task description
2. Assignee (if mentioned, otherwise null)
3. Due date (if mentioned, otherwise null)

Return JSON array:
[
  {
    "task": "...",
    "assignee_email": "email@example.com" or null,
    "owner_is_me": true/false,
    "due_date": "YYYY-MM-DD" or null,
    "priority": 50
  }
]`;

    try {
        let response = await askOpus(prompt, 'john-code');
        
        // Extract text from response object
        if (typeof response === 'object' && response.text) {
            response = response.text;
        }
        
        // Convert to string
        response = String(response);
        
        // Parse JSON from response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        return [];
    } catch (error) {
        console.error('Error extracting action items:', error);
        return [];
    }
}

/**
 * Generate nudge message for contact needing attention
 * 
 * @param {Object} nudgeData - Contact and context
 * @param {Object} nudgeData.contact - Contact info
 * @param {number} nudgeData.days_since - Days since last contact
 * @param {string} nudgeData.relationship_type - client, partner, etc.
 * @returns {Promise<string>} Personalized nudge message
 */
async function generateNudge(nudgeData) {
    const prompt = `Generate a brief, actionable nudge for re-engaging this contact.

**Contact:** ${nudgeData.contact.name}
**Company:** ${nudgeData.contact.company || 'Unknown'}
**Relationship:** ${nudgeData.relationship_type}
**Last contact:** ${nudgeData.days_since} days ago

Generate a 1-sentence nudge that:
1. Is specific to the relationship type
2. Suggests a concrete action
3. Is warm but professional

Example: "Share that article about [topic] you discussed last month"

Nudge:`;

    try {
        let response = await askOpus(prompt, 'john-outreach');
        
        // Extract text from response object
        if (typeof response === 'object' && response.text) {
            response = response.text;
        }
        
        // Convert to string and clean quotes
        return String(response).trim().replace(/^["'`\\]+|["'`\\]+$/g, '');
    } catch (error) {
        console.error('Error generating nudge:', error);
        return `Reach out to ${nudgeData.contact.name} - it's been ${nudgeData.days_since} days`;
    }
}

/**
 * CLI mode: Called from Python or command line
 */
if (require.main === module) {
    const command = process.argv[2];
    const dataJson = process.argv.slice(3).join(' '); // Handle spaces in JSON
    
    if (!command || !dataJson) {
        console.error('Usage: node llm_integration.js <command> <json_data>');
        console.error('Commands: summarize, draft_email, sentiment, action_items, nudge');
        process.exit(1);
    }
    
    let data;
    try {
        data = JSON.parse(dataJson);
    } catch (e) {
        console.error(`Invalid JSON: ${dataJson}`);
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }
    
    (async () => {
        let result;
        
        switch (command) {
            case 'summarize':
                result = await generateContactSummary(data);
                break;
            case 'draft_email':
                result = await generateEmailDraft(data);
                break;
            case 'sentiment':
                result = await analyzeSentiment(data.content);
                break;
            case 'action_items':
                result = await extractActionItems(data);
                break;
            case 'nudge':
                result = await generateNudge(data);
                break;
            default:
                console.error(`Unknown command: ${command}`);
                process.exit(1);
        }
        
        console.log(JSON.stringify(result, null, 2));
    })();
}

module.exports = {
    generateContactSummary,
    generateEmailDraft,
    analyzeSentiment,
    extractActionItems,
    generateNudge
};
