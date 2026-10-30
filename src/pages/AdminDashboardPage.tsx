import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  MessageCircle,
  Trash2,
  Edit3,
  Save,
  DollarSign,
  Shield,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { EnquirySubmission, RegionCode } from '../types';
import { REGIONS, INITIAL_SERVICE_PRICES } from '../data/pricingData';
import { BUSINESS_INFO } from '../utils/constants';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('abidi_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [smtpStatus, setSmtpStatus] = useState<boolean | null>(null);

  // Tab State: 'leads' | 'pricing' | 'system'
  const [activeTab, setActiveTab] = useState<'leads' | 'pricing' | 'system'>('leads');

  // Verify token on mount
  useEffect(() => {
    if (token) {
      verifySession();
    }
  }, [token]);

  const verifySession = async () => {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSmtpStatus(data.smtpConfigured);
        fetchEnquiries();
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('abidi_admin_token', data.token);
      setToken(data.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid password');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        // ignore network error on logout
      }
    }
    localStorage.removeItem('abidi_admin_token');
    setToken(null);
    setSelectedEnquiry(null);
    setEnquiries([]);
  };

  const fetchEnquiries = async () => {
    if (!token) return;
    setLoadingEnquiries(true);

    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterCountry !== 'all') params.append('country', filterCountry);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        if (selectedEnquiry) {
          const updated = (data.enquiries || []).find((e: any) => e.id === selectedEnquiry.id);
          if (updated) setSelectedEnquiry(updated);
        }
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnquiries();
    }
  }, [filterStatus, filterCountry, searchQuery]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleAddNote = async (id: string) => {
    if (!newNote.trim()) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: newNote }),
      });

      if (res.ok) {
        setNewNote('');
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Failed to add note', err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    }
  };

  const handleExport = (format: 'csv' | 'json') => {
    window.location.href = `/api/admin/export?format=${format}`;
  };

  // If not logged in, render secure login view
  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Studio Admin Access</h1>
            <p className="text-xs text-slate-400">
              Authorized management console for founder Syed Hadi Abidi.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Administrative Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Console'}
            </button>
          </form>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-400">Development Environment Notice:</p>
            <p>
              The default password configured in development is <code className="text-[#38BDF8] font-mono">AbidiWebStudio2026!</code> (can be customized via <code className="text-slate-300 font-mono">ADMIN_PASSWORD</code> in <code className="text-slate-300 font-mono">.env</code>).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Dashboard
  const statusCounts = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'New').length,
    contacted: enquiries.filter((e) => e.status === 'Contacted').length,
    qualified: enquiries.filter((e) => e.status === 'Qualified').length,
    inProgress: enquiries.filter((e) => e.status === 'In Progress').length,
    won: enquiries.filter((e) => e.status === 'Won').length,
    lost: enquiries.filter((e) => e.status === 'Lost').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#080D1A] border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h1 className="text-xl font-bold text-white">Abidi Web Studio Administration</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated as: <strong className="text-slate-200">Syed Hadi Abidi (Admin)</strong> · Secure Session Active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download CSV export"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download JSON export"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'leads' ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Project Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'system' ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          System Health & Credentials
        </button>
      </div>

      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Metric KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10">
              <span className="text-[11px] text-slate-500 font-mono">TOTAL LEADS</span>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {statusCounts.total}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-blue-500/30">
              <span className="text-[11px] text-blue-400 font-mono">NEW INBOX</span>
              <div className="text-xl font-bold font-mono text-[#38BDF8] mt-1 tabular-nums">
                {statusCounts.new}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10">
              <span className="text-[11px] text-amber-400 font-mono">CONTACTED</span>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {statusCounts.contacted}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10">
              <span className="text-[11px] text-purple-400 font-mono">QUALIFIED</span>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {statusCounts.qualified}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10">
              <span className="text-[11px] text-cyan-400 font-mono">IN PROGRESS</span>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {statusCounts.inProgress}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-emerald-500/30">
              <span className="text-[11px] text-emerald-400 font-mono">WON / CLOSED</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                {statusCounts.won}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10">
              <span className="text-[11px] text-rose-400 font-mono">LOST / DECLINED</span>
              <div className="text-xl font-bold font-mono text-rose-400 mt-1 tabular-nums">
                {statusCounts.lost}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-xl bg-[#080D1A] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#05070D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Country Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Region:</span>
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="bg-[#05070D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Regions</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client or keyword..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#05070D] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Master-Detail Enquiries View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Enquiries List */}
            <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {loadingEnquiries ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading enquiries...</div>
              ) : enquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 rounded-xl bg-[#080D1A] border border-white/10">
                  No project enquiries found matching filters.
                </div>
              ) : (
                enquiries.map((enq) => {
                  const isSelected = selectedEnquiry?.id === enq.id;
                  return (
                    <div
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950/40 border-[#38BDF8] shadow-md'
                          : 'bg-[#080D1A] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{enq.fullName}</span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                            enq.status === 'New'
                              ? 'bg-blue-500/20 text-[#38BDF8]'
                              : enq.status === 'Won'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : enq.status === 'Lost'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {enq.businessName ? `${enq.businessName} · ` : ''}
                        {enq.country}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                        <span>{enq.websiteType}</span>
                        <span className="font-mono text-slate-400">{enq.projectBudget}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Selected Enquiry Detail View */}
            <div className="lg:col-span-7">
              {selectedEnquiry ? (
                <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 space-y-6">
                  {/* Lead Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedEnquiry.fullName}</h2>
                      <p className="text-xs text-slate-400">
                        Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString()} · ID: {selectedEnquiry.id}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedEnquiry.status}
                        onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                        className="bg-[#05070D] border border-white/20 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Qualified">Status: Qualified</option>
                        <option value="In Progress">Status: In Progress</option>
                        <option value="Won">Status: Won</option>
                        <option value="Lost">Status: Lost</option>
                      </select>

                      <button
                        onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <a
                      href={`mailto:${selectedEnquiry.email}?subject=Abidi%20Web%20Studio%20-%20Project%20Consultation`}
                      className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email ({selectedEnquiry.email})</span>
                    </a>

                    {selectedEnquiry.whatsappNumber && (
                      <a
                        href={`https://wa.me/${selectedEnquiry.whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Client</span>
                      </a>
                    )}
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs bg-black/40 p-4 rounded-xl border border-white/5">
                    <div>
                      <span className="text-slate-500 block">Website Type</span>
                      <span className="font-semibold text-white">{selectedEnquiry.websiteType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Target Budget</span>
                      <span className="font-semibold text-emerald-400 font-mono">
                        {selectedEnquiry.projectBudget}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Target Industry</span>
                      <span className="font-semibold text-white">{selectedEnquiry.industry}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Desired Completion</span>
                      <span className="font-semibold text-white">{selectedEnquiry.desiredCompletionDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Preferred Contact</span>
                      <span className="font-semibold text-white capitalize">
                        {selectedEnquiry.preferredContact}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Existing Website</span>
                      <span className="text-slate-300 truncate block">
                        {selectedEnquiry.existingWebsiteUrl || 'None specified'}
                      </span>
                    </div>
                  </div>

                  {/* Selected Services Tags */}
                  {selectedEnquiry.requiredServices && selectedEnquiry.requiredServices.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      <span className="text-slate-400 block font-semibold">Selected Scope Inclusions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedEnquiry.requiredServices.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description Box */}
                  <div className="space-y-1.5 text-xs">
                    <span className="text-slate-400 block font-semibold">Client Project Description:</span>
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {selectedEnquiry.projectDescription}
                    </div>
                  </div>

                  {/* Internal Notes Thread */}
                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                    <span className="text-slate-300 font-bold uppercase tracking-wider block">
                      Internal Founder Notes & History
                    </span>

                    <div className="space-y-2">
                      {(selectedEnquiry.internalNotes || []).map((n: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-black/40 border border-white/5 text-slate-300 space-y-1"
                        >
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {new Date(n.timestamp).toLocaleString()}
                          </span>
                          <p>{n.note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add internal note on quotation, call summary, or progress..."
                        className="flex-1 px-3 py-2 bg-[#05070D] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddNote(selectedEnquiry.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#080D1A] border border-white/10 text-slate-500 text-xs">
                  Select a project enquiry from the left list to view detailed specifications and manage client status.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-6">
            <h2 className="text-base font-bold text-white">System Architecture & Deployment Health</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-semibold text-white block">Lead Persistence Layer:</span>
                <p className="text-slate-400">
                  Enquiries are stored with atomic file locking at <code className="font-mono text-[#38BDF8]">/data/enquiries.json</code> on the Node server. Backups can be exported directly via the CSV/JSON buttons anytime.
                </p>
                <div className="pt-2 text-emerald-400 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Persistent JSON Store Active</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-semibold text-white block">Server-Side SMTP Lead Dispatch:</span>
                <p className="text-slate-400">
                  {smtpStatus
                    ? 'SMTP credentials detected in environment variables. Email notifications dispatched automatically to syedhadiabidi426@gmail.com.'
                    : 'SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not currently set in environment variables. All inquiries are securely stored in the database with audit timestamps and accessible in this console.'}
                </p>
                <div className={`pt-2 flex items-center gap-1.5 font-mono ${smtpStatus ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {smtpStatus ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{smtpStatus ? 'SMTP Transporter Ready' : 'Database Storage Mode Active'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-2 text-xs">
              <span className="font-semibold text-white block">Configuring Production SMTP Delivery:</span>
              <p className="text-slate-300 leading-relaxed">
                To connect real email dispatch, populate <code className="font-mono text-[#38BDF8]">SMTP_HOST</code>, <code className="font-mono text-[#38BDF8]">SMTP_USER</code>, and <code className="font-mono text-[#38BDF8]">SMTP_PASS</code> in your hosting provider environment settings. The server will automatically dispatch lead alerts to <code className="font-mono text-[#38BDF8]">syedhadiabidi426@gmail.com</code> while preserving backup records in the database.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
