import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Activity, CreditCard, Calendar, Shield, ArrowRight,
  TrendingUp, CheckCircle2, XCircle, Fingerprint, Package,
  ChevronRight, Star, AlertCircle,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageTransition } from "../../components/ui/PageTransition";
import { UserNav } from "../../components/layout/UserNav";
import { subscriptionsApi } from "../../api/subscriptions";
import { apiFetch } from "../../api/apiFetch";
import { toast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { imageForCategory } from "../../lib/serviceImages";

interface Payment {
  id: number;
  amount: number;
  status: string;
  paidAt: string;
}

interface Subscription {
  id: number;
  price: number;
  cycle: "monthly" | "yearly";
  status: string;
  nextBillingAt?: string;
  startDate: string;
  service: { id: number; title: string; categorySlug?: string };
}

interface Service {
  id: number;
  title: string;
  categorySlug: string;
  priceMonthly: number;
}

function useCountUp(target: number, duration = 1100, enabled = true) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, enabled]);
  return count;
}

function SecurityRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(circ);
  useEffect(() => {
    const id = setTimeout(() => setDash(circ * (1 - score / 100)), 120);
    return () => clearTimeout(id);
  }, [score, circ]);
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Moyen" : "Faible";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={10} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={10}
          strokeDasharray={circ} strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </svg>
      <div className="flex flex-col items-center" style={{ marginTop: -size * 0.72 }}>
        <span className="text-2xl font-black text-white">{score}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color }}>{label}</span>
      </div>
      <div style={{ marginTop: size * 0.52 }} />
    </div>
  );
}

