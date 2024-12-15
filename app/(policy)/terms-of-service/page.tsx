import Markdown from "@/components/markdown";
import { MdOutlineHome } from "react-icons/md";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service - Corruptbox",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/terms-of-service`,
    },
  };
}

export default function TermsOfService() {
  const content = ` # Terms of Service

## Introduction and Acceptance of Terms

Welcome to **Corruptbox** (corruptboxincredibox.com), an experimental music creation platform that combines digital art with interactive sound design. By accessing or using our service, you agree to be bound by these Terms of Service.

## Use of the Service

Corruptbox provides an interactive platform where users can:
- Create unique musical compositions using our digital interface
- Experience glitch art and experimental sound design
- Save and share musical creations
- Interact with the Sprunki Mod features
- Participate in our creative community

You agree to use the service in accordance with all applicable laws and regulations.

## User Content and Creations

1. **Your Creations**: You retain rights to the musical compositions you create using Corruptbox.

2. **Platform License**: By creating and sharing content through our platform, you grant Corruptbox a non-exclusive license to host, display, and enable sharing of your creations.

3. **Community Guidelines**: When sharing creations, you agree to:
   - Respect other users' creative rights
   - Not upload inappropriate or offensive content
   - Follow our community standards

## Prohibited Activities

You agree not to:
- Attempt to bypass any platform restrictions
- Use the service for any illegal purposes
- Share inappropriate or harmful content
- Interfere with other users' experience
- Reverse engineer the platform
- Create automated or bot accounts
- Exploit bugs or glitches

## Service Features

1. **Free Features**: Basic music creation and gameplay features are provided free of charge.

2. **Optional Features**: Some advanced features or content may require registration or payment.

3. **Availability**: We strive to maintain continuous service but do not guarantee uninterrupted access.

## Intellectual Property

1. **Platform Rights**: The Corruptbox platform, including its interface, artwork, sound effects, and original content, is protected by copyright law.

2. **User Rights**: You maintain ownership of your original musical compositions created using our platform.

3. **Fair Use**: You may share recordings of your gameplay and creations for non-commercial purposes.

## Data Collection and Privacy

We collect and process:
- Gameplay data and settings
- Musical compositions (when saved)
- Optional account information
- Technical and performance data

For complete details, see our [Privacy Policy](/privacy-policy).

## Service Modifications

We reserve the right to:
- Update or modify the platform
- Add or remove features
- Change or discontinue services
- Modify these terms with notice

## Account Termination

We may suspend or terminate accounts that:
- Violate these terms
- Share inappropriate content
- Engage in disruptive behavior
- Attempt to abuse or exploit the platform

## Disclaimer of Warranties

THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. CORRUPTBOX DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.

## Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, CORRUPTBOX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.

## Children's Use

1. Corruptbox is designed to be family-friendly.
2. Users under 13 require parental consent.
3. We do not knowingly collect personal information from children without parental consent.

## Changes to Terms

We may update these terms periodically. Continued use of the service after changes constitutes acceptance of the new terms.

## Governing Law

These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.

## Contact Information

For questions about these terms, please contact us at:
[contact@corruptboxincredibox.com](mailto:contact@corruptboxincredibox.com)

---

Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

By using Corruptbox, you acknowledge that you have read and agree to these Terms of Service.`;

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
