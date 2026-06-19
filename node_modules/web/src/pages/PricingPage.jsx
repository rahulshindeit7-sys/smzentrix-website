import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check, ArrowRight, MessageCircle, Phone, Star, Zap, Wifi, WifiOff,
  Shield, Cloud, Smartphone, BarChart3, QrCode, HeartPulse, Gift,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';

// ─── Data ────────────────────────────────────────────────────────────────────

const editions = [
  {
    id: 'online',
    name: 'Online Edition',
    subtitle: 'Suitable for clinics with stable internet connectivity.',
    icon: Wifi,
    accentFrom: 'from-primary',
    accentTo: 'to-accent',
    setup: { label: 'One-Time Setup', price: '₹5,000' },
    plans: [
      {
        name: 'Premium',
        price: '₹10,000',
        period: '/ Year AMC',
        badge: 'Best for Small Clinics',
        badgeColor: 'bg-primary/10 text-primary border-primary/20',
        highlight: false,
        features: [
          'Cloud Access',
          'Appointment Management',
          'Digital Prescription',
          'Billing & Reports',
          'WhatsApp Appointment Reminder',
          'Secure Cloud Backup',
          'Mobile & Tablet Access',
        ],
      },
      {
        name: 'Premium+',
        price: '₹12,000',
        period: '/ Year AMC',
        badge: 'Most Popular',
        badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
        highlight: true,
        features: [
          'Everything in Premium',
          'WhatsApp Prescription Delivery',
          'Doctor Revenue Dashboard',
          'Google Review QR System',
          'Priority Support',
          'Advanced Reports',
        ],
      },
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid Edition',
    subtitle: 'Suitable for clinics that require Internet + Offline Working.',
    icon: WifiOff,
    accentFrom: 'from-violet-600',
    accentTo: 'to-accent',
    setup: { label: 'One-Time Setup', price: '₹10,000' },
    plans: [
      {
        name: 'Premium',
        price: '₹15,000',
        period: '/ Year AMC',
        badge: 'Recommended',
        badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
        highlight: false,
        features: [
          'Works Online & Offline',
          'Automatic Data Synchronization',
          'Local Clinic Server Support',
          'Secure Backup & Recovery',
          'Multi-Device Access',
          'Appointment Management',
          'Billing & Prescription',
        ],
      },
      {
        name: 'Premium+',
        price: '₹18,000',
        period: '/ Year AMC',
        badge: 'Most Popular',
        badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
        highlight: true,
        features: [
          'Everything in Hybrid Premium',
          'WhatsApp Integration',
          'Doctor Revenue Dashboard',
          'Advanced Analytics',
          'Priority Support',
          'Performance Optimization',
          'Offline Data Recovery Support',
        ],
      },
    ],
  },
];

const comparisonFeatures = [
  { label: 'Appointment Management', online: true, hybrid: true },
  { label: 'Digital Prescription', online: true, hybrid: true },
  { label: 'Billing & Reports', online: true, hybrid: true },
  { label: 'Cloud Access', online: true, hybrid: true },
  { label: 'Mobile & Tablet Access', online: true, hybrid: true },
  { label: 'WhatsApp Reminders', online: true, hybrid: true },
  { label: 'Secure Backup', online: true, hybrid: true },
  { label: 'Works Offline', online: false, hybrid: true },
  { label: 'Local Server Support', online: false, hybrid: true },
  { label: 'Auto Data Sync', online: false, hybrid: true },
  { label: 'Offline Data Recovery', online: false, hybrid: true },
  { label: 'Doctor Revenue Dashboard', online: 'Premium+', hybrid: 'Premium+' },
  { label: 'Google Review QR', online: 'Premium+', hybrid: false },
  { label: 'Advanced Analytics', online: 'Premium+', hybrid: 'Premium+' },
  { label: 'Priority Support', online: 'Premium+', hybrid: 'Premium+' },
];

const faqs = [
  {
    q: 'What is the difference between Online and Hybrid?',
    a: 'The Online Edition runs entirely on the cloud and requires a stable internet connection at all times. The Hybrid Edition combines cloud access with a local server, allowing the software to continue working even when the internet is down — making it ideal for clinics in areas with unreliable connectivity.',
  },
  {
    q: 'Does the software work without internet?',
    a: 'The Online Edition requires an active internet connection to function. The Hybrid Edition is specifically designed to work offline using a local clinic server, with automatic data synchronization once the connection is restored.',
  },
  {
    q: 'Is training included?',
    a: 'Yes! Training and onboarding support are included with all plans. Our team will walk you and your staff through the complete software setup, day-to-day workflows, and specialty-specific features — at your clinic or virtually.',
  },
  {
    q: 'Is WhatsApp integration available?',
    a: 'Yes. WhatsApp Appointment Reminders are available in the Online Premium plan. WhatsApp Prescription Delivery is available in the Online Premium+ plan. Full WhatsApp Integration (reminders + prescriptions + notifications) is available in the Hybrid Premium+ plan.',
  },
  {
    q: 'Can data be backed up securely?',
    a: 'Absolutely. All plans include secure backup capabilities. The Online Edition uses encrypted cloud backup. The Hybrid Edition supports both cloud and local backup with offline data recovery support available in the Premium+ plan.',
  },
  {
    q: 'Can multiple devices use the software?',
    a: 'Yes. All plans support multi-device access including desktop computers, laptops, tablets, and mobile phones. Doctor, receptionist, and assistant logins are all supported with role-based access control.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SetupBadge({ setup }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-muted/60 border border-border/50 mb-6">
      <span className="text-sm font-semibold text-muted-foreground">{setup.label}</span>
      <span className="text-base font-extrabold text-foreground">{setup.price}</span>
    </div>
  );
}

function PlanCard({ plan, editionAccentFrom, editionAccentTo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className={`relative flex flex-col h-full rounded-2xl border transition-smooth overflow-hidden
        ${plan.highlight
          ? 'border-emerald-500/40 shadow-[0_0_40px_-8px_rgba(16,185,129,0.2)] dark:shadow-[0_0_40px_-8px_rgba(16,185,129,0.15)]'
          : 'border-border/40 hover:shadow-premium hover:-translate-y-1'
        }`}
      >
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${plan.highlight ? 'from-emerald-400 to-accent' : `${editionAccentFrom} ${editionAccentTo}`}`} />

        {/* Popular glow bg for highlighted */}
        {plan.highlight && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-accent/5 pointer-events-none" />
        )}

        <div className="relative z-10 flex flex-col flex-1 p-6 md:p-8 bg-card">
          {/* Badge */}
          <div className="mb-4">
            <Badge className={`text-xs font-bold border px-3 py-1 rounded-full ${plan.badgeColor}`}>
              {plan.highlight && <Star className="h-3 w-3 mr-1 inline fill-current" />}
              {plan.badge}
            </Badge>
          </div>

          {/* Plan name */}
          <h3 className="text-xl font-extrabold tracking-tight mb-1">{plan.name}</h3>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{plan.price}</span>
            <span className="text-sm text-muted-foreground mb-1.5 font-medium">{plan.period}</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-8">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center
                  ${plan.highlight ? 'bg-emerald-500/15 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                  <Check className="h-3 w-3" />
                </div>
                <span className={`leading-snug ${f.startsWith('Everything') ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className={`w-full h-12 rounded-xl font-semibold transition-smooth
              ${plan.highlight
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                : 'shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5'
              }`}>
              <Link to="/contact">
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full rounded-xl border-border/50 hover:bg-muted/60 transition-smooth">
              <a href="https://wa.me/919011589198" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-500" />
                WhatsApp Inquiry
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EditionSection({ edition, index }) {
  const EditionIcon = edition.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16 last:mb-0"
    >
      {/* Edition header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${edition.accentFrom} ${edition.accentTo} text-white shadow-lg`}>
          <EditionIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{edition.name}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{edition.subtitle}</p>
        </div>
      </div>

      {/* Setup badge */}
      <div className="max-w-xs mb-8">
        <SetupBadge setup={edition.setup} />
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {edition.plans.map((plan, i) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            editionAccentFrom={edition.accentFrom}
            editionAccentTo={edition.accentTo}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Edition Comparison</h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">See which features are included in each edition at a glance.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/40 shadow-premium">
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="bg-muted/60 border-b border-border/40">
              <th className="text-left px-6 py-4 font-bold text-foreground w-1/2">Feature</th>
              <th className="text-center px-4 py-4 font-bold text-primary">Online Edition</th>
              <th className="text-center px-4 py-4 font-bold text-violet-600 dark:text-violet-400">Hybrid Edition</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feat, i) => (
              <tr key={i} className={`border-b border-border/30 transition-smooth hover:bg-muted/30 ${i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}`}>
                <td className="px-6 py-3.5 font-medium text-foreground/90">{feat.label}</td>
                <td className="px-4 py-3.5 text-center">
                  {feat.online === true ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : feat.online === false ? (
                    <span className="text-muted-foreground/40 text-base">—</span>
                  ) : (
                    <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20 font-semibold">{feat.online}</Badge>
                  )}
                </td>
                <td className="px-4 py-3.5 text-center">
                  {feat.hybrid === true ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 mx-auto">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : feat.hybrid === false ? (
                    <span className="text-muted-foreground/40 text-base">—</span>
                  ) : (
                    <Badge className="text-[10px] bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20 font-semibold">{feat.hybrid}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between text-left gap-4 px-6 py-5 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-primary/20 transition-smooth group"
        aria-expanded={open}
      >
        <span className="font-semibold text-base text-foreground group-hover:text-primary transition-smooth leading-snug">
          {faq.q}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-smooth">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-3 text-sm text-muted-foreground leading-relaxed border border-t-0 border-border/40 rounded-b-xl bg-muted/20">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function PricingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Pricing — SM Zentrix OPD Software</title>
        <meta name="description" content="Transparent pricing for SM Zentrix Specialty OPD Software. Online and Hybrid editions with Premium and Premium+ plans. Starting from ₹10,000/year." />
      </Helmet>

      <Header />

      <main className="overflow-hidden bg-background text-foreground">
        <FloatingCTA />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 dark:opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-4 py-1.5 text-sm rounded-full font-semibold">
                Simple, Transparent Pricing
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] text-balance">
                Plans built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">every clinic</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                Choose the edition that fits your clinic's connectivity and workflow. No hidden fees. Cancel or upgrade anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="h-14 px-8 text-lg shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-smooth rounded-xl">
                  <Link to="/contact">
                    Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg hover:bg-muted transition-smooth rounded-xl border-border/60">
                  <a href="https://wa.me/919011589198" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
              {/* Trust strip */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 text-sm text-muted-foreground/80">
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />Free Demo</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />No Hidden Fees</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />Training Included</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />WhatsApp Support</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PRICING EDITIONS ── */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {editions.map((edition, i) => (
                <EditionSection key={edition.id} edition={edition} index={i} />
              ))}

              {/* Comparison Table */}
              <ComparisonTable />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-muted/20 relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Everything you need to know before choosing a plan.</p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline" className="rounded-xl h-11 px-6">
                  <Link to="/contact">
                    <Phone className="mr-2 h-4 w-4" /> Contact our team
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl h-11 px-6 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/5 dark:text-emerald-400">
                  <a href="https://wa.me/919011589198" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── REFERRAL OFFER ── */}
        <section className="py-20 bg-background relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/8 via-background to-accent/8 p-8 md:p-12 text-center shadow-premium">
                {/* Glow orbs */}
                <div className="absolute top-0 left-1/4 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-center mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <Badge className="mb-4 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 text-xs font-bold px-4 py-1.5 rounded-full">
                    🎁 Referral Offer
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                    Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-accent">₹1,000 Cashback</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                    Know a doctor or clinic that could benefit from SM Zentrix OPD? Refer them and earn <strong className="text-foreground">₹1,000 cashback</strong> on every successful clinic referral.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="h-13 px-8 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-smooth">
                      <a href="https://wa.me/919011589198?text=Hi%2C%20I%20would%20like%20to%20refer%20a%20clinic%20for%20SM%20Zentrix%20OPD" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" /> Refer via WhatsApp
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-13 px-8 rounded-xl font-semibold border-border/60 hover:-translate-y-0.5 transition-smooth">
                      <Link to="/contact">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden bg-noise">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight">Ready to get started?</h2>
              <p className="text-xl mb-10 max-w-xl mx-auto opacity-90 leading-relaxed">
                Schedule a free demo and see how SM Zentrix OPD can transform your clinic workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-smooth rounded-xl">
                  <Link to="/contact">Book Free Demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-smooth rounded-xl backdrop-blur-sm">
                  <a href="tel:+919011589198">
                    <Phone className="mr-2 h-5 w-5" />+91 90115 89198
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}

export default PricingPage;
