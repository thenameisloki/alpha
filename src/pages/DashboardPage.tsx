import { useState } from 'react';
import {
  Package, Calendar, Clock, Star, Heart, CreditCard, MessageCircle,
  TrendingUp, Wallet, CheckCircle2, ArrowRight, ShoppingBag, Plus,
  BarChart3, Users, Bell,
} from 'lucide-react';
import { useRouter } from '@/router';
import { products } from '@/data/products';

type Tab = 'borrower' | 'lender';

export function DashboardPage({ initialTab = 'borrower' }: { initialTab?: Tab }) {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-navy-900">My Dashboard</h1>
          <p className="text-navy-500 mt-1">Welcome back, Arjun!</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error-500" />
          </button>
          <button onClick={() => navigate({ name: 'list' })} className="btn-emerald !py-2.5">
            <Plus className="w-4 h-4" />
            List an Item
          </button>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 p-1 rounded-2xl bg-navy-50 mb-8 max-w-md">
        <button
          onClick={() => setTab('borrower')}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
            tab === 'borrower' ? 'bg-white text-navy-900 shadow-soft' : 'text-navy-400'
          }`}
        >
          Borrower View
        </button>
        <button
          onClick={() => setTab('lender')}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
            tab === 'lender' ? 'bg-white text-navy-900 shadow-soft' : 'text-navy-400'
          }`}
        >
          Lender View
        </button>
      </div>

      {tab === 'borrower' ? <BorrowerDashboard /> : <LenderDashboard />}
    </div>
  );
}

