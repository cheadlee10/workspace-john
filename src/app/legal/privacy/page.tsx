import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NorthStar Synergy",
  description: "NorthStar Synergy privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">NorthStar Synergy</Link>
          <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">Last updated: March 6, 2026</p>

        <div className="prose prose-sm prose-gray max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-gray-900">1. Introduction</h2>
            <p>NorthStar Synergy LLC (&quot;NorthStar,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the NorthStar Synergy restaurant website platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">2. Information We Collect</h2>
            <p><strong>Account Information:</strong> When you create an account, we collect your restaurant name, contact name, email address, phone number, and business address.</p>
            <p><strong>Payment Information:</strong> Payment details are processed securely through Stripe. We do not store credit card numbers on our servers.</p>
            <p><strong>Website Content:</strong> Menu items, photos, business hours, and other content you provide for your restaurant website.</p>
            <p><strong>Order Data:</strong> When your customers place orders through your website, we process order details, customer contact information, and payment data through Square.</p>
            <p><strong>Usage Data:</strong> We collect analytics about how you and your customers interact with the platform, including page views, feature usage, and performance metrics.</p>
            <p><strong>Support Communications:</strong> When you contact our support team, we retain the correspondence to improve our service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">3. How We Use Your Information</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>To provide, maintain, and improve the NorthStar platform</li>
              <li>To build, host, and manage your restaurant website</li>
              <li>To process online orders and payments</li>
              <li>To send order confirmations, receipts, and status updates</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To send billing notifications and service updates</li>
              <li>To monitor website uptime and performance</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">4. Restaurant Customer Data</h2>
            <p>When customers place orders through restaurant websites we host, we process the following data on behalf of the restaurant:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Customer name, email, phone number, and delivery address</li>
              <li>Order details and preferences</li>
              <li>Payment information (processed securely through Square — we never store card numbers)</li>
            </ul>
            <p>In this context, the restaurant is the data controller and NorthStar acts as a data processor. We process customer data only as necessary to operate the ordering platform. We do not sell restaurant customer data or use it for our own marketing purposes.</p>
            <p>Restaurant owners are responsible for their own privacy disclosures to their customers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to improve our services:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Essential cookies:</strong> Required for the platform to function (session management, security).</li>
              <li><strong>Analytics cookies:</strong> We use Google Analytics to understand how visitors interact with our site. These cookies are only set after you consent via our cookie banner.</li>
            </ul>
            <p>You can manage your cookie preferences at any time through the cookie banner or your browser settings. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">6. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Stripe:</strong> Subscription billing and payment processing</li>
              <li><strong>Square:</strong> Restaurant order payment processing</li>
              <li><strong>Vercel:</strong> Website hosting and deployment</li>
              <li><strong>Google Analytics:</strong> Website traffic analysis (with consent)</li>
              <li><strong>Resend:</strong> Transactional email delivery</li>
              <li><strong>Twilio:</strong> SMS order notifications</li>
            </ul>
            <p>Each provider has their own privacy policy governing how they handle your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">7. Data Security</h2>
            <p>We implement industry-standard security measures including:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>SSL/TLS encryption for all data in transit</li>
              <li>Secure hosting on Vercel&apos;s edge network</li>
              <li>PCI-compliant payment processing through Stripe and Square</li>
              <li>Regular security monitoring and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">8. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. If you cancel your subscription, we retain your data for 30 days to allow for reactivation. After 30 days, your data is permanently deleted.</p>
            <p>Order data is retained for 7 years for tax and legal compliance purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>To exercise these rights, contact us at privacy@northstarsynergy.org.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">10. California Privacy Rights (CCPA/CPRA)</h2>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal information we have collected about you.</li>
              <li><strong>Right to Delete:</strong> You may request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
              <li><strong>Right to Opt-Out:</strong> We do not sell or share your personal information for cross-context behavioral advertising.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
            </ul>
            <p>To exercise these rights, contact us at privacy@northstarsynergy.org. We will verify your identity before processing your request and respond within 45 days.</p>
            <p><strong>Categories of information collected:</strong> Identifiers (name, email, phone), commercial information (subscription plan, order history), internet activity (site usage analytics), and professional information (business name, address).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">11. International Users</h2>
            <p>Our services are primarily intended for users in the United States. If you are accessing our services from outside the US, please be aware that your data may be transferred to and processed in the United States.</p>
            <p>If you are a resident of the European Economic Area (EEA) or United Kingdom, you have additional rights including the right to lodge a complaint with your local data protection authority. Our lawful basis for processing is contract performance (for our clients) and legitimate interest (for analytics and service improvement).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">12. Children&apos;s Privacy</h2>
            <p>Our services are not directed to individuals under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">13. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or through the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">14. Contact Us</h2>
            <p>NorthStar Synergy LLC<br />Woodinville, WA<br />privacy@northstarsynergy.org</p>
          </section>
        </div>
      </main>
    </div>
  );
}
