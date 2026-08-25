import { useState } from 'react';
import { Menu, X, Search, Plus, ShieldCheck, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useRouter, type Route } from '@/router';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="relative w-10 h-10 rounded-2xl bg-navy-900 flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M8 12 L8 22 Q8 26 12 26 L20 26 Q24 26 24 22 L24 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 6 L16 20 M12 16 L16 20 L20 16" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
        </svg>
      </div>
      <div className="text-left leading-tight">
        <span className="block text-base font-extrabold text-navy-900 tracking-tight">Borrow Before Buy</span>
        <span className="block text-[10px] font-medium text-navy-400 -mt-0.5">Try it before you own it</span>
      </div>
    </button>
  );
}

export function Navbar() {
  const { route, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navItems: { label: string; route: Route }[] = [
    { label: 'Browse', route: { name: 'browse' } },
    { label: 'How It Works', route: { name: 'how-it-works' } },
    { label: 'Trust & Safety', route: { name: 'trust' } },
    { label: 'Dashboard', route: { name: 'dashboard-borrower' } },
  ];

  const isActive = (r: Route) => r.name === route.name;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ name: 'browse', query: searchValue });
    setMobileOpen(false);
  };

  const go = (r: Route) => {
    navigate(r);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-navy-900/5">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Logo onClick={() => go({ name: 'home' })} />

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="What do you want to try?"
                  className="w-full rounded-full bg-white pl-11 pr-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 shadow-soft ring-1 ring-navy-900/5 transition-all focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                />
              </div>
            </form>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => go(item.route)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(item.route)
                      ? 'text-navy-900 bg-navy-900/5'
                      : 'text-navy-500 hover:text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <button onClick={() => go({ name: 'list' })} className="btn-emerald !px-4 !py-2.5">
                <Plus className="w-4 h-4" />
                List an Item
              </button>
            </div>

            <button
              className="lg:hidden p-2 rounded-xl text-navy-700 hover:bg-navy-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-navy-900/5 bg-white animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="What do you want to try?"
                    className="w-full rounded-full bg-[#F8FAFC] pl-11 pr-4 py-3 text-sm ring-1 ring-navy-900/10 focus:outline-none"
                  />
                </div>
              </form>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => go(item.route)}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50"
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => go({ name: 'list' })} className="btn-emerald w-full mt-2">
                <Plus className="w-4 h-4" />
                List an Item
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
