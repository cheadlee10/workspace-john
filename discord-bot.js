// Discord Bot for Lead Capture & Routing
// Usage: @bot-john help
// Channels: #inquiries (incoming leads), #pipeline (tracked prospects)

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const LEADS_FILE = path.join(__dirname, '../leads.jsonl');
const JOBS_FILE = path.join(__dirname, '../jobs.jsonl');

// Service pricing reference
const services = {
  excel: { name: 'Excel Automation', basePrice: 150 },
  python: { name: 'Python Scripts', basePrice: 99 },
  web: { name: 'Web Development', basePrice: 1000 },
  bot: { name: 'Custom Bot', basePrice: 500 },
  data: { name: 'Data Engineering', basePrice: 200 },
  api: { name: 'API Integration', basePrice: 500 },
};

client.on('ready', () => {
  console.log(`✓ John's lead bot online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user.id)) return;

  const args = message.content.slice(message.mentions.first().length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  try {
    if (command === 'help') {
      const help = new EmbedBuilder()
        .setColor('#3b82f6')
        .setTitle('John Lead Bot')
        .addFields(
          { name: '`new-lead`', value: 'Add a new lead' },
          { name: '`quote <service>`', value: 'Generate a quote (excel, python, web, bot, data, api)' },
          { name: '`pipeline`', value: 'Show pipeline status' },
          { name: '`close <lead-id>`', value: 'Mark lead as closed deal' },
          { name: '`follow-up`', value: 'Show leads needing follow-up' }
        );
      return message.reply({ embeds: [help] });
    }

    if (command === 'new-lead') {
      // Extract lead info from message
      const leadEntry = {
        id: `lead-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        client: args.join(' ') || 'TBD',
        service: 'TBD',
        estimated_value: 0,
        status: 'new',
        notes: `Added via Discord bot by ${message.author.username}`,
      };

      fs.appendFileSync(LEADS_FILE, JSON.stringify(leadEntry) + '\n');

      const reply = new EmbedBuilder()
        .setColor('#10b981')
        .setTitle('Lead Added')
        .addFields(
          { name: 'ID', value: leadEntry.id },
          { name: 'Client', value: leadEntry.client },
          { name: 'Status', value: leadEntry.status }
        );
      return message.reply({ embeds: [reply] });
    }

    if (command === 'quote') {
      const service = args[0]?.toLowerCase();
      if (!services[service]) {
        return message.reply('Unknown service. Try: excel, python, web, bot, data, api');
      }

      const svc = services[service];
      const tiers = [
        { name: 'Good', multiplier: 1 },
        { name: 'Better', multiplier: 2 },
        { name: 'Best', multiplier: 3.33 },
      ];

      const quote = new EmbedBuilder()
        .setColor('#06b6d4')
        .setTitle(`${svc.name} - Pricing`)
        .addFields(
          ...tiers.map((t) => ({
            name: t.name,
            value: `$${Math.round(svc.basePrice * t.multiplier)}`,
            inline: true,
          }))
        );
      return message.reply({ embeds: [quote] });
    }

    if (command === 'pipeline') {
      // Read leads file
      const leads = fs.readFileSync(LEADS_FILE, 'utf-8')
        .split('\n')
        .filter(l => l.trim())
        .map(l => JSON.parse(l));

      const summary = new EmbedBuilder()
        .setColor('#8b5cf6')
        .setTitle('Pipeline Summary')
        .addFields(
          { name: 'New', value: leads.filter(l => l.status === 'new').length.toString(), inline: true },
          { name: 'Contacted', value: leads.filter(l => l.status === 'contacted').length.toString(), inline: true },
          { name: 'Proposal Sent', value: leads.filter(l => l.status === 'proposal_sent').length.toString(), inline: true },
          { name: 'Total Value', value: `$${leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0)}`, inline: true }
        );
      return message.reply({ embeds: [summary] });
    }

    if (command === 'close') {
      const leadId = args[0];
      if (!leadId) return message.reply('Usage: `close <lead-id>`');

      // Read, update, rewrite
      const leads = fs.readFileSync(LEADS_FILE, 'utf-8')
        .split('\n')
        .filter(l => l.trim())
        .map(l => JSON.parse(l));

      const lead = leads.find(l => l.id === leadId);
      if (!lead) return message.reply(`Lead not found: ${leadId}`);

      lead.status = 'closed';
      lead.closed_date = new Date().toISOString().split('T')[0];

      fs.writeFileSync(LEADS_FILE, leads.map(l => JSON.stringify(l)).join('\n') + '\n');

      const closed = new EmbedBuilder()
        .setColor('#10b981')
        .setTitle('Deal Closed!')
        .addFields(
          { name: 'Lead ID', value: lead.id },
          { name: 'Client', value: lead.client },
          { name: 'Value', value: `$${lead.estimated_value}` }
        );
      return message.reply({ embeds: [closed] });
    }

    if (command === 'follow-up') {
      const leads = fs.readFileSync(LEADS_FILE, 'utf-8')
        .split('\n')
        .filter(l => l.trim())
        .map(l => JSON.parse(l))
        .filter(l => l.status === 'new' || l.status === 'contacted');

      const followUp = new EmbedBuilder()
        .setColor('#f59e0b')
        .setTitle('Follow-Up Needed')
        .addFields(
          { name: 'Count', value: leads.length.toString() },
          { name: 'IDs', value: leads.map(l => `\`${l.id}\``).join(', ') || 'None' }
        );
      return message.reply({ embeds: [followUp] });
    }
  } catch (error) {
    console.error('Bot error:', error);
    message.reply('❌ Error processing command');
  }
});

client.login(process.env.DISCORD_TOKEN);
