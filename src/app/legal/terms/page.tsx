import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | NorthStar Synergy",
  description: "NorthStar Synergy terms of service for our restaurant website platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">NorthStar Synergy</Link>
          <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-500">Last updated: March 6, 2026</p>

        <div className="prose prose-sm prose-gray max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-gray-900">1. Agreement to Terms</h2>
            <p>By accessing or using the NorthStar Synergy platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service. These Terms constitute a legal agreement between you and NorthStar Synergy LLC (&quot;NorthStar,&quot; &quot;we,&quot; &quot;us&quot;).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">2. Description of Service</h2>
            <p>NorthStar Synergy provides a restaurant website platform that includes:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Custom restaurant website design and hosting</li>
              <li>Online ordering system with payment processing</li>
              <li>Menu management tools</li>
              <li>SEO optimization and Google integration</li>
              <li>Analytics and business dashboard</li>
              <li>Customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">3. Account Registration</h2>
            <p>To use the Service, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
            <p>You must be at least 18 years old and have the legal authority to bind your restaurant business to these Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">4. Subscription and Payment</h2>
            <p><strong>Plans:</strong> We offer Starter, Growth, and Pro subscription plans. Plan details and pricing are available at northstarsynergy.com/pricing.</p>
            <p><strong>Billing:</strong> Subscriptions are billed monthly or annually in advance. All fees are in US dollars and non-refundable except as described in Section 5.</p>
            <p><strong>Payment:</strong> Payment is processed through Stripe. You authorize us to charge your payment method on file for recurring subscription fees.</p>
            <p><strong>Price Changes:</strong> We may change pricing with 30 days&apos; written notice. Existing subscriptions continue at their current rate until renewal.</p>
            <p><strong>Late Payment:</strong> If payment fails, we will attempt to retry for 14 days. After 14 days of non-payment, online ordering may be disabled. After 30 days, your site may be deactivated.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">5. Cancellation and Refunds</h2>
            <p><strong>Cancellation:</strong> You may cancel your subscription at any time from your admin dashboard. Your site will remain active until the end of your current billing period.</p>
            <p><strong>Refunds:</strong> We do not provide refunds for partial billing periods. If you cancel within 14 days of your initial subscription, we will provide a full refund.</p>
            <p><strong>Data After Cancellation:</strong> We retain your data for 30 days after cancellation. After 30 days, all data including your website, menu, and customer data will be permanently deleted.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">6. Your Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Provide accurate restaurant information (menu, hours, contact details)</li>
              <li>Comply with all applicable food safety and labeling laws</li>
              <li>Ensure menu items and prices are accurate and current</li>
              <li>Respond to customer orders in a timely manner</li>
              <li>Not use the Service for any illegal or unauthorized purpose</li>
              <li>Not upload content that infringes on third-party intellectual property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">7. Intellectual Property</h2>
            <p><strong>Your Content:</strong> You retain ownership of all content you provide (menu items, photos, descriptions, branding). You grant us a license to display and distribute this content as part of operating your website.</p>
            <p><strong>Our Platform:</strong> The NorthStar platform, including its design, code, and features, is our intellectual property. Your subscription grants you a license to use the platform, not ownership of it.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">8. Service Level Agreement</h2>
            <p><strong>Uptime:</strong> We target 99.9% uptime for all hosted websites. Scheduled maintenance will be communicated in advance.</p>
            <p><strong>Support:</strong> We provide email support with a target response time of 4 business hours. Emergency support (site down) is available 24/7.</p>
            <p><strong>Remedies:</strong> If we fail to meet the 99.9% uptime target in a given month, you may request a service credit of 10% of that month&apos;s fee for each additional 0.1% of downtime, up to a maximum of one month&apos;s fee.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, NorthStar Synergy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.</p>
            <p>Our total liability for any claim arising from these Terms or the Service shall not exceed the total amount paid by you in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">10. Indemnification</h2>
            <p>You agree to indemnify and hold NorthStar Synergy harmless from any claims, damages, or expenses arising from your use of the Service, your content, or your violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">11. Data Portability</h2>
            <p>Upon request, we will provide an export of your data in a standard format (CSV or JSON) including:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Menu items and categories</li>
              <li>Customer contact information and order history</li>
              <li>Business profile and settings</li>
            </ul>
            <p>Export requests will be fulfilled within 10 business days. We recommend requesting a data export before cancelling your subscription. After cancellation, data exports are available during the 30-day retention period.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">12. DMCA and Copyright</h2>
            <p>If you believe that content hosted on a NorthStar-powered website infringes your copyright, please submit a DMCA takedown notice to our designated agent:</p>
            <p>DMCA Agent: NorthStar Synergy LLC<br />Email: legal@northstarsynergy.com<br />Woodinville, WA</p>
            <p>Your notice must include: (1) identification of the copyrighted work, (2) identification of the infringing material and its location, (3) your contact information, (4) a statement of good faith belief that the use is unauthorized, and (5) a statement under penalty of perjury that the information is accurate and you are authorized to act on behalf of the copyright owner.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">13. Food Safety and Allergen Disclaimer</h2>
            <p>NorthStar Synergy is a technology platform and does not prepare, handle, or deliver food. Menu information, allergen data, and dietary labels displayed on restaurant websites are provided by the restaurant and are the restaurant&apos;s sole responsibility.</p>
            <p>NorthStar makes no warranties regarding the accuracy of menu descriptions, allergen information, or dietary classifications. Customers with food allergies should contact the restaurant directly before placing orders.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">14. Dispute Resolution</h2>
            <p><strong>Informal Resolution:</strong> Before filing any formal claim, you agree to contact us at legal@northstarsynergy.com and attempt to resolve the dispute informally for at least 30 days.</p>
            <p><strong>Binding Arbitration:</strong> If we cannot resolve the dispute informally, either party may elect to resolve the dispute through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration will take place in King County, Washington.</p>
            <p><strong>Class Action Waiver:</strong> All claims must be brought in the parties&apos; individual capacity and not as a plaintiff or class member in any class or representative proceeding.</p>
            <p><strong>Small Claims Exception:</strong> Either party may bring qualifying claims in small claims court in King County, Washington.</p>
            <p><strong>Opt-Out:</strong> You may opt out of this arbitration provision by notifying us in writing within 30 days of first accepting these Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">15. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of Washington, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">16. Force Majeure</h2>
            <p>Neither party shall be liable for delays or failures in performance resulting from causes beyond its reasonable control, including acts of God, natural disasters, pandemics, war, terrorism, riots, government actions, power failures, internet disruptions, or third-party service outages.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">17. Changes to Terms</h2>
            <p>We may update these Terms with 30 days&apos; notice. Continued use of the Service after the effective date constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you may cancel your subscription before they take effect.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">18. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. The unenforceable provision will be modified to the minimum extent necessary to make it enforceable.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">19. Contact</h2>
            <p>NorthStar Synergy LLC<br />Woodinville, WA<br />legal@northstarsynergy.com</p>
          </section>
        </div>
      </main>
    </div>
  );
}
