import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { PageTransition } from "../../components/ui/PageTransition";
import { useTranslation } from "react-i18next";
import React from "react";

const FEATURES = [
  { label: "Détection comportementale IA", note: "99,4% de précision" },
  { label: "XDR unifié 6 surfaces", note: "1 seul agent" },
  { label: "Déploiement en 48h", note: "Prise en charge incluse" },
  { label: "POC 30 jours offert", note: "Sans engagement" },
];

const STATS = [
  { val: "500+", label: "Clients" },
  { val: "99,9%", label: "Disponibilité" },
  { val: "14s", label: "Détection" },
];

const CERTS = ["ISO 27001", "SOC 2", "ANSSI PRIS", "RGPD"];

export function AuthLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isLogin = pathname === "/connexion";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 flex">

        {/* Panel gauche - marque */}
        <div className="hidden lg:flex lg:w-[44%] flex-col relative overflow-hidden border-r border-gray-800/60">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(37,99,235,0.18) 0%, transparent 70%), #080810",
            }}
          />

          <div className="relative flex flex-col h-full px-10 py-12">
            {/* Logo - simple, sans cadre */}
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" alt="CynaSecure" className="h-8 w-8 object-contain" />
              <span className="text-white font-black text-xl" style={{ letterSpacing: "-0.02em" }}>
                CynaSecure
              </span>
            </div>

            {/* Contenu central */}
            <div className="flex-1 flex flex-col justify-center gap-10">
              <div>
                <p className="text-blue-500 font-mono text-[11px] tracking-widest mb-4">
                  CYBERSECURITY SAAS
                </p>
                <h2
                  className="text-white font-black text-3xl leading-tight mb-3"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Protégez votre<br />infrastructure
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Détection IA, XDR unifié et déploiement en 48h.
                  Sans engagement, avec POC gratuit.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3.5">
                {FEATURES.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm flex-1">{f.label}</span>
                    <span className="text-gray-600 font-mono text-[11px]">{f.note}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-800 pt-7">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-white font-black text-xl" style={{ letterSpacing: "-0.02em" }}>
                      {s.val}
                    </p>
                    <p className="text-gray-600 font-mono text-[11px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-mono text-gray-600 border border-gray-800 px-2 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Panel droit - formulaire */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-14 py-12 overflow-y-auto">
          {/* Logo mobile uniquement */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <img src="/favicon.ico" alt="CynaSecure" className="h-7 w-7 object-contain" />
            <span className="text-white font-black text-lg" style={{ letterSpacing: "-0.02em" }}>
              CynaSecure
            </span>
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Switch Connexion / Inscription - underline tabs */}
            <div className="flex border-b border-gray-800 mb-8">
              <Link
                to="/connexion"
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px mr-6 ${
                  isLogin
                    ? "text-white border-blue-500"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                }`}
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/inscription"
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                  !isLogin
                    ? "text-white border-blue-500"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                }`}
              >
                {t("nav.register")}
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
