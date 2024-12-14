"use client";

import "highlight.js/styles/atom-one-dark.min.css"; // Import a highlight.js style
import "../markdown/markdown.css";

import MarkdownIt from "markdown-it";
import React from "react";
import hljs from "highlight.js";

export default function Markdown({ content }: { content: string }) {
  const md: MarkdownIt = new MarkdownIt({
    highlight: (str: string, lang: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
        } catch (e) {
          console.error(e);
        }
      }

      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  const renderedMarkdown = md.render(content);

  return (
    <div
      className="max-w-full overflow-x-auto markdown"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
    />
  );
}
