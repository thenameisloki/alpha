import { Logo } from './Navbar';
import { useRouter, type Route } from '@/router';
import { Mail, MapPin, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export function Footer() {
  const { navigate } = useRouter();

  const linkGroups: { title: string; links: { label: string; route: Route }[] }[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Browse Products', route: { name: 'browse' } },
        { label: 'How It Works', route: { name: 'how-it-works' } },
        { label: 'List an Item', route: { name: 'list' } },
        { label: 'Trust & Safety', route: { name: 'trust' } },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Borrower Dashboard', route: { name: 'dashboard-borrower' } },
        { label: 'Lender Dashboard', route: { name: 'dashboard-lender' } },
        { label: 'My Reservations', route: { name: 'dashboard-borrower' } },
        { label: 'Messages', route: { name: 'dashboard-borrower' } },
      ],
    },
  ];

  return (
    <footer className="bg-navy-900 text-navy-100 mt-20">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo onClick={() => navigate({ name: 'home' })} />
            </div>
            <p className="text-sm text-navy-300 leading-relaxed max-w-xs">
              Try products in real life before you spend your money. Borrow from people and businesses around you, discover what works, then buy with confidence.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-emerald-500 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-white mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.route)}
                      className="text-sm text-navy-300 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Stay in the loop</h4>
            <p className="text-sm text-navy-300 mb-4">Get tips, new listings, and community stories.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-xl bg-navy-800 px-4 py-2.5 text-sm text-white placeholder:text-navy-400 ring-1 ring-navy-700 focus:ring-emerald-500 focus:outline-none"
              />
              <button className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center gap-4 mt-6 text-xs text-navy-400">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> hello@borrowbeforebuy.com</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-navy-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Available across India</span>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">© 2026 Borrow Before Buy. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-navy-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Community Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
