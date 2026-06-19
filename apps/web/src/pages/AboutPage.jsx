import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Lightbulb, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
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
      description: 'Healthcare and retail businesses depend on our systems daily. We maintain 99.9% uptime and treat data security as non-negotiable.'
    },
    {
      icon: Users,
      title: 'Partnership mindset',
      description: 'We succeed when our clients succeed. Our team works alongside yours as partners, not just vendors, to achieve your business goals.'
    }
  ];

  const team = [
    {
      name: 'Sachin Mahadik',
      role: 'Chief Executive Officer',
      bio: 'Experienced healthcare professional with 10 years of expertise in patient care and healthcare management, committed to quality service and compassionate support.',
    },
    {
      name: 'Rahul Shinde',
      role: 'Chief Technology Officer',
      bio: 'Led engineering teams at Fortune 500 companies. Specializes in scalable enterprise architecture.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - SM Zentrix</title>
        <meta name="description" content="Learn about SM Zentrix mission, vision, values, and team. We build enterprise software that reduces complexity for healthcare and retail businesses." />
      </Helmet>

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
                Building software that makes complex operations simple
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
                <h2 className="text-4xl font-bold mb-6">Our story</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    SM Zentrix was founded in 2018 by a team of healthcare IT professionals who were frustrated with the complexity and inefficiency of existing enterprise software. We saw clinics drowning in paperwork, hospitals struggling with disconnected systems, and retail businesses making decisions without proper data.
                  </p>
                  <p>
                    We started with a simple question: What if enterprise software actually made work easier instead of harder?
                  </p>
                  <p>
                    Today, we serve 2,847 organizations across healthcare and retail. Our clients range from single-location clinics to multi-facility hospital networks and retail chains. What they all have in common is a need for software that reduces complexity, not adds to it.
                  </p>
                  <p>
                    We measure our success by the time our clients save, the errors they avoid, and the growth they achieve. When a clinic tells us they can now see 47% more patients without hiring additional staff, or a pharmacy reports processing prescriptions 2.8x faster, we know we are on the right track.
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
                      To become the most trusted enterprise software partner for healthcare and retail businesses worldwide. We envision a future where technology empowers professionals to focus on what matters most: caring for patients and serving customers.
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
                      To build enterprise software that reduces complexity, improves efficiency, and enables growth. We create solutions that are powerful enough for large organizations yet simple enough for small teams to adopt quickly.
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
                The principles that guide everything we do
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
                Experienced professionals dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4">
                        <span className="text-3xl font-bold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
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