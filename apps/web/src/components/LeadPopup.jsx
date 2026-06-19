import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const POPUP_KEY = 'sz_lead_popup_ts';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

const PRODUCTS = [
  'SM Zentrix OPD — General Care',
  'SM Zentrix OPD — CardioCare',
  'SM Zentrix OPD — Pediocare',
  'SM Zentrix OPD — Gynacare',
  'SM Zentrix OPD — Dentocare',
  'SM Zentrix OPD — NeuroCare',
  'SM Zentrix OPD — EyeCare',
  'SM Zentrix OPD — ENT Care',
  'SM Zentrix OPD — Dermatocare',
  'Online Edition — Premium',
  'Online Edition — Premium+',
  'Hybrid Edition — Premium',
  'Hybrid Edition — Premium+',
  'Not sure yet',
];

function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    product: '',
    message: '',
  });

  // Show popup after 1 second delay (once per 24h via localStorage)
  useEffect(() => {
    const last = localStorage.getItem(POPUP_KEY);
    if (last && Date.now() - parseInt(last, 10) < COOLDOWN_MS) return;

    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(POPUP_KEY, String(Date.now()));
    setOpen(false);
  };

  const validate = () => {
    if (!form.mobile.trim()) return 'Mobile number is required.';
    const clean = form.mobile.replace(/[\s\-]/g, '').replace(/^\+91/, '');
    if (!/^[6-9]\d{9}$/.test(clean)) return 'Enter a valid 10-digit Indian mobile number.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim() || null,
          mobile: form.mobile.trim(),
          product: form.product || null,
          message: form.message.trim() || null,
          source: 'Contact Page Popup',
          page_url: window.location.href,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      localStorage.setItem(POPUP_KEY, String(Date.now()));
      setStep('success');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            onClick={dismiss}
          />

          {/* Popup */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto">

              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />

              {/* Dismiss button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth p-1.5 rounded-lg hover:bg-muted/60"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <AnimatePresence mode="wait" initial={false}>
                {step === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 sm:p-7"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-5 pr-6">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold tracking-tight leading-tight">Request a Callback</h2>
                        <p className="text-sm text-muted-foreground mt-1 leading-snug">
                          Enter your mobile number and our team will contact you shortly.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                          Name <span className="font-normal normal-case">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Dr. Ramesh Patil"
                          value={form.name}
                          onChange={update('name')}
                          className="w-full h-11 px-3.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                        />
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="flex h-11 items-center px-3 rounded-xl border border-border/60 bg-muted/40 text-sm font-semibold text-muted-foreground select-none">
                            +91
                          </div>
                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="90115 89198"
                            value={form.mobile}
                            onChange={update('mobile')}
                            maxLength={15}
                            className="flex-1 h-11 px-3.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                          />
                        </div>
                        {error && (
                          <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
                        )}
                      </div>

                      {/* Product */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                          Interested Product <span className="font-normal normal-case">(optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            value={form.product}
                            onChange={update('product')}
                            className="w-full h-11 px-3.5 pr-9 rounded-xl border border-border/60 bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                          >
                            <option value="">Select a product...</option>
                            {PRODUCTS.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                          Message <span className="font-normal normal-case">(optional)</span>
                        </label>
                        <textarea
                          placeholder="Tell us about your clinic or any specific requirements..."
                          value={form.message}
                          onChange={update('message')}
                          rows={3}
                          className="w-full px-3.5 py-3 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth resize-none"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-1">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1 h-12 rounded-xl font-semibold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-smooth"
                        >
                          {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                          ) : (
                            'Request Callback'
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={dismiss}
                          className="h-12 px-4 rounded-xl text-muted-foreground hover:text-foreground"
                        >
                          Maybe Later
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 text-center"
                  >
                    <div className="flex justify-center mb-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                        <CheckCircle2 className="h-9 w-9 text-emerald-500" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-2">Thank You!</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed max-w-xs mx-auto">
                      Our team will contact you shortly. You can also reach us directly on WhatsApp.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="https://wa.me/919011589198"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-smooth"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                      </a>
                      <button
                        onClick={() => setOpen(false)}
                        className="h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LeadPopup;
