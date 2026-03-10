# Auto-send all pending email pitches
# Usage: .\send-all-pitches.ps1 -AppPassword "your-gmail-app-password"
param(
    [Parameter(Mandatory=$true)]
    [string]$AppPassword
)

$From = "clawcliff@gmail.com"
$SmtpServer = "smtp.gmail.com"
$SmtpPort = 587
$Cred = New-Object System.Management.Automation.PSCredential($From, (ConvertTo-SecureString $AppPassword -AsPlainText -Force))

$pitches = @(
    @{
        To = "evergreen_landscaping@ymail.com"
        Subject = "I'd like to build a website for Ever-Green Landscaping"
        Body = @"
Hi there,

I came across Ever-Green Landscaping while researching landscaping companies in Everett. 25+ years in business - that's incredible! 10 reviews on Yelp show your customers trust you.

I noticed you don't have a website, and I wanted to reach out because I build professional websites specifically for landscaping businesses.

Here's what I can create for you:
- Professional website with your services, reviews, and photos
- Mobile-optimized (80% of customers search on their phones)
- Contact form so customers can reach you 24/7
- SEO optimized to show up when people Google "landscaping Everett WA"
- Click-to-call button that goes straight to (425) 346-4961

The cost: `$250 one-time. Hosting is `$10/month, first month free.

Most web designers charge `$2,000-5,000 for a site like this. I specialize in local service businesses so I can offer it at a fraction of the cost.

If you get just ONE extra customer from Google search, this pays for itself immediately.

Interested? Reply to this email and I'll build a custom demo site for your business within 48 hours - no commitment, no charge for the demo.

Best,
John
NorthStar Synergy
(877) 748-1356
"@
    },
    @{
        To = "pandalandscapin8242@gmail.com"
        Subject = "I'd like to build a website for Panda Landscaping"
        Body = @"
Hi there,

I came across Panda Landscaping while researching landscaping companies in Everett. Your work looks great!

I noticed you don't have a website, and I wanted to reach out because I build professional websites specifically for landscaping businesses.

Here's what I can create for you:
- Professional website with your services, reviews, and photos
- Mobile-optimized (80% of customers search on their phones)
- Contact form so customers can reach you 24/7
- SEO optimized to show up when people Google "landscaping Everett WA"
- Click-to-call button that goes straight to (425) 530-8242

The cost: `$250 one-time. Hosting is `$10/month, first month free.

Most web designers charge `$2,000-5,000 for a site like this. I specialize in local service businesses so I can offer it at a fraction of the cost.

If you get just ONE extra customer from Google search, this pays for itself immediately.

Interested? Reply to this email and I'll build a custom demo site for your business within 48 hours - no commitment, no charge for the demo.

Best,
John
NorthStar Synergy
(877) 748-1356
"@
    }
)

foreach ($pitch in $pitches) {
    try {
        Send-MailMessage -From $From -To $pitch.To -Subject $pitch.Subject -Body $pitch.Body -SmtpServer $SmtpServer -Port $SmtpPort -UseSsl -Credential $Cred
        Write-Host "SENT: $($pitch.To) - $($pitch.Subject)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED: $($pitch.To) - $_" -ForegroundColor Red
    }
}

Write-Host "`nAll pitches processed."
