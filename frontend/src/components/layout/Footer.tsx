import React from "react";
import { Link } from "react-router-dom";
import { Shield, Linkedin, Twitter, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const SOCIAL = [
  { href: "https://linkedin.com/company/cynasecure", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/cynasecure",          Icon: Twitter,  label: "Twitter / X" },
  { href: "https://github.com/cynasecure",           Icon: Github,   label: "GitHub" },
];

const CERTS = ["ISO 27001", "SOC 2 Type II", "ANSSI", "RGPD"];

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const sections = [
    {
      key: "solutions",
      title: t("common.footerSolutions"),
      links: [
        { label: "SOC managé",              to: "/catalogue?cat=soc"   },
        { label: "Protection Endpoint",     to: "/catalogue?cat=edr"   },
        { label: "Détection étendue (XDR)", to: "/catalogue?cat=xdr"   },
        { label: "Sécurité Cloud",          to: "/catalogue?cat=cloud" },
      ],
    },
    {
      key: "company",
      title: t("common.footerCompany"),
      links: [
        { label: "Notre mission",  to: "/a-propos"  },
        { label: "Nous contacter", to: "/contact"   },
        { label: "Recrutement",    to: "/carrieres" },
        { label: "Actualités",     to: "/blog"      },
      ],
    },
    {
      key: "legal",
      title: t("common.footerLegal"),
      links: [
        { label: "Mentions légales",     to: "/mentions-legales" },
        { label: "Conditions générales", to: "/cgv"              },
        { label: "Confidentialité",      to: "/confidentialite"  },
      ],
    },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800/60">

      {/* Main grid */}
      <div className="container pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="CynaSecure — Accueil">
              <img src="/favicon.ico" alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
              <span
                className="text-lg font-black text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cyna<span className="text-blue-400">Secure</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
              {t("common.footerDesc")}
            </p>

            {/* Social */}
            <div className="flex items-center gap-2" role="list" aria-label="Réseaux sociaux">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-gray-800 bg-gray-900 text-gray-500 hover:text-white hover:border-gray-600 hover:bg-gray-800 transition-all duration-150"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {sections.map((section) => (
            <nav key={section.key} aria-label={section.title}>
              <h2 className="mb-5 font-mono text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gray-600">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-gray-800/60">
        <div className="container py-5 flex flex-wrap items-center justify-between gap-4">

          {/* Certifications */}
          <div className="flex flex-wrap items-center gap-2" aria-label="Certifications et conformité">
            {CERTS.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-800 bg-gray-900/60 text-gray-500 font-mono text-[10px] tracking-wider"
              >
                <Shield className="h-2.5 w-2.5 text-blue-500/50" aria-hidden="true" />
                {cert}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-gray-600 font-mono tracking-wide">
            © {year} CynaSecure — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
