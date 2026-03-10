import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend' // Uncomment when Resend is set up
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, sessionId, amount, service, tier } = await request.json()

    // Email receipt HTML
    const receiptHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #fff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
    .receipt-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .receipt-row:last-child { border-bottom: none; font-weight: bold; font-size: 18px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; padding: 20px; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>NorthStar Synergy</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Payment Receipt</p>
  </div>
  
  <div class="content">
    <p>Hi there,</p>
    <p>Thank you for your purchase! Your payment has been received and your project is queued.</p>
    
    <div class="receipt-info">
      <div class="receipt-row">
        <span>Service</span>
        <span><strong>${service} - ${tier}</strong></span>
      </div>
      <div class="receipt-row">
        <span>Amount Paid</span>
        <span><strong>$${(amount / 100).toFixed(2)} USD</strong></span>
      </div>
      <div class="receipt-row">
        <span>Date</span>
        <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div class="receipt-row">
        <span>Transaction ID</span>
        <span style="font-family: monospace; font-size: 12px;">${sessionId}</span>
      </div>
    </div>

    <h3>What's Next?</h3>
    <p>We'll reach out within 24 hours to:</p>
    <ul>
      <li>Gather any additional requirements</li>
      <li>Confirm timeline and deliverables</li>
      <li>Kick off your project</li>
    </ul>

    <p>If you have any questions in the meantime, just reply to this email.</p>

    <p style="margin-top: 30px;">Thanks again,<br><strong>The NorthStar Synergy Team</strong></p>
  </div>

  <div class="footer">
    <p>NorthStar Synergy | Business Automation & Development</p>
    <p>Questions? Email <a href="mailto:john@northstarsynergy.com" style="color: #3b82f6;">john@northstarsynergy.com</a></p>
    <p style="margin-top: 10px;">This receipt was sent to ${email}</p>
  </div>
</body>
</html>
    `

    // In production, integrate with SendGrid/Resend/AWS SES
    // For now, log receipt (webhook will handle actual sending)
    console.log('Receipt generated for:', email, sessionId)

    return NextResponse.json({ 
      success: true, 
      message: 'Receipt sent',
      receiptHtml // Return HTML for testing
    })
  } catch (error) {
    console.error('Receipt send error:', error)
    return NextResponse.json({ error: 'Failed to send receipt' }, { status: 500 })
  }
}
