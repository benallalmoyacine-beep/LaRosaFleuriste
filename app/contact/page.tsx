import type { Metadata } from "next";
import { getConfig } from "@/lib/airtable";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — La Rosa Fleuriste",
  description: "Contactez La Rosa Fleuriste à Tlemcen. Commandez par WhatsApp ou visitez-nous.",
};

export const dynamic = "force-dynamic";

function IconTikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}
function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default async function ContactPage() {
  const config = await getConfig().catch(() => ({
    telephoneWhatsApp: "213791112663",
    slogan: "Une passion de famille",
    lienInstagram: "https://www.instagram.com/la_rosa_fleuriste_tlemcen/",
    lienFacebook: "https://www.facebook.com/profile.php?id=100091832552880",
    lienTikTok: "https://www.tiktok.com/@lavieestbelle6581",
    lienGoogleMaps: "https://maps.google.com/?q=La+Rosa+fleuriste+Tlemcen",
    adresse: "Tlemcen, Algérie",
    horaires: "Lun–Sam 8h–20h · Dim 9h–18h",
    noteGoogle: 4.6,
    nbAvis: 24,
  }));

  return (
    <div className="min-h-screen bg-blanc pt-20 md:pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Nous joindre
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-noir mb-4">Contact</h1>
          <div className="divider-or max-w-[100px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Informations + réseaux */}
          <div className="space-y-6">

            {/* Bloc infos */}
            <div className="border border-border bg-white p-6 md:p-8 space-y-5">
              <h2 className="font-playfair text-xl md:text-2xl text-noir mb-2">Informations</h2>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-or mt-0.5 shrink-0" />
                <p className="font-jost text-sm text-muted">{config.adresse}</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-or shrink-0" />
                <a
                  href={`https://wa.me/${config.telephoneWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jost text-sm text-muted hover:text-noir transition-colors"
                >
                  +{config.telephoneWhatsApp}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-or mt-0.5 shrink-0" />
                <p className="font-jost text-sm text-muted whitespace-pre-line">{config.horaires}</p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="border border-border bg-white p-6 md:p-8">
              <h2 className="font-playfair text-xl md:text-2xl text-noir mb-5">
                R&eacute;seaux sociaux
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { href: config.lienInstagram, label: "@la_rosa_fleuriste_tlemcen", Icon: IconInstagram },
                  { href: config.lienFacebook, label: "La Rosa Fleuriste", Icon: IconFacebook },
                  { href: config.lienTikTok, label: "@lavieestbelle6581", Icon: IconTikTok },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-noir transition-colors group"
                  >
                    <span className="p-2 border border-border group-hover:border-noir transition-colors">
                      <Icon size={15} />
                    </span>
                    <span className="font-jost text-sm">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/${config.telephoneWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-jost text-sm tracking-widest uppercase hover:bg-[#1ebe5d] transition-all"
            >
              <svg viewBox="0 0 24 24" fill="white" width={18} height={18}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Commander sur WhatsApp
            </a>
          </div>

          {/* Google Maps */}
          <div className="border border-border overflow-hidden min-h-[350px] md:min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.4!2d-1.3154!3d34.8828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLa+Rosa+fleuriste+Tlemcen!5e0!3m2!1sfr!2sdz!4v1"
              width="100%"
              height="100%"
              style={{ minHeight: "350px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Rosa Fleuriste - Tlemcen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
