import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "../../components/ui/PageTransition";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="relative flex min-h-[84vh] items-center justify-center px-6 text-center overflow-hidden">

        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none"
          initial={{ top: "20%" }}
          animate={{ top: "80%" }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center">

          {/* Icon */}
          <div className="relative mb-8">
            <motion.div
              className="flex h-20 w-20 items-center justify-center border border-blue-500/20 bg-blue-500/5"
              animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 24px rgba(59,130,246,0.15)", "0 0 0px rgba(59,130,246,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldAlert className="h-9 w-9 text-blue-400" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Error code */}
          <div className="flex items-center gap-2 mb-5">
            <Terminal className="h-3 w-3 text-blue-500/60" aria-hidden="true" />
            <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-blue-500">
              ERROR_404 · PAGE_NOT_FOUND
            </p>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("common.notFound")}
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10">
            {t("common.notFoundDesc")}
          </p>

          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 h-11 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-150">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("common.backHome")}
            </button>
          </Link>

          {/* Terminal line */}
          <div className="mt-12 font-mono text-[11px] text-gray-700 flex items-center gap-1.5">
            <span className="text-blue-600">$</span>
            <span>curl -I https://cynasecure.fr{window.location.pathname}</span>
            <motion.span
              className="inline-block w-1.5 h-3 bg-blue-500/60"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
