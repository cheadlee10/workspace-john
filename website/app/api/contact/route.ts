import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const contactData = {
      timestamp: new Date().toISOString(),
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      needs: formData.get('needs'),
      timeline: formData.get('timeline'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    }

    // Log to JSONL file
    const logPath = path.join(process.cwd(), '..', 'contacts.jsonl')
    const logLine = JSON.stringify(contactData) + '\n'
    
    try {
      fs.appendFileSync(logPath, logLine)
    } catch (error) {
      console.error('Failed to log contact:', error)
    }

    // TODO: Send notification email to john@northstarsynergy.com
    // TODO: Add to CRM
    // TODO: Trigger autoresponder

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thanks! We\'ll respond within 2 hours.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please email john@northstarsynergy.com directly.' },
      { status: 500 }
    )
  }
}
