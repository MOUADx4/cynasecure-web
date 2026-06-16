import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogOut,
  Fingerprint,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { contactApi } from "../../api/contact";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import React, { useEffect, useState } from "react";

const LANGS = ["fr", "en", "es"] as const;
type Lang = typeof LANGS[number];

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth() as unknown as {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: { displayName: string } | null;
    logout: () => void;
  };

  const { count } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [open, setOpen]         = useState(false);
  const [unread, setUnread]     = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isAuthenticated) { setUnread(0); return; }
    contactApi.user.unreadCount()
      .then((r) => setUnread(r.count))
      .catch(() => {});
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const changeLang = (lang: Lang) => i18n.changeLanguage(lang);

  const mobileDuration = reducedMotion ? 0 : 0.18;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-gray-950 ${
        scrolled
          ? "border-b border-gray-800 shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
          : "border-b border-gray-800/50"
      }`}
      style={{ height: scrolled ? 60 : 72 }}
    >
      <nav
        className="container flex h-full items-center justify-between gap-8"
        aria-label="Navigation principale"
      >

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="CynaSecure — Accueil"
        >
          <img
            src="/favicon-32.png"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
            className={`object-contain transition-all duration-300 ${scrolled ? "h-6 w-6" : "h-7 w-7"}`}
          />
          <span
            className={`font-black tracking-tight text-white transition-all duration-300 ${scrolled ? "text-lg" : "text-xl"}`}
            style={{ letterSpacing: "-0.02em" }}
          >
            Cyna<span className="text-blue-400">Secure</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {[
            { to: "/", label: t("nav.home"), end: true },
            { to: "/catalogue", label: t("nav.solutions"), end: false },
            { to: "/contact", label: t("nav.contact"), end: false, badge: unread },
            ...(!isAdmin && isAuthenticated ? [{ to: "/dashboard", label: t("nav.dashboard"), end: false }] : []),
            ...(isAdmin ? [{ to: "/admin", label: t("nav.admin"), end: false }] : []),
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide rounded-none transition-colors duration-150 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {item.badge ? (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center bg-blue-600 text-[10px] font-bold text-white px-1 rounded-full" aria-label={`${item.badge} non lu(s)`}>
                      {item.badge}
                    </span>
                  ) : null}
                  {/* Indicateur actif - ligne en bas */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions desktop */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Langue */}
          <div className="hidden md:flex items-center gap-0.5 mr-1" role="group" aria-label={t("nav.langLabel")}>
            {LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLang(lang)}
                aria-pressed={i18n.language.startsWith(lang)}
                className={`font-mono text-[11px] px-2 py-1 transition-colors rounded-none ${
                  i18n.language.startsWith(lang)
                    ? "text-blue-400"
                    : "text-gray-600 hover:text-gray-300"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Panier */}
          <Link
            to="/panier"
            className="relative flex h-10 w-10 items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            aria-label={t("nav.cart")}
          >
            <ShoppingCart className="h-[18px] w-[18px]" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center bg-blue-600 text-[10px] font-bold text-white px-1 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/profil")}
                aria-label={`Profil de ${user?.displayName}`}
                className="hidden sm:flex items-center gap-2 px-3 h-10 text-sm font-medium text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
              >
                <Fingerprint className="h-4 w-4 text-blue-400" aria-hidden="true" />
                {user?.displayName}
              </button>
              <button
                onClick={logout}
                aria-label={t("nav.logout")}
                className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-150"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/connexion")}
                className="hidden sm:flex h-10 px-4 items-center text-sm font-medium text-gray-400 hover:text-white transition-colors duration-150"
              >
                {t("nav.login")}
              </button>
              <button
                onClick={() => navigate("/inscription")}
                className="h-10 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-150"
              >
                {t("nav.register")}
              </button>
            </>
          )}

          {/* Burger mobile */}
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center text-gray-400 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: mobileDuration, ease: "easeOut" }}
            className="md:hidden border-t border-gray-800/60 bg-gray-950"
          >
            <div className="container py-5 flex flex-col gap-1">
              {[
                { to: "/", label: t("nav.home"), end: true },
                { to: "/catalogue", label: t("nav.solutions"), end: false },
                { to: "/contact", label: t("nav.contact"), end: false, badge: unread },
                ...(!isAdmin && isAuthenticated ? [{ to: "/dashboard", label: t("nav.dashboard"), end: false }] : []),
                ...(isAdmin ? [{ to: "/admin", label: t("nav.admin"), end: false }] : []),
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                      isActive ? "text-white bg-white/[0.06]" : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                    }`
                  }
                >
                  {item.label}
                  {item.badge ? (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center bg-blue-600 text-[10px] font-bold text-white px-1 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              ))}

              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-gray-800" role="group" aria-label={t("nav.langLabel")}>
                <span className="text-[11px] text-gray-600 font-mono">{t("nav.langLabel")} :</span>
                {LANGS.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { changeLang(lang); setOpen(false); }}
                    aria-pressed={i18n.language.startsWith(lang)}
                    className={`font-mono text-xs px-2 py-0.5 transition-colors ${
                      i18n.language.startsWith(lang) ? "text-blue-400" : "text-gray-600 hover:text-gray-300"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
