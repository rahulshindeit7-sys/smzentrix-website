import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Baby, Heart, Brain, Smile, Sparkles, Eye, Activity, 
  Cloud, Server, Shuffle, ArrowRight, Check, Phone, Globe, MessageCircle,
  UserPlus, FileText, SendHorizonal, Workflow, CalendarClock,
  HeartPulse, Scan, Star, BarChart3, PhoneCall, Smartphone, ShieldCheck,
  QrCode, TrendingUp, Users, History, BellRing, Database, Monitor, Wallet
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import StatsSection from '@/components/StatsSection.jsx';
import FloatingCTA from '@/components/FloatingCTA.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function ProductsPage() {
  const specialties = [
    {
      name: 'GeneralCare OPD',
      subtitle: 'General Physician & Family Clinics',
      icon: Stethoscope,
      accent: 'border-t-blue-500 text-blue-500 dark:text-blue-400 bg-blue-500/5',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      features: ['Vitals Management', 'Diagnosis & Prescription', 'Lab Billing', 'Radiology Billing', 'Procedure Charges']
    },
    {
      name: 'Dentocare OPD',
      subtitle: 'Dental Clinics',
      icon: Smile,
      accent: 'border-t-teal-500 text-teal-500 dark:text-teal-400 bg-teal-500/5',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
      features: ['Tooth Charting', 'Dental Procedures', 'Treatment Planning', 'X-Ray Management', 'Before/After Tracking']
    },
    {
      name: 'Pediocare OPD',
      subtitle: 'Pediatric Clinics',
      icon: Baby,
      accent: 'border-t-rose-500 text-rose-500 dark:text-rose-400 bg-rose-500/5',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      features: ['Vaccination Chart', 'Vaccine Reminders', 'Growth Monitoring', 'Pediatric Vitals', 'Child Follow-up']
    },
    {
      name: 'Cardiocare OPD',
      subtitle: 'Cardiology Clinics',
      icon: Heart,
      accent: 'border-t-red-500 text-red-500 dark:text-red-400 bg-red-500/5',
      badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400',
      features: ['ECG Records', '2D Echo', 'TMT', 'Holter Monitoring', 'Cardiac Investigations']
    },
    {
      name: 'Gynacare OPD',
      subtitle: 'Gynecology & Obstetric Clinics',
      icon: Sparkles,
      accent: 'border-t-purple-500 text-purple-500 dark:text-purple-400 bg-purple-500/5',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      features: ['ANC Visits', 'LMP & EDD', 'Pregnancy Tracking', 'Gravida / Para', 'Sonography Advice']
    },
    {
      name: 'Dermatocare OPD',
      subtitle: 'Skin & Hair Clinics',
      icon: Eye,
      accent: 'border-t-cyan-500 text-cyan-500 dark:text-cyan-400 bg-cyan-500/5',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      features: ['Lesion Documentation', 'Treatment Photos', 'Before/After Images', 'PRP Billing', 'Laser Billing']
    },
    {
      name: 'ENTCare OPD',
      subtitle: 'ENT Clinics',
      icon: Activity,
      accent: 'border-t-amber-500 text-amber-500 dark:text-amber-400 bg-amber-500/5',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      features: ['Ear/Nose/Throat Examination', 'Audiometry', 'Nasal Endoscopy', 'Allergy History', 'ENT Procedures']
    },
    {
      name: 'Neurocare OPD',
      subtitle: 'Neurology Clinics',
      icon: Brain,
      accent: 'border-t-indigo-500 text-indigo-500 dark:text-indigo-400 bg-indigo-500/5',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      features: ['Seizure Management', 'Stroke Follow-up', 'Cranial Nerve Exam', 'EEG / EMG / NCV', 'CT / MRI Billing']
    },
    {
      name: 'EyeCare OPD',
      subtitle: 'Ophthalmology Clinics',
      icon: Eye,
      accent: 'border-t-emerald-500 text-emerald-500 dark:text-emerald-400 bg-emerald-500/5',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      features: ['Visual Acuity', 'Refraction Records', 'Slit Lamp Examination', 'Fundus Examination', 'IOL Calculation']
    }
  ];

  const whyFeatures = [
    {
      icon: UserPlus,
      title: 'Smart Patient Registration & Appointment Management',
      description: 'Register patients, manage appointments, token queue, and follow-ups from one unified platform.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(59,130,246,0.35)]',
      specialty: null,
    },
    {
      icon: History,
      title: 'Complete Patient History & Visit Timeline',
      description: 'Access previous visits, prescriptions, investigations, and treatment history instantly.',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(99,102,241,0.35)]',
      specialty: null,
    },
    {
      icon: SendHorizonal,
      title: 'Digital Prescription with WhatsApp Delivery',
      description: 'Generate professional prescriptions and send PDF directly to patients on WhatsApp.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(16,185,129,0.35)]',
      specialty: null,
    },
    {
      icon: Workflow,
      title: 'Clinic-Specific Workflows',
      description: 'Specialized workflows tailored for each specialty — from cardiology to dental and beyond.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(168,85,247,0.35)]',
      specialty: 'CardioCare · Pediocare · Gynacare · Dentocare · NeuroCare · EyeCare · ENT Care · Dermatocare · GeneralCare',
    },
    {
      icon: HeartPulse,
      title: 'ECG Interpretation & 2D Echo Templates',
      description: 'Quick cardiology documentation with ECG interpretation and 2D Echo impression templates.',
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(239,68,68,0.35)]',
      specialty: 'CardioCare',
    },
    {
      icon: CalendarClock,
      title: 'Vaccination Scheduler & Reminder System',
      description: 'Track vaccination schedules and automatically manage reminders for pediatric patients.',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(244,63,94,0.35)]',
      specialty: 'Pediocare',
    },
    {
      icon: Sparkles,
      title: 'ANC & Pregnancy Tracking',
      description: 'LMP, EDD, ANC visits, pregnancy progress, and complete maternal care management.',
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(236,72,153,0.35)]',
      specialty: 'Gynacare',
    },
    {
      icon: Smile,
      title: 'Tooth Charting & Dental Treatment Tracking',
      description: 'Dental charting, procedure history, treatment plans, and X-ray tracking in one place.',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(20,184,166,0.35)]',
      specialty: 'Dentocare',
    },
    {
      icon: QrCode,
      title: 'Patient Feedback & Google Review QR',
      description: 'Collect patient feedback and increase Google reviews using QR-based review links.',
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(6,182,212,0.35)]',
      specialty: null,
    },
    {
      icon: BarChart3,
      title: 'Doctor Revenue Dashboard & Business Analytics',
      description: 'Monitor revenue, collections, patient growth, and clinic performance at a glance.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(245,158,11,0.35)]',
      specialty: null,
    },
    {
      icon: Wallet,
      title: 'Billing, Collections & Outstanding Tracking',
      description: 'Manage billing, pending payments, receipts, and detailed financial reporting.',
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(249,115,22,0.35)]',
      specialty: null,
    },
    {
      icon: ShieldCheck,
      title: 'Role-Based Access Control',
      description: 'Secure access for Doctors, Receptionists, Assistant Doctors, and Administrators.',
      color: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(100,116,139,0.35)]',
      specialty: null,
    },
    {
      icon: Cloud,
      title: 'Cloud-First & Hybrid Deployment',
      description: 'Run fully online or use hybrid cloud + local deployment based on your clinic needs.',
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(14,165,233,0.35)]',
      specialty: null,
    },
    {
      icon: Database,
      title: 'Secure Backup & Data Protection',
      description: 'Protect patient records with backup, recovery, and enterprise-grade secure data management.',
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(139,92,246,0.35)]',
      specialty: null,
    },
    {
      icon: Monitor,
      title: 'Multi-Device Access',
      description: 'Access the platform from desktop, laptop, tablet, and mobile devices seamlessly.',
      color: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(217,70,239,0.35)]',
      specialty: null,
    },
    {
      icon: BellRing,
      title: 'WhatsApp Appointment & Follow-up Reminders',
      description: 'Reduce missed appointments with automated reminders and follow-up notifications.',
      color: 'text-green-500 bg-green-500/10 border-green-500/20',
      iconGlow: 'group-hover:shadow-[0_0_18px_2px_rgba(34,197,94,0.35)]',
      specialty: null,
    },
  ];

  const deployments = [
    {
      title: 'Cloud Version',
      description: 'Access from Anywhere',
      icon: Cloud,
      accent: 'text-blue-500 bg-blue-500/10'
    },
    {
      title: 'Local Server Version',
      description: 'Complete In-Clinic Control',
      icon: Server,
      accent: 'text-indigo-500 bg-indigo-500/10'
    },
    {
      title: 'Hybrid Version',
      description: 'Works Even Without Internet',
      icon: Shuffle,
      accent: 'text-accent bg-accent/10'
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Helmet>
        <title>Specialty OPD Software Products - SM Zentrix</title>
        <meta name="description" content="Explore SM Zentrix OPD Editions: Complete Clinic Management Software for General Physicains, Dental, Pediatric, Cardiology, Gynecology, Dermatology, ENT, and Neurology practices." />
      </Helmet>

      <Header />

      <main className="overflow-hidden bg-background text-foreground">
        <FloatingCTA />
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 dark:opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-4 py-1.5 text-sm rounded-full font-semibold">
                Specialty OPD Software Products
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.1] text-balance">
                Complete Clinic Management Software for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Modern Healthcare Practices</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                From patient registration to billing, prescriptions, reports, and specialty workflows — everything your clinic needs in one platform.
              </p>
              <p className="text-lg font-bold text-primary mb-12 tracking-wide">
                One OPD Platform. Eight Specialty-Ready Editions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button asChild size="lg" className="h-14 px-8 text-lg shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-smooth rounded-xl">
                  <a href="#contact-demo">
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg hover:bg-muted transition-smooth rounded-xl border-border/60">
                  <a href="https://wa.me/919011589198" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 text-sm text-muted-foreground/80">
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />Free Demo</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />No Credit Card</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />9 Specialties</span>
              </div>
            </motion.div>
          </div>
        </section>

        <StatsSection />

        {/* SPECIALTY EDITIONS */}
        <section className="py-24 bg-muted/20 relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Specialty OPD Editions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Optimized layouts and specialized workflows tailored for your practice field.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {specialties.map((spec, index) => {
                const SpecIcon = spec.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Card className={`h-full border-t-4 bg-card shadow-sm hover:shadow-premium hover:-translate-y-2 transition-smooth rounded-2xl flex flex-col justify-between ${spec.accent}`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-xl ${spec.badgeColor}`}>
                            <SpecIcon className="h-6 w-6" />
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold tracking-tight">{spec.name}</CardTitle>
                        <CardDescription className="text-sm font-semibold leading-relaxed mt-1">{spec.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2.5">
                          {spec.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-foreground/80 font-medium">
                              <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0 bg-emerald-500/10 p-0.5 rounded-full" />
                              <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* WHY CLINICS CHOOSE SM ZENTRIX OPD */}
        <section className="py-28 bg-background relative border-t border-border/30 overflow-hidden">
          {/* Ambient background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.07),transparent)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* ── TOP TRUST BANNER ── */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 border border-primary/25 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-foreground/80 tracking-wide">Trusted Healthcare Technology for Modern Clinics</span>
              </div>
            </motion.div>

            {/* ── SECTION HEADING ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-[1.1]">
                WHY CLINICS CHOOSE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  SM ZENTRIX OPD
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                9 Specialized Clinic Solutions &bull; One Secure Healthcare Platform
              </p>
            </motion.div>

            {/* ── 4 HIGHLIGHT BADGES ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {[
                { label: 'Cloud First', color: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25' },
                { label: 'Hybrid Ready', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25' },
                { label: 'WhatsApp Enabled', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                { label: 'Secure Healthcare Platform', color: 'text-primary bg-primary/10 border-primary/25' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide ${badge.color}`}
                >
                  <Check className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </motion.div>

            {/* ── SPECIALTY EDITION STRIP ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="flex flex-wrap justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2">Editions:</span>
                {['GeneralCare', 'CardioCare', 'Pediocare', 'Gynacare', 'Dentocare', 'NeuroCare', 'EyeCare', 'ENT Care', 'Dermatocare'].map((s) => (
                  <span key={s} className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/8 text-primary border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── FEATURE CARD GRID ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {whyFeatures.map((feat, index) => {
                const FeatIcon = feat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
                    className="h-full"
                  >
                    <div className="group h-full flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 ease-out">
                      {/* Icon */}
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${feat.color} ${feat.iconGlow} transition-all duration-300 flex-shrink-0`}>
                        <FeatIcon className="h-5 w-5" />
                      </div>
                      {/* Text */}
                      <div className="flex-1 space-y-1.5">
                        <p className="text-base font-bold text-foreground leading-snug">{feat.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                      </div>
                      {/* Specialty badge */}
                      {feat.specialty && (
                        <div className="pt-1">
                          <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-muted text-muted-foreground border border-border/60 leading-relaxed">
                            {feat.specialty}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>
        </section>

        {/* DEPLOYMENT OPTIONS */}
        <section className="py-24 bg-muted/20 relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Deployment Options</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Adapt to your clinic connectivity levels. Choose the perfect environment setup for your operations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {deployments.map((deploy, index) => {
                const DeployIcon = deploy.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className={`h-full text-center p-8 bg-card border border-border/40 hover:shadow-premium hover:-translate-y-1.5 transition-smooth rounded-2xl ${index === 0 ? 'relative' : ''}`}>
                      {index === 0 && <Badge className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px]">Recommended</Badge>}
                      <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-6 shadow-inner ${deploy.accent}`}>
                        <DeployIcon className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 tracking-tight">{deploy.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{deploy.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DEMO REQUEST SECTION */}
        <section id="contact-demo" className="py-24 bg-background relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden border border-border/50 bg-card/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-premium group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-extrabold tracking-tight">Request a Free Demo</h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Experience how SM Zentrix OPD can simplify your clinic workflow. Schedule a virtual or physical tour with our implementation team.
                    </p>
                    <div className="space-y-3">
                      <a href="tel:+919011589198" className="flex items-center space-x-3 text-sm font-semibold text-foreground/90 hover:text-primary transition-smooth">
                        <Phone className="h-[18px] w-[18px] text-primary" />
                        <span>+91 90115 89198</span>
                      </a>
                      <a href="tel:+918976318505" className="flex items-center space-x-3 text-sm font-semibold text-foreground/90 hover:text-primary transition-smooth">
                        <Phone className="h-[18px] w-[18px] text-primary" />
                        <span>+91 89763 18505</span>
                      </a>
                      <a href="tel:+919011587977" className="flex items-center space-x-3 text-sm font-semibold text-foreground/90 hover:text-primary transition-smooth">
                        <Phone className="h-[18px] w-[18px] text-primary" />
                        <span>+91 90115 87977</span>
                      </a>
                      <a href="https://smzentrix.info" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-sm font-semibold text-foreground/90 hover:text-primary transition-smooth">
                        <Globe className="h-[18px] w-[18px] text-primary" />
                        <span>smzentrix.info</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-muted/40 rounded-2xl border border-border/40">
                    <h3 className="text-lg font-bold mb-4 text-center">Ready to see it in action?</h3>
                    <Button asChild size="lg" className="w-full h-14 text-base shadow-md hover:shadow-lg rounded-xl font-semibold">
                      <a href="/contact">Book Free Demo</a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </motion.div>
  );
}

export default ProductsPage;