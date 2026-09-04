import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GoDucky | Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-text-weak mb-8">Effective date: Sep 4, 2026</p>

          <div className="text-sm leading-relaxed space-y-6">
            <p>At GoDucky, we take your privacy seriously. Please read this Privacy Policy to learn how we treat your personal data. By using or accessing our Services in any manner, you acknowledge that you accept the practices and policies outlined below, and you hereby consent that we will collect, use and disclose your information as described in this Privacy Policy.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">What this Privacy Policy Covers</h2>
            <p>This Privacy Policy covers how we treat Personal Data that we gather when you access or use our Services. "Personal Data" means any information that identifies or relates to a particular individual and also includes information referred to as "personally identifiable information" or "personal information" under applicable data privacy laws, rules or regulations.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Categories of Personal Data We Collect</h2>
            <p>We collect the following categories of Personal Data:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong className="text-text-strong">Profile or Contact Data</strong> such as first and last name, email, phone number and mailing address.</li>
              <li><strong className="text-text-strong">Payment Data</strong> such as financial account information, payment card details, billing address and billing email.</li>
              <li><strong className="text-text-strong">Device/IP Data</strong> such as IP address, device ID, type of device/operating system/browser used to access the Services.</li>
              <li><strong className="text-text-strong">Usage Data</strong> such as information about how you interact with our Services, including features used, pages viewed, and actions taken.</li>
            </ul>

            <h2 className="text-lg font-bold mt-8 mb-4">How We Use Your Personal Data</h2>
            <p>We use your Personal Data for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Providing, customizing and improving the Services</li>
              <li>Creating and managing your account</li>
              <li>Providing support and assistance for the Services</li>
              <li>Improving the Services, including testing, research, internal analytics and product development</li>
              <li>Marketing and selling the Services</li>
              <li>Responding to correspondence and inquiries from you</li>
            </ul>

            <h2 className="text-lg font-bold mt-8 mb-4">Data Security</h2>
            <p>We seek to protect your Personal Data from unauthorized access, use and disclosure using appropriate physical, technical, organizational and administrative security measures based on the type of Personal Data and how we are processing that data.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Data Retention</h2>
            <p>We retain Personal Data about you for as long as necessary to provide you with our Services or to perform our business or commercial purposes for collecting your Personal Data. We may further retain information in an anonymous or aggregated form where that information would not identify you personally.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your Personal Data:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The right to access the Personal Data we hold about you</li>
              <li>The right to request correction of inaccurate Personal Data</li>
              <li>The right to request deletion of your Personal Data</li>
              <li>The right to opt out of the sale of your Personal Data</li>
              <li>The right to not be discriminated against for exercising your rights</li>
            </ul>

            <h2 className="text-lg font-bold mt-8 mb-4">Children's Privacy</h2>
            <p>We do not knowingly collect or solicit Personal Data from children under 18 years of age. If you are a child under 18, please do not attempt to register for or otherwise use the Services or send us any Personal Data.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Changes to This Policy</h2>
            <p>We may need to change this Privacy Policy from time to time. We will alert you of material changes by placing a notice on our website, by sending you an email and/or by some other means.</p>

            <h2 className="text-lg font-bold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@goducky.dev" className="text-text-weak hover:text-text-strong">privacy@goducky.dev</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
