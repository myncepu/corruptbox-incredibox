import type * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9ZWF7FKDR8"
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-9ZWF7FKDR8');
            `,
        }}
      />

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2123767634383915"
        crossOrigin="anonymous"
      />

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2123767634383915"
        crossOrigin="anonymous"
      />
    </>
  );
}
