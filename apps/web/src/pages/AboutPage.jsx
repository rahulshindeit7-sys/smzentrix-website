import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Lightbulb, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SeoMeta from '@/components/SeoMeta.jsx';

function AboutPage() {
  const [imageLoadFailed, setImageLoadFailed] = useState({});

  const values = [
    {
      icon: Heart,
      title: 'Customer-first approach',
      description: 'Every decision we make starts with understanding our clients\' needs. We build software that solves real problems, not just features that look good on paper.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation with purpose',
      description: 'We embrace new technologies when they deliver measurable value. Our innovation is driven by practical outcomes, not trends.'
    },
    {
      icon: Shield,
      title: 'Reliability and trust',
      description: 'We focus on dependable software, responsible handling of data, and long-term trust built through consistent service quality.'
    },
    {
      icon: Users,
      title: 'Partnership mindset',
      description: 'We succeed when our clients succeed. Our team works alongside yours as partners, not just vendors, to achieve your business goals.'
    }
  ];

  const team = [
    {
      name: 'Dr.Deepali Rahul Shinde',
      initials: 'DRS',
      photo: '/leadership/dr-deepali-rahul-shinde.jpg',
      role: 'Founder & Owner',
      bio: 'Founder and Owner of SM Zentrix. She leads the company vision, customer trust, service quality, operations, and long-term growth. Her focus is to make digital solutions simple, affordable, and useful for doctors, clinics, and small businesses.',
    },
    {
      name: 'Dr.Sachin Mahadik',
      initials: 'SM',
      photo: '/leadership/sachin-mahadik.jpg',
      role: 'Founder & Chief Executive Officer',
      bio: 'Experienced healthcare professional with 10 years of expertise in patient care and healthcare management, committed to quality service, smooth operations, and compassionate support.',
    },
    {
      name: 'Rahul Shinde',
      initials: 'RS',
      photo: '/leadership/rahul-shinde.jpg',
      role: 'Founder & Chief Technology Officer',
      bio: 'Leads product development, technology architecture, healthcare software solutions, deployment, and automation at SM Zentrix. He focuses on building reliable, scalable, and practical software products for clinics and businesses.'
    }
  ];

  return (
    <>
      <SeoMeta
        title="About Us - SM Zentrix"
        description="Learn the real story behind SM Zentrix and our mission to build practical, affordable, and reliable software for doctors, clinics, and small businesses."
        path="/about"
      />

      <Header />

      <main>
        <section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About SM Zentrix</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Founder-led software built to make everyday clinic and business operations simpler
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    SM Zentrix was born from a real journey, not just an idea.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Rahul</span> and <span className="font-semibold text-foreground">Deepa</span>, a husband-and-wife team, always wanted to start their own business, but the right path was not clear in the beginning. The turning point came when <span className="font-semibold text-foreground">Deepa</span>&apos;s brother, <span className="font-semibold text-foreground">Sachin Mahadik</span>, encouraged them to take the first step and start their own firm.
                  </p>
                  <p>
                    With his experience in healthcare and clinic operations, <span className="font-semibold text-foreground">Sachin Mahadik</span> suggested that their first product should solve a real problem for doctors - a simple and practical OPD management application.
                  </p>
                  <p>
                    That is how SM Zentrix began.
                  </p>
                  <p>
                    Our first focus is to build a complete OPD solution that helps clinics manage appointments, patient records, prescriptions, billing, reports, follow-ups, and day-to-day operations smoothly.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Deepa</span> and <span className="font-semibold text-foreground">Sachin Mahadik</span> guide the product as business analysts with a strong understanding of real clinic workflows. Along with her product guidance, <span className="font-semibold text-foreground">Deepa</span> has also been <span className="font-semibold text-foreground">Rahul</span>&apos;s strongest support system throughout this journey. Her belief, patience, and constant motivation encouraged <span className="font-semibold text-foreground">Rahul</span> to aim higher, take bold decisions, and complete the first product of SM Zentrix.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Rahul</span> leads the technology, product development, architecture, and deployment.
                  </p>
                  <p>
                    At SM Zentrix, our aim is simple: to create software that is easy to use, affordable, reliable, and genuinely useful for doctors, clinics, and small businesses.
                  </p>
                  <p>
                    We are building this company step by step, with trust, practical thinking, and a strong belief that good software should reduce work - not increase it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">Our vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To become a trusted software partner for doctors, clinics, and growing businesses by solving real operational problems in a practical way.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-l-4 border-l-accent">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <Target className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-3xl">Our mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To build software that is simple to use, affordable to adopt, reliable in day-to-day work, and genuinely useful for real business and clinic workflows.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our core values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Values that shape how we build, support, and grow with our clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Meet our leadership team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the people behind SM Zentrix
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={index === 2 ? 'md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none' : ''}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 overflow-hidden">
                        {member.photo && !imageLoadFailed[index] ? (
                          <img
                            src={member.photo}
                            alt={`${member.name} portrait`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            onError={() => setImageLoadFailed((prev) => ({ ...prev, [index]: true }))}
                          />
                        ) : (
                          <span className="text-3xl font-bold text-primary">
                            {member.initials}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                      <p className="text-sm text-primary text-center mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutPage;