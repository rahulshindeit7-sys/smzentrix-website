import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Zap, Target, TrendingUp, Stethoscope, Building2, Cloud, Globe, Bot, CreditCard, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FeatureCard from '@/components/FeatureCard.jsx';
import DashboardMockup from '@/components/DashboardMockup.jsx';

function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  const valueProps = [{
    icon: Zap,
    title: 'Reduces effort and complexity',
    description: 'Streamline operations with intuitive software that eliminates manual processes and reduces administrative burden by 47.2%.'
  }, {
    icon: Target,
    title: 'Improves convenience and user experience',
    description: 'Modern interfaces designed for healthcare and retail professionals. Reduce training time and increase adoption rates across your team.'
  }, {
    icon: TrendingUp,
    title: 'Enables growth focus',
    description: 'Free up resources to focus on what matters. Our clients report 2.3x faster business growth after implementation.'
  }];
  
  const solutions = [{
    icon: Stethoscope,
    title: 'OPD Management Systems',
    description: 'Complete outpatient department management with appointment scheduling, patient records, billing, and real-time analytics.'
  }, {
    icon: Building2,
    title: 'Healthcare ERP',
    description: 'Integrated enterprise resource planning for hospitals and healthcare networks. Manage inventory, staff, finances, and patient care in one platform.'
  }, {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Secure, scalable cloud infrastructure and migration services. Access your systems anywhere, anytime.'
  }];
  
  const faqs = [{
    question: 'How long does implementation typically take?',
    answer: 'Most implementations are completed within 4-8 weeks, depending on the complexity of your requirements. We provide dedicated onboarding support and training throughout the process.'
  }, {
    question: 'Is my data secure and compliant?',
    answer: 'Absolutely. We maintain HIPAA compliance for healthcare clients and follow industry-standard security practices including encryption, regular backups, and secure cloud infrastructure.'
  }, {
    question: 'What happens to my data if I need to migrate away?',
    answer: 'You own your data. We provide full data export capabilities in standard formats and assist with migration if needed. No lock-in, no hidden fees.'
  }];

  const services = [
    {
      icon: Stethoscope,
      title: 'Custom Doctor Website',
      description: 'We build professional, mobile-friendly and SEO-ready websites for doctors and clinics with appointment booking, WhatsApp enquiry, Google Maps, testimonials and online payment integration.',
      features: [
        'Doctor profile and clinic information',
        'Online appointment booking',
        'WhatsApp booking automation',
        'SEO-ready pages',
        'Google Maps and clinic location',
        'Online payment gateway integration',
        'Mobile and tablet responsive design',
        'Fast and secure hosting setup'
      ]
    },
    {
      icon: Globe,
      title: 'Clinic & Organization Website',
      description: 'We create customized websites for clinics, hospitals, organizations, businesses and local service providers with modern design, enquiry forms and lead generation setup.',
      features: [
        'Custom website design',
        'Contact and enquiry forms',
        'Service pages',
        'Gallery and testimonials',
        'SEO setup',
        'Domain and hosting support',
        'Mobile responsive layout'
      ]
    },
    {
      icon: Bot,
      title: 'WhatsApp Automation',
      description: 'We help businesses automate customer communication using WhatsApp for appointment confirmation, enquiry handling, reminders and quick follow-ups.',
      features: [
        'WhatsApp booking button',
        'Appointment confirmation message',
        'Follow-up reminders',
        'Prescription or document sharing support',
        'Customer enquiry flow'
      ]
    },
    {
      icon: CreditCard,
      title: 'Online Payment Gateway',
      description: 'We integrate secure online payment gateways like Razorpay for appointment fees, consultation fees and service payments.',
      features: [
        'Razorpay integration',
        'UPI/card/netbanking support',
        'Payment success/failure page',
        'Secure checkout flow'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>SM Zentrix - Enterprise Solutions for Healthcare & Retail</title>
        <meta name="description" content="Reduce complexity and improve operations with SM Zentrix enterprise software. OPD management, healthcare ERP, retail solutions, and custom automation for growing businesses." />
        <meta property="og:title" content="SM Zentrix - Enterprise Solutions for Healthcare & Retail" />
        <meta property="og:description" content="Reduce complexity and improve operations with SM Zentrix enterprise software." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main>
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
          <motion.div 
            style={{ y: y1, opacity: opacity1 }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAxIiBoZWlnaHQ9IjYwMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" 
          />
          {/* Drifting glowing background blobs */}
          <div className="glowing-bg-blob bg-primary w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] top-20 left-[-100px] animate-float-slow" />
          <div className="glowing-bg-blob bg-accent w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bottom-20 right-[-100px] animate-float-reverse" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight text-balance">
                  Enterprise solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse">healthcare</span> and retail
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  Reduce complexity and improve operations with software built for growing businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Button asChild size="lg" className="text-lg h-14 px-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-smooth rounded-xl">
                    <Link to="/contact">
                      Get started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 hover:bg-muted/80 transition-smooth rounded-xl border-border/60">
                    <Link to="/#services">View services</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 hover:bg-muted/80 transition-smooth rounded-xl border-border/60">
                    <Link to="/products">View products</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/25 to-accent/25 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-80 transition-smooth" />
                  <img 
                    src="/dashboard_hero_mockup.png" 
                    alt="SM Zentrix interactive dashboard showing clinical and pharmacy management metrics" 
                    className="rounded-2xl shadow-premium relative z-10 border border-border/40 hover:scale-[1.02] transition-smooth cursor-pointer" 
                    loading="eager" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Why choose SM Zentrix</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Built for businesses that need more than generic software
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {valueProps.map((prop, index) => <FeatureCard key={index} feature={prop} index={index} />)}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Core solutions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Comprehensive software for healthcare and retail operations
              </p>
            </motion.div>

            <div className="space-y-20 max-w-6xl mx-auto">
              {solutions.map((solution, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }} 
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {index % 2 === 0 ? <>
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-16 flex items-center justify-center shadow-inner border border-border/50 group hover:shadow-premium transition-smooth">
                          <solution.icon className="h-32 w-32 text-primary group-hover:scale-110 transition-smooth" />
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{solution.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {solution.description}
                          </p>
                          <Button asChild className="mt-4 h-12 px-6 rounded-xl shadow-sm hover:shadow-md transition-smooth" variant="outline">
                            <Link to="/products">Learn more</Link>
                          </Button>
                        </div>
                      </> : <>
                        <div className="order-2 md:order-1 space-y-6">
                          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{solution.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {solution.description}
                          </p>
                          <Button asChild className="mt-4 h-12 px-6 rounded-xl shadow-sm hover:shadow-md transition-smooth" variant="outline">
                            <Link to="/products">Learn more</Link>
                          </Button>
                        </div>
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-16 flex items-center justify-center shadow-inner border border-border/50 order-1 md:order-2 group hover:shadow-premium transition-smooth">
                          <solution.icon className="h-32 w-32 text-primary group-hover:scale-110 transition-smooth" />
                        </div>
                      </>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-24 bg-background relative overflow-hidden scroll-mt-24">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -top-16 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Premium website and automation services designed for clinics, healthcare teams, and growing businesses.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-premium hover:-translate-y-1 transition-smooth"
                >
                  <div className="p-6 sm:p-7 border-b border-border/40">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary shrink-0 group-hover:scale-105 transition-smooth">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Features</p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 max-w-5xl mx-auto rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:p-10 shadow-premium"
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Need a website for your clinic or business?
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Get a customized website with booking, WhatsApp automation, SEO and payment gateway setup.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="h-13 px-7 rounded-xl shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-smooth">
                    <Link to="/contact">Get Website Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-13 px-7 rounded-xl border-border/60 hover:bg-muted/80 transition-smooth">
                    <a href="https://wa.me/919011589198" target="_blank" rel="noreferrer">Discuss on WhatsApp</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">See it in action</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professional dashboards built for real-world operations
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <DashboardMockup type="opd" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-background relative border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Frequently asked questions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about SM Zentrix
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm shadow-sm data-[state=open]:shadow-md transition-smooth">
                    <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-smooth py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to transform your operations?</h2>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Join 2,847 organizations already using SM Zentrix to streamline their workflows
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-smooth rounded-xl">
                  <Link to="/contact">Get started today</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-smooth rounded-xl backdrop-blur-sm">
                  <Link to="/products">Explore products</Link>
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

export default HomePage;