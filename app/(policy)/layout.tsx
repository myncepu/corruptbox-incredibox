import "./style.css";

import type { Metadata } from "next";
import type React from "react";
import pagejson from "@/pagejson/en.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `%s | ${pagejson.metadata.title}`,
      default: pagejson.metadata.title,
    },
    description: pagejson.metadata.description,
    keywords: pagejson.metadata.keywords,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
