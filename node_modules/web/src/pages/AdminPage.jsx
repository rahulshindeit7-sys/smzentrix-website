import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Phone, MessageCircle, RefreshCw, LogOut, Calendar, Filter, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const API_BASE = 'http://localhost:3000';
const AUTH_KEY = 'sz_admin_auth';

const FILTERS = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
];

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) throw new Error('Incorrect password.');
      if (!res.ok) throw new Error('Server error. Is the API running?');
      sessionStorage.setItem(AUTH_KEY, password);
      onLogin(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg mx-auto mb-4">
            <span className="text-xl font-bold text-white">SZ</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">SM Zentrix Admin</h1>
          <p className="text-muted-foreground text-sm mt-1">Lead Management Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="bg-card border border-border/50 rounded-2xl p-6 shadow-premium space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full h-11 px-3.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl font-semibold" disabled={loading}>
            {loading ? 'Verifying...' : 'Login'}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Default password: <code className="bg-muted px-1.5 py-0.5 rounded font-mono">smzentrix@admin2024</code>
        </p>
      </motion.div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl border border-border/40 bg-card shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-extrabold tracking-tight">{value ?? '—'}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({ token, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/leads?filter=${filter}`, { headers }),
        fetch(`${API_BASE}/api/admin/stats`, { headers }),
      ]);
      if (!leadsRes.ok || !statsRes.ok) throw new Error('Failed to fetch data.');
      const [leadsData, statsData] = await Promise.all([leadsRes.json(), statsRes.json()]);
      setLeads(leadsData.leads || []);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.mobile?.includes(q) ||
      l.name?.toLowerCase().includes(q) ||
      l.product?.toLowerCase().includes(q) ||
      l.message?.toLowerCase().includes(q)
    );
  });

  const downloadCSV = () => {
    const header = 'Name,Mobile,Product,Message,Source,Date\n';
    const rows = filtered.map((l) =>
      [
        l.name || '',
        l.mobile,
        l.product || '',
        (l.message || '').replace(/,/g, ';'),
        l.source || '',
        new Date(l.createdAt).toLocaleString('en-IN'),
      ].join(',')
    );
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smzentrix-leads-${filter}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <span className="text-sm font-bold text-white">SZ</span>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none">SM Zentrix</h1>
              <p className="text-xs text-muted-foreground">Lead Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={fetchData} className="gap-1.5 rounded-lg" disabled={loading}>
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-1.5 rounded-lg text-muted-foreground">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Leads" value={stats?.total} icon={Users} color="bg-primary/10 text-primary" />
          <StatCard label="Today" value={stats?.today} icon={Calendar} color="bg-emerald-500/10 text-emerald-500" />
          <StatCard label="Last 7 Days" value={stats?.week} icon={Filter} color="bg-violet-500/10 text-violet-500" />
          <StatCard label="Last 30 Days" value={stats?.month} icon={Phone} color="bg-amber-500/10 text-amber-500" />
        </div>

        {/* Filters + Search + Download */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`h-9 px-4 rounded-lg text-sm font-semibold transition-all border ${
                  filter === f.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all w-48"
              />
            </div>
            <Button variant="outline" size="sm" onClick={downloadCSV} className="h-9 gap-1.5 rounded-lg">
              <Download className="h-3.5 w-3.5" /> CSV
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
            ⚠️ {error} — Make sure the API server is running on port 3000.
          </div>
        )}

        {/* Table */}
        <div className="rounded-2xl border border-border/40 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border/40">
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">#</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Name</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Mobile</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Product</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Message</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Source</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Date</th>
                  <th className="text-left px-5 py-3.5 font-bold text-foreground/80 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-muted-foreground">
                      <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
                      Loading leads...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-muted-foreground">
                      No leads found for this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead, i) => (
                    <motion.tr
                      key={lead._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="border-b border-border/30 hover:bg-muted/20 transition-all"
                    >
                      <td className="px-5 py-3.5 text-muted-foreground text-xs font-mono">{i + 1}</td>
                      <td className="px-5 py-3.5 font-semibold">{lead.name || <span className="text-muted-foreground/50 font-normal">—</span>}</td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-primary">+91 {lead.mobile}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {lead.product ? (
                          <Badge className="text-[10px] bg-primary/8 text-primary border-primary/20 whitespace-nowrap">
                            {lead.product}
                          </Badge>
                        ) : <span className="text-muted-foreground/50">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground max-w-[200px]">
                        <span className="truncate block">{lead.message || '—'}</span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs">{lead.source || '—'}</td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        }) : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <a
                          href={`https://wa.me/91${lead.mobile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap"
                        >
                          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                        </a>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-5 py-3 bg-muted/30 border-t border-border/30 text-xs text-muted-foreground">
              Showing {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(AUTH_KEY) || null);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setToken(null);
  };

  if (!token) return <LoginScreen onLogin={setToken} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}

export default AdminPage;