function BorrowerDashboard() {
  const { navigate } = useRouter();
  const activeBorrows = products.slice(0, 2);
  const upcomingReservations = products.slice(2, 4);
  const savedProducts = products.slice(4, 8);

  const stats = [
    { label: 'Active Borrows', value: '2', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Upcoming', value: '2', icon: Calendar, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Saved', value: '8', icon: Heart, color: 'text-error-500', bg: 'bg-error-50' },
    { label: 'Total Saved', value: '₹38,500', icon: Wallet, color: 'text-navy-600', bg: 'bg-navy-50' },
  ];

  const navItems = [
    { label: 'Active Borrows', icon: Package, active: true },
    { label: 'Upcoming', icon: Calendar },
    { label: 'Past Borrows', icon: Clock },
    { label: 'Saved', icon: Heart },
    { label: 'Reviews', icon: Star },
    { label: 'Buy Opportunities', icon: ShoppingBag },
    { label: 'Messages', icon: MessageCircle },
    { label: 'Payment History', icon: CreditCard },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="card p-4 lg:sticky lg:top-20">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  item.active ? 'bg-emerald-50 text-emerald-700' : 'text-navy-500 hover:bg-navy-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-navy-900">{stat.value}</p>
              <p className="text-xs text-navy-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Borrows */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-900">Active Borrows</h2>
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View all</button>
          </div>
          <div className="space-y-4">
            {activeBorrows.map((product) => (
              <div key={product.id} className="card p-4 flex gap-4 items-center">
                <img src={product.images[0]} alt="" className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy-900 truncate">{product.name}</h3>
                  <p className="text-xs text-navy-400 mb-2">{product.lender.name} · {product.location}</p>
                  <div className="flex items-center gap-2">
                    <span className="badge bg-emerald-100 text-emerald-700">
                      <Clock className="w-3 h-3" />
                      Returns in 2 days
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-navy-900">₹{product.pricePerDay.toLocaleString('en-IN')}/day</p>
                  <button onClick={() => navigate({ name: 'product', id: product.id })} className="text-xs font-semibold text-emerald-600 mt-1">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buy Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-900">Purchase Opportunities</h2>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-accent-50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-navy-900">Loved what you borrowed?</h3>
            </div>
            <p className="text-sm text-navy-500 mb-4">You have 2 products you can buy with your borrowing cost credited toward purchase.</p>
            <div className="space-y-3">
              {activeBorrows.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                  <img src={product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-navy-400">Buy price: ₹{product.purchasePrice.toLocaleString('en-IN')} · Credit: ₹{(product.pricePerDay * 3).toLocaleString('en-IN')}</p>
                  </div>
                  <button className="btn-emerald !px-4 !py-2 text-xs">Buy</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-900">Saved Products</h2>
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View all</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {savedProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden cursor-pointer group" onClick={() => navigate({ name: 'product', id: product.id })}>
                <div className="aspect-square overflow-hidden">
                  <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-navy-900 truncate">{product.name}</p>
                  <p className="text-xs text-navy-400">₹{product.pricePerDay}/day</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LenderDashboard() {
  const { navigate } = useRouter();
  const myListings = products.slice(0, 4);

  const stats = [
    { label: 'Total Earnings', value: '₹52,400', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Bookings', value: '3', icon: Calendar, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Listed Items', value: '8', icon: Package, color: 'text-navy-600', bg: 'bg-navy-50' },
    { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-accent-600', bg: 'bg-accent-50' },
  ];

  const navItems = [
    { label: 'Listed Products', icon: Package, active: true },
    { label: 'Current Bookings', icon: Calendar },
    { label: 'Earnings', icon: Wallet },
    { label: 'Calendar', icon: Calendar },
    { label: 'Borrower Requests', icon: Users },
    { label: 'Reviews', icon: Star },
    { label: 'Messages', icon: MessageCircle },
    { label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="card p-4 lg:sticky lg:top-20">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  item.active ? 'bg-emerald-50 text-emerald-700' : 'text-navy-500 hover:bg-navy-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-navy-900">{stat.value}</p>
              <p className="text-xs text-navy-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Earnings chart placeholder */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Earnings Overview</h2>
              <p className="text-sm text-navy-400">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-emerald-600">+24%</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {[
              { month: 'Mar', value: 45 },
              { month: 'Apr', value: 62 },
              { month: 'May', value: 55 },
              { month: 'Jun', value: 78 },
              { month: 'Jul', value: 85 },
              { month: 'Aug', value: 95 },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all hover:from-emerald-600 hover:to-emerald-500" style={{ height: `${bar.value}%` }} />
                <span className="text-xs text-navy-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* My Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-900">My Listings</h2>
            <button onClick={() => navigate({ name: 'list' })} className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              <Plus className="w-4 h-4" />
              Add new
            </button>
          </div>
          <div className="space-y-4">
            {myListings.map((product) => (
              <div key={product.id} className="card p-4 flex gap-4 items-center">
                <img src={product.images[0]} alt="" className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy-900 truncate">{product.name}</h3>
                  <p className="text-xs text-navy-400 mb-2">{product.category} · {product.location}</p>
                  <div className="flex items-center gap-2">
                    <span className="badge bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {product.availability}
                    </span>
                    <span className="text-xs text-navy-400">{product.successfulBorrows} borrows</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-navy-900">₹{product.pricePerDay.toLocaleString('en-IN')}/day</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">₹{(product.pricePerDay * product.successfulBorrows * 0.3).toLocaleString('en-IN', { maximumFractionDigits: 0 })} earned</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Borrower Requests */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 mb-4">Pending Borrower Requests</h2>
          <div className="space-y-3">
            {[
              { name: 'Priya S.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80', product: products[0].name, days: 3, date: 'Aug 28-30' },
              { name: 'Rohan K.', avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=80&h=80', product: products[1].name, days: 5, date: 'Sep 2-7' },
            ].map((req, i) => (
              <div key={i} className="card p-4 flex items-center gap-4">
                <img src={req.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-navy-900 text-sm">{req.name}</p>
                  <p className="text-xs text-navy-400">{req.product} · {req.days} days · {req.date}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="rounded-xl bg-navy-50 px-3 py-2 text-xs font-semibold text-navy-600 hover:bg-navy-100">Decline</button>
                  <button className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600">Accept</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
