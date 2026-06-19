import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Stethoscope, Cloud, MessageCircle, Monitor, ShieldCheck, Eye } from 'lucide-react';

// ─── Animated count-up for static numbers ───────────────────────────────────
function AnimatedNumber({ value, suffix = '', inView }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    const duration = 1800;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, inView]);

  return <>{display.toLocaleString()}{suffix}</>;
}

// ─── Live visit counter via CountAPI ────────────────────────────────────────
// namespace = your domain slug, key = counter name (change if needed)
const COUNT_NAMESPACE = 'smzentrix';
const COUNT_KEY = 'website-visits';

function VisitCounter({ inView }) {
  const [count, setCount] = useState(null);
  const [animated, setAnimated] = useState(0);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    // Hit (increment) the counter on every page load
    fetch(`https://api.countapi.xyz/hit/${COUNT_NAMESPACE}/${COUNT_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.value === 'number') {
          setCount(data.value);
        }
      })
      .catch(() => {
        // Silently fail — show a dash if API is unavailable
        setCount(null);
      });
  }, []);

  // Animate the number once we have a real value and section is in view
  useEffect(() => {
    if (!inView || count === null) return;
    let start = 0;
    const end = count;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimated(end);
        clearInterval(timer);
      } else {
        setAnimated(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [count, inView]);

  if (count === null) return <>—</>;
  return <>{animated.toLocaleString()}</>;
}

// ─── Static capability stats ─────────────────────────────────────────────────
const stats = [
  {
    icon: Eye,
    label: 'Total Visits',
    description: 'Live website visitor count',
    color: 'text-primary bg-primary/10 border-primary/20',
    isVisitCounter: true,
  },
  {
    icon: Stethoscope,
    value: '9',
    suffix: '',
    label: 'Specialty Editions',
    description: 'Purpose-built clinic solutions',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Cloud,
    value: '99.9',
    suffix: '%',
    label: 'Cloud Uptime',
    description: 'Reliable & always available',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Integrated',
    description: 'Prescriptions & reminders',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    isText: true,
    displayText: '✓',
  },
  {
    icon: ShieldCheck,
    label: 'Secure Platform',
    description: 'Role-based access & backups',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    isText: true,
    displayText: '✓',
  },
];

// ─── Main component ──────────────────────────────────────────────────────────
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-premium hover:-translate-y-1 transition-smooth h-full">
                    {/* Live badge for visit counter */}
                    {stat.isVisitCounter && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                        Live
                      </span>
                    )}

                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${stat.color} mb-3 group-hover:scale-110 transition-smooth`}>
                      <StatIcon className="h-5 w-5" />
                    </div>

                    <div className="text-2xl md:text-3xl font-extrabold tracking-tight mb-0.5">
                      {stat.isVisitCounter ? (
                        <VisitCounter inView={isInView} />
                      ) : stat.isText ? (
                        <span className="text-emerald-500">{stat.displayText}</span>
                      ) : (
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                      )}
                    </div>

                    <p className="text-sm font-bold text-foreground mb-0.5">{stat.label}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
