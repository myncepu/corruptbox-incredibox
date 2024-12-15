import LandingPage from "@/templates/tailspark/landing/pages/index";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: "Play Online - Corruptbox Incredibox",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/download`,
    },
  };
}

export default async function Download() {
  return (
    <LandingPage
      page={{
        ...pagejson,
        metadata: {
          ...pagejson.metadata,
          title: "Play Online - No Download Required",
          description: "Play Corruptbox Incredibox directly in your browser - no download needed. Create unique music with our web-based platform.",
        },
        hero: {
          title: "Play Online - No Download Required",
          description: "Create music directly in your browser, no installation needed"
        },
        faq: {
          title: "Online Play FAQ",
          description: "Common questions about playing online",
          items: [
            {
              title: "Do I need to download anything?",
              description: "No! Corruptbox Incredibox runs entirely in your web browser. Just visit the site and start creating music."
            },
            {
              title: "What browsers are supported?",
              description: "All modern browsers including Chrome, Firefox, Safari, and Edge are fully supported."
            },
            {
              title: "Can I play on mobile?",
              description: "Yes, our interface is mobile-friendly and works on both phones and tablets."
            },
            {
              title: "Will my creations be saved?",
              description: "Yes, your music is automatically saved and can be accessed from any device."
            }
          ]
        }
      }}
      games={[]}
      gamesCount={0}
    />
  );
}
