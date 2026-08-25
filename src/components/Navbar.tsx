import { useState } from 'react';
import { Menu, X, Search, Plus, Heart, MessageCircle, User, ShoppingCart } from 'lucide-react';
import { useRouter, type Route } from '@/router';
import { useCartWishlist } from '@/lib/cart';

export function Logo({ onClick, variant = 'dark' }: { onClick?: () => void; variant?: 'dark' | 'light' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-white';
  const subColor = variant === 'light' ? 'text-emerald-300' : 'text-navy-300';
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-sky-400 flex items-center justify-center shadow-soft transition-transform group-hover:scale-105 group-hover:rotate-3">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M8 12 L8 22 Q8 26 12 26 L20 26 Q24 26 24 22 L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 6 L16 20 M12 16 L16 20 L20 16" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
        </svg>
      </div>
      <div className="text-left leading-tight">
        <span className={`block text-lg font-display font-extrabold ${textColor} tracking-tight`}>Lendora</span>
        <span className={`block text-[10px] font-medium ${subColor} -mt-0.5`}>Try it before you own it</span>
      </div>
    </button>
  );
}

export function Navbar() {
  const { route, navigate } = useRouter();
  const { cartCount, wishlist } = useCartWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-navy-800">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo onClick={() => go({ name: 'home' })} />

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="What do you want to try?"
                className="w-full rounded-full bg-navy-800 pl-11 pr-4 py-2.5 text-sm text-navy-50 placeholder:text-navy-400 ring-1 ring-navy-700 transition-all focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
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
                    ? 'text-white bg-navy-800'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => go({ name: 'messages' })} className="btn-ghost relative !px-2.5">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500" />
            </button>
            <button onClick={() => go({ name: 'wishlist' })} className="btn-ghost relative !px-2.5">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => go({ name: 'cart' })} className="btn-ghost relative !px-2.5">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => go({ name: 'list' })} className="btn-emerald !px-4 !py-2.5">
              <Plus className="w-4 h-4" />
              List an Item
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white text-sm font-bold shadow-soft"
              >
                A
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl bg-navy-900 shadow-card-hover ring-1 ring-navy-700 p-2 animate-scale-in">
                  <div className="px-3 py-2 border-b border-navy-800 mb-1">
                    <p className="text-sm font-bold text-white">Arjun Mehta</p>
                    <p className="text-xs text-navy-400">arjun@example.com</p>
                  </div>
                  {[
                    { label: 'Borrower Dashboard', route: { name: 'dashboard-borrower' } as Route },
                    { label: 'Lender Dashboard', route: { name: 'dashboard-lender' } as Route },
                    { label: 'My Wishlist', route: { name: 'wishlist' } as Route },
                    { label: 'My Cart', route: { name: 'cart' } as Route },
                    { label: 'Messages', route: { name: 'messages' } as Route },
                    { label: 'Sign In / Sign Up', route: { name: 'auth' } as Route },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => go(item.route)}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-navy-300 hover:bg-navy-800 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="lg:hidden p-2 rounded-xl text-navy-200 hover:bg-navy-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-800 bg-navy-950 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="What do you want to try?"
                  className="w-full rounded-full bg-navy-800 pl-11 pr-4 py-3 text-sm text-navy-50 placeholder:text-navy-400 ring-1 ring-navy-700 focus:outline-none"
                />
              </div>
            </form>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.route)}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-200 hover:bg-navy-800"
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => go({ name: 'wishlist' })} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-200 hover:bg-navy-800">
              <Heart className="w-4 h-4" />
              My Wishlist
            </button>
            <button onClick={() => go({ name: 'cart' })} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-200 hover:bg-navy-800">
              <ShoppingCart className="w-4 h-4" />
              My Cart {cartCount > 0 && `(${cartCount})`}
            </button>
            <button onClick={() => go({ name: 'messages' })} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-200 hover:bg-navy-800">
              <MessageCircle className="w-4 h-4" />
              Messages
            </button>
            <button onClick={() => go({ name: 'auth' })} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-navy-200 hover:bg-navy-800">
              <User className="w-4 h-4" />
              Sign In / Sign Up
            </button>
            <button onClick={() => go({ name: 'list' })} className="btn-emerald w-full mt-2">
              <Plus className="w-4 h-4" />
              List an Item
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
