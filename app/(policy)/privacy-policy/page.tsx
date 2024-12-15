import Markdown from "@/components/markdown";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy - Corruptbox",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicy() {
  const content = `# Privacy Policy

## Introduction

Welcome to Corruptbox Incredibox, an experimental music creation platform. We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your information when you use our interactive music creation services.

## Information Collection and Use

We collect and use the following types of information:

1. **Game Data**
   - **What We Collect**: Basic gameplay information, including music compositions and settings preferences.
   - **Purpose**: To provide and improve the music creation experience.

2. **Technical Data**
   - **What We Collect**: Information about your browser, device type, and how you interact with our platform.
   - **Purpose**: To optimize game performance and ensure compatibility across different devices.

3. **Optional Account Information**
   - **What We Collect**: If you choose to save or share your creations, we may collect your username and email.
   - **Purpose**: To enable music sharing and community features.

## Data Security

We implement industry-standard security measures to protect your information. Your musical creations and personal data are treated with strict confidentiality and are only accessed by authorized personnel when necessary for maintaining our services.

## Information Sharing

We do not sell or share your information with third parties except:
- When required by law
- With your explicit consent
- For essential service operations (under confidentiality agreements)

## Your Rights

You have the right to:
- Access your saved compositions and personal information
- Request corrections to your data
- Delete your account and associated data
- Opt-out of non-essential communications

## Children's Privacy

Corruptbox is designed to be family-friendly. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have inadvertently collected such information, please contact us immediately.

## Contact Us

If you have questions about this privacy policy or our privacy practices, please contact us at:

**Email**: [contact@corruptboxincredibox.com](mailto:contact@corruptboxincredibox.com)

## Updates to This Policy

We may update this privacy policy periodically. Any changes will be posted on this page with an updated effective date. Your continued use of Corruptbox after such modifications constitutes your acknowledgment of the modified policy.

Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

  return (
    <div>
      <Link className="text-base-content cursor-pointer" href="/">
        <MdOutlineHome className="text-2xl mx-8 my-8" />
      </Link>
      <div className="max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
