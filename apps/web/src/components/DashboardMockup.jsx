import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

function DashboardMockup({ type = 'opd' }) {
  const opdData = [
    { name: 'Mon', patients: 42, appointments: 38 },
    { name: 'Tue', patients: 51, appointments: 47 },
    { name: 'Wed', patients: 38, appointments: 35 },
    { name: 'Thu', patients: 47, appointments: 44 },
    { name: 'Fri', patients: 53, appointments: 49 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12400 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 13800 },
    { month: 'Apr', revenue: 16900 },
    { month: 'May', revenue: 18200 },
  ];

  const stats = type === 'opd' ? [
    { label: 'Today\'s Patients', value: '47', icon: Users, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { label: 'Pending Appointments', value: '12', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-600/10' },
    { label: 'Completed', value: '35', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-600/10' },
    { label: 'Revenue', value: 'Rs 2,847', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-600/10' },
  ] : [
    { label: 'Total Sales', value: 'Rs 18,247', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-600/10' },
    { label: 'Active Users', value: '2,847', icon: Users, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { label: 'Growth', value: '+47.2%', icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Orders', value: '1,284', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-600/10' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-border/50 shadow-premium relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-border/40 shadow-sm hover:shadow-md transition-smooth bg-card/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-secondary/20 font-medium">Live</Badge>
                </div>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <Card className="border-border/40 shadow-sm bg-card/80 backdrop-blur-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                {type === 'opd' ? 'Patient Flow' : 'Sales Trend'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={type === 'opd' ? opdData : revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey={type === 'opd' ? 'name' : 'month'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-premium)'
                    }} 
                  />
                  <Bar dataKey={type === 'opd' ? 'patients' : 'revenue'} fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <Card className="border-border/40 shadow-sm bg-card/80 backdrop-blur-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={type === 'opd' ? opdData : revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey={type === 'opd' ? 'name' : 'month'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-premium)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey={type === 'opd' ? 'appointments' : 'revenue'} 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardMockup;