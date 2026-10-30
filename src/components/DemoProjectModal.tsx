import React, { useState } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Calendar, Clock, DollarSign, Building, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { DemoProject } from '../types';

interface DemoProjectModalProps {
  project: DemoProject | null;
  onClose: () => void;
  onStartProject: (serviceType?: string) => void;
}

export const DemoProjectModal: React.FC<DemoProjectModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080D1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#05070D]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
              DEMO PROJECT
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close demo preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Project Overview Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#05070D] p-5 rounded-xl border border-white/5">
            <div>
              <div className="text-xs text-[#38BDF8] font-mono mb-1">{project.category}</div>
              <p className="text-sm text-slate-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  onClose();
                  onStartProject(project.title);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2563EB] hover:bg-blue-600 rounded-lg transition-colors"
              >
                <span>Build Similar Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-video">
              <img
                src={project.imagePath}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Interactive Simulation Area */}
          <div className="border border-white/10 rounded-xl bg-[#0B1222] p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span className="font-semibold text-slate-200">Interactive Feature Demonstration</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Simulated Frontend Architecture</span>
            </div>

            {project.demoType === 'ecommerce' && <EcommerceInteractiveDemo />}
            {project.demoType === 'realestate' && <RealEstateInteractiveDemo />}
            {project.demoType === 'saas' && <SaaSInteractiveDemo />}
            {project.demoType === 'booking' && <BookingInteractiveDemo />}
            {project.demoType === 'business' && <BusinessInteractiveDemo />}
          </div>
        </div>
      </div>
    </div>
  );
};

// 1. Fashion Storefront Simulation
function EcommerceInteractiveDemo() {
  const [filter, setFilter] = useState<'All' | 'Womenswear' | 'Menswear' | 'Accessories'>('All');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([
    { id: '1', name: 'The Luna Silk Blouse', price: 1250, qty: 1 },
  ]);

  const items = [
    { id: '1', name: 'The Luna Silk Blouse', cat: 'Womenswear', price: 1250, size: '36 - 44' },
    { id: '2', name: 'The Atlas Wool Trench', cat: 'Menswear', price: 4800, size: '48 - 56' },
    { id: '3', name: 'The Orion Column Gown', cat: 'Womenswear', price: 3100, size: '34 - 42' },
    { id: '4', name: 'The Eos Tailored Jacket', cat: 'Accessories', price: 2950, size: 'One Size' },
  ];

  const filtered = filter === 'All' ? items : items.filter((i) => i.cat === filter);

  const addToCart = (item: (typeof items)[0]) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <div className="space-y-4">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/5">
          {(['All', 'Womenswear', 'Menswear', 'Accessories'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === cat ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag: {cart.reduce((a, c) => a + c.qty, 0)} items (${cartTotal.toLocaleString()})</span>
        </div>
      </div>

      {/* Grid of demo products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-white">{item.name}</div>
              <div className="text-[11px] text-slate-400">
                {item.cat} · <span className="font-mono text-slate-200">${item.price}</span>
              </div>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="px-2.5 py-1 text-[11px] font-medium bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
            >
              Add to Bag
            </button>
          </div>
        ))}
      </div>

      {/* Live Bag Drawer Preview */}
      <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
          Active Shopping Bag State
        </span>
        {cart.length === 0 ? (
          <p className="text-slate-500">Your bag is empty. Click any item above to test adding.</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-slate-300">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400">
                    ${(item.price * item.qty).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 bg-white/5 rounded px-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="text-slate-400 hover:text-white px-1"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-white px-1">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="text-slate-400 hover:text-white px-1"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white">
              <span>Subtotal</span>
              <span className="font-mono text-emerald-400">${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Real Estate Simulation
function RealEstateInteractiveDemo() {
  const [selectedLoc, setSelectedLoc] = useState<string>('All');
  const [minBeds, setMinBeds] = useState<number>(0);

  const villas = [
    { name: 'Villa Amanpuri', loc: 'Mykonos', beds: 5, price: '$14.5M', area: '9,200 sqft' },
    { name: 'Sunset Ridge Sanctuary', loc: 'Ibiza', beds: 6, price: '$21.0M', area: '11,500 sqft' },
    { name: 'Azure Cliff Haven', loc: 'Bali', beds: 4, price: '$8.2M', area: '7,400 sqft' },
    { name: 'Camps Bay Pavilion', loc: 'Cape Town', beds: 7, price: '$18.9M', area: '13,100 sqft' },
  ];

  const filtered = villas.filter((v) => {
    const locMatch = selectedLoc === 'All' || v.loc === selectedLoc;
    const bedMatch = v.beds >= minBeds;
    return locMatch && bedMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
          <span className="text-slate-400 px-2">Location:</span>
          {['All', 'Mykonos', 'Ibiza', 'Bali', 'Cape Town'].map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLoc(loc)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedLoc === loc ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
          <span className="text-slate-400 px-2">Bedrooms:</span>
          {[0, 5, 6].map((b) => (
            <button
              key={b}
              onClick={() => setMinBeds(b)}
              className={`px-2.5 py-1 rounded transition-colors ${
                minBeds === b ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {b === 0 ? 'Any' : `${b}+ Beds`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((v) => (
          <div key={v.name} className="p-3 rounded-lg bg-black/30 border border-white/5">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-xs font-bold text-white">{v.name}</h4>
              <span className="font-mono text-xs font-semibold text-emerald-400">{v.price}</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span>{v.loc}</span>
              <span>·</span>
              <span>{v.beds} Bedrooms</span>
              <span>·</span>
              <span>{v.area}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. SaaS Dashboard Simulation
function SaaSInteractiveDemo() {
  const [period, setPeriod] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q3');

  const dataMap = {
    Q1: { revenue: '$2,840,100', profit: '$710,500', margin: '25.0%', activeUsers: '14,200' },
    Q2: { revenue: '$3,120,400', profit: '$815,200', margin: '26.1%', activeUsers: '16,800' },
    Q3: { revenue: '$3,450,910', profit: '$895,432', margin: '25.9%', activeUsers: '18,450' },
    Q4: { revenue: '$4,105,000', profit: '$1,080,000', margin: '26.3%', activeUsers: '21,300' },
  };

  const cur = dataMap[period];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">Executive Revenue Analytics</span>
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
          {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setPeriod(q)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                period === q ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[11px] text-slate-400">Total Revenue</div>
          <div className="text-base font-bold font-mono text-white tabular-nums">{cur.revenue}</div>
          <div className="text-[10px] text-emerald-400 mt-1">+12.5% vs Prior Q</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[11px] text-slate-400">Net Profit</div>
          <div className="text-base font-bold font-mono text-white tabular-nums">{cur.profit}</div>
          <div className="text-[10px] text-emerald-400 mt-1">+8.1% vs Prior Q</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[11px] text-slate-400">Operating Margin</div>
          <div className="text-base font-bold font-mono text-white tabular-nums">{cur.margin}</div>
          <div className="text-[10px] text-slate-400 mt-1">Healthy Range</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[11px] text-slate-400">Active Licenses</div>
          <div className="text-base font-bold font-mono text-white tabular-nums">{cur.activeUsers}</div>
          <div className="text-[10px] text-emerald-400 mt-1">+9.4% MoM</div>
        </div>
      </div>
    </div>
  );
}

// 4. Booking Simulation
function BookingInteractiveDemo() {
  const [selectedService, setSelectedService] = useState('Aromatherapy Massage');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [confirmed, setConfirmed] = useState(false);

  const services = [
    { name: 'Aromatherapy Massage', dur: '60 min', price: '$140' },
    { name: 'Radiance Glow Facial', dur: '75 min', price: '$165' },
    { name: 'Holistic Acupuncture', dur: '45 min', price: '$110' },
  ];

  const slots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  return (
    <div className="space-y-4">
      {confirmed ? (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">Demo Appointment Reserved!</h4>
          <p className="text-xs text-slate-300">
            {selectedService} scheduled for tomorrow at {selectedSlot}.
          </p>
          <button
            onClick={() => setConfirmed(false)}
            className="text-xs text-[#38BDF8] underline pt-2 cursor-pointer"
          >
            Reset Demo Booking Flow
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-300">1. Select Service:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {services.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedService(s.name)}
                className={`p-2.5 rounded-lg text-left transition-colors border ${
                  selectedService === s.name
                    ? 'bg-[#2563EB]/20 border-[#38BDF8] text-white'
                    : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-medium">{s.name}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {s.dur} · {s.price}
                </div>
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-300 pt-1">2. Choose Time Slot:</div>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  selectedSlot === slot
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={() => setConfirmed(true)}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors mt-2"
          >
            Confirm Reservation: {selectedService} ({selectedSlot})
          </button>
        </div>
      )}
    </div>
  );
}

// 5. Business Advisory Simulation
function BusinessInteractiveDemo() {
  const [activeTab, setActiveTab] = useState<'Governance' | 'Capital' | 'Operations'>('Governance');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-white/10 pb-2">
        {(['Governance', 'Capital', 'Operations'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === tab ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab} Advisory
          </button>
        ))}
      </div>

      <div className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
        {activeTab === 'Governance' && (
          <p>
            Board fiduciary oversight, shareholder covenant restructuring, and executive compliance frameworks for multinational subsidiaries in common law and civil jurisdictions.
          </p>
        )}
        {activeTab === 'Capital' && (
          <p>
            Syndicated debt structuring, mezzanine debt advisory, liquidity management, and cross-border balance sheet optimization for high-growth enterprises.
          </p>
        )}
        {activeTab === 'Operations' && (
          <p>
            Global supply chain resilience audits, vendor governance realignment, and operational margin expansion for mid-market manufacturing conglomerates.
          </p>
        )}
      </div>
    </div>
  );
}
