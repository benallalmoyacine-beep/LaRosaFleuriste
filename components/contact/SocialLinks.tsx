"use client";

import { openSocial, SOCIAL } from "@/lib/socialLinks";

function IconTikTok({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const links = [
  { app: SOCIAL.instagram.app, web: SOCIAL.instagram.web, label: "@la_rosa_fleuriste_tlemcen", Icon: IconInstagram },
  { app: SOCIAL.facebook.app, web: SOCIAL.facebook.web, label: "La Rosa Fleuriste", Icon: IconFacebook },
  { app: SOCIAL.tiktok.app, web: SOCIAL.tiktok.web, label: "@lavieestbelle6581", Icon: IconTikTok },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-3">
      {links.map((s) => (
        <button
          key={s.label}
          onClick={() => openSocial(s.app, s.web)}
          className="flex items-center gap-3 text-muted hover:text-noir transition-colors group text-left"
        >
          <span className="p-2 border border-border group-hover:border-noir transition-colors">
            <s.Icon size={15} />
          </span>
          <span className="font-jost text-sm">{s.label}</span>
        </button>
      ))}
    </div>
  );
}