function fmt(d: string, pattern = "dd MMM yyyy") {
  try { return format(new Date(d), pattern, { locale: fr }); }
  catch { return d; }
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ACTIVE";
  const ok = isActive || status === "paid";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${
      ok
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-red-500/10 text-red-400 border-red-500/20"
    }`}>
      {isActive ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      ) : ok ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {status === "ACTIVE" ? "Actif" : status === "paid" ? "Payé" : status === "CANCELLED" ? "Annulé" : status}
    </span>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const n = useCountUp(value);
  return <>{n.toLocaleString("fr-FR")}{suffix}</>;
}

function StatCard({
  icon, label, value, sub, numericValue,
  borderCls, iconCls, gradCls, delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  numericValue?: number;
  borderCls: string;
  iconCls: string;
  gradCls: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <div
      className={`relative overflow-hidden border ${borderCls} bg-gradient-to-br ${gradCls} bg-gray-900 rounded-none p-6 shadow-sm transition-all hover:bg-gray-800`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg mb-4 ${iconCls}`}>
        {icon}
      </div>
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">{label}</p>
      <div className="mt-1 text-2xl font-black text-white">
        {numericValue !== undefined && visible
          ? <AnimatedNumber value={numericValue} />
          : value}
      </div>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <UserNav />
      <div className="container py-10 space-y-8">
        <div className="h-28 skeleton rounded-none" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 skeleton" />)}
        </div>
        <div className="h-72 skeleton" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 skeleton" />
          <div className="h-64 skeleton" />
        </div>
      </div>
    </>
  );
}

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [recommended, setRecommended] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      subscriptionsApi.list(),
      apiFetch<Payment[]>("/api/payments/my"),
      apiFetch<Service[]>("/api/services"),
    ])
      .then(([subs, pays, services]) => {
        setSubscriptions(subs);
        setPayments(pays);
        const subscribedIds = new Set(subs.map((s) => s.service.id));
        const available = services.filter((s) => !subscribedIds.has(s.id));
        if (subs.length > 0) {
          const cat = subs[0].service.categorySlug;
          const sameCat = available.filter((s) => s.categorySlug === cat);
          setRecommended((sameCat.length > 0 ? sameCat : available).slice(0, 3));
        } else {
          setRecommended(available.slice(0, 3));
        }
      })
      .catch(() => toast("Erreur lors du chargement", "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE");
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const nextPayment = subscriptions
    .filter((s) => s.nextBillingAt)
    .sort((a, b) => new Date(a.nextBillingAt!).getTime() - new Date(b.nextBillingAt!).getTime())[0];

  const securityScore = Math.min(
    100,
    (activeSubs.length > 0 ? 40 : 0) +
    (payments.length > 0 ? 20 : 0) +
    (subscriptions.some((s) => s.status === "ACTIVE" && s.cycle === "yearly") ? 20 : 0) +
    Math.min(activeSubs.length * 10, 20)
  );

  const chartData = payments
    .slice()
    .sort((a, b) => new Date(a.paidAt).getTime() - new Date(b.paidAt).getTime())
    .map((p) => ({
      date: fmt(p.paidAt, "dd MMM"),
      amount: p.amount,
    }));

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <PageTransition>
      <UserNav />

      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600/4 blur-3xl" />
      </div>

      <div className="container relative py-10 space-y-8 pb-20">

        {/* Welcome banner */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border border-gray-800 bg-gray-900/80 p-7">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 border-2 border-blue-500/30 text-xl font-black text-blue-400 flex-shrink-0">
              {initials}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-mono tracking-widest px-2.5 py-1 rounded mb-2">
                <Fingerprint className="h-3 w-3" />
                ESPACE SÉCURISÉ
              </div>
              <h1 className="text-xl font-black text-white">
                Bonjour, {user?.displayName ?? "Utilisateur"} !
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {activeSubs.length > 0
                  ? `${activeSubs.length} service${activeSubs.length > 1 ? "s" : ""} actif${activeSubs.length > 1 ? "s" : ""} · protection en cours`
                  : "Aucun service actif pour l'instant"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <SecurityRing score={securityScore} size={110} />
            <p className="text-[10px] text-gray-500 uppercase tracking-widest -mt-1">Score sécurité</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/catalogue">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Package className="h-4 w-4" />
              Explorer les solutions
            </Button>
          </Link>
          <Link to="/profil">
            <Button variant="ghost" size="sm" className="gap-1.5 text-gray-400">
              Mon profil
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Shield className="h-5 w-5" />}
            label="Services actifs"
            value={activeSubs.length}
            numericValue={activeSubs.length}
            sub={activeSubs.length === 0 ? "Aucun service souscrit" : undefined}
            borderCls="border-blue-500/20"
            iconCls="bg-blue-500/10 text-blue-400"
            gradCls="from-blue-500/10 to-transparent"
            delay={0}
          />
          <StatCard
            icon={<CreditCard className="h-5 w-5" />}
            label="Total dépensé"
            value={`${totalPaid.toLocaleString("fr-FR")} €`}
            numericValue={Math.round(totalPaid)}
            borderCls="border-emerald-500/20"
            iconCls="bg-emerald-500/10 text-emerald-400"
            gradCls="from-emerald-500/10 to-transparent"
            delay={80}
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Prochain paiement"
            value={nextPayment?.nextBillingAt ? fmt(nextPayment.nextBillingAt) : "—"}
            borderCls="border-violet-500/20"
            iconCls="bg-violet-500/10 text-violet-400"
            gradCls="from-violet-500/10 to-transparent"
            delay={160}
          />
          <StatCard
            icon={<Activity className="h-5 w-5" />}
            label="Transactions"
            value={payments.length}
            numericValue={payments.length}
            borderCls="border-amber-500/20"
            iconCls="bg-amber-500/10 text-amber-400"
            gradCls="from-amber-500/10 to-transparent"
            delay={240}
          />
        </div>

        {/* Spending chart */}
        <Card className="p-7 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Historique des dépenses
            </h2>
            <Link to="/mes-paiements" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Voir tout <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-gray-600">
              <AlertCircle className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">Aucune dépense enregistrée</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#374151" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis stroke="#374151" tick={{ fontSize: 11, fill: "#6b7280" }} tickFormatter={(v) => `${v}€`} />
                <Tooltip
                  contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 0, fontSize: 12 }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#60a5fa" }}
                  formatter={(v: number) => [`${v} €`, "Montant"]}
                />
                <Line
                  type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#60a5fa" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Active subs + Recent payments */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Active subscriptions */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Mes abonnements actifs</h2>
              <Link to="/mes-abonnements" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Gérer <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {activeSubs.length === 0 ? (
              <Card className="p-10 text-center border-dashed">
                <Shield className="h-10 w-10 mx-auto mb-3 text-gray-700" />
                <p className="text-gray-500 text-sm">Aucun abonnement actif</p>
                <Link to="/catalogue">
                  <Button size="sm" className="mt-4 gap-1.5">
                    <Package className="h-4 w-4" />
                    Découvrir nos solutions
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {activeSubs.map((s) => (
                  <Card key={s.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="h-9 w-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{s.service.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {s.price} €/{s.cycle === "monthly" ? "mois" : "an"}
                        {s.nextBillingAt && ` · renouvellement le ${fmt(s.nextBillingAt)}`}
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Recent payments */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Derniers paiements</h2>
              <Link to="/mes-paiements" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Voir tout <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {payments.length === 0 ? (
              <Card className="p-10 text-center border-dashed">
                <CreditCard className="h-10 w-10 mx-auto mb-3 text-gray-700" />
                <p className="text-gray-500 text-sm">Aucun paiement effectué</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {payments.slice(0, 5).map((p) => (
                  <Card key={p.id} className="px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{p.amount} €</p>
                        <p className="text-xs text-gray-500">{fmt(p.paidAt)}</p>
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                Recommandé pour vous
              </h2>
              <Link to="/catalogue" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Tout le catalogue <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((s) => (
                <Card key={s.id} className="overflow-hidden p-0 group border-gray-800 hover:border-blue-500/30">
                  <div className="h-28 overflow-hidden">
                    <img
                      src={imageForCategory(s.categorySlug)}
                      alt={s.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{s.priceMonthly} €/mois</p>
                    <Link to={`/services/${s.id}`}>
                      <Button size="sm" variant="outline" className="mt-4 w-full gap-1.5">
                        Découvrir <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
