const nodemailer = require('nodemailer');

(async () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'clawcliff@gmail.com',
      pass: 'zpon bjsp dnfx tkdy'
    }
  });

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;">
<tr><td align="center" style="padding:24px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<tr><td style="padding:0;">
  <a href="https://perez-landscaping-ns.vercel.app" target="_blank">
    <img src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=300&fit=crop" 
         alt="Perez Landscaping Website" width="600" 
         style="width:100%;height:auto;display:block;border-radius:12px 12px 0 0;">
  </a>
</td></tr>

<tr><td style="background:#0A2B55;padding:14px 28px;">
  <span style="color:#FFD54F;font-size:20px;font-weight:700;">PEREZ LANDSCAPING</span>
</td></tr>

<tr><td style="padding:28px;">
  <p style="font-size:16px;line-height:1.6;color:#1A2B3C;">Hi there,</p>
  <p style="font-size:16px;line-height:1.6;color:#1A2B3C;">
    We built a professional website for Perez Landscaping — it is live now and ready for your customers.
    Features your services, contact info, and a design that turns visitors into booked jobs.
  </p>
  <p style="font-size:14px;line-height:1.6;color:#555;">
    <strong>76% of homeowners search online before hiring a landscaper.</strong> This site makes sure they find you.
  </p>
  <p style="font-size:14px;line-height:1.6;color:#555;">
    $0 down — just $99/month for hosting, updates, and support. We handle everything.
  </p>
</td></tr>

<tr><td align="center" style="padding:0 28px 28px;">
  <a href="https://perez-landscaping-ns.vercel.app" target="_blank"
     style="display:inline-block;background:linear-gradient(135deg,#1B5FAF,#0A2B55);color:#FFD54F;padding:16px 40px;border-radius:50px;text-decoration:none;font-size:15px;font-weight:700;">
    See Your Website Live →
  </a>
</td></tr>

<tr><td style="padding:20px 28px;border-top:1px solid #eee;">
  <p style="margin:0 0 4px 0;font-size:13px;color:#1A2B3C;font-weight:600;">John</p>
  <p style="margin:0;font-size:12px;color:#888;">NorthStar Synergy</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const info = await transport.sendMail({
    from: 'John | NorthStar Synergy <clawcliff@gmail.com>',
    to: 'chead@me.com',
    subject: 'Perez Landscaping — Your New Website is Live',
    html: html
  });
  
  console.log('SUCCESS');
  console.log('Message ID:', info.messageId);
  console.log('Response:', info.response);
  console.log('Timestamp:', new Date().toISOString());
})();
