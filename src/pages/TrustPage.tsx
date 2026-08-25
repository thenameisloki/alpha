import {
  ShieldCheck, BadgeCheck, Star, CreditCard, Lock, ShieldPlus,
  History, BookOpen, Flag, ArrowRight, CheckCircle2, Users,
} from 'lucide-react';
import { useRouter } from '@/router';
import { trustBadges } from '@/data/products';
import * as Icons from 'lucide-react';

export function TrustPage() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container-max text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Trust & Safety</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 mt-2 mb-4">
            Trust is everything
          </h1>
          <p className="text-lg text-navy-500">
            Every transaction is protected. Every member is verified. Every borrow is backed by our safety guarantee.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustBadges.map((badge) => {
              const Icon = (Icons as any)[badge.icon] as Icons.LucideIcon;
              return (
                <div key={badge.title} className="card p-6 hover:shadow-card-hover">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{badge.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verification process */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-4xl bg-navy-900 p-8 lg:p-12 text-white">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold mb-4">Our verification process</h2>
              <p className="text-navy-300">Multiple layers of verification keep the community safe.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'ID Verification', desc: 'Government ID verified at signup.' },
                { step: '02', title: 'Phone & Email', desc: 'Verified contact details for every member.' },
                { step: '03', title: 'Profile Review', desc: 'Profiles reviewed before listings go live.' },
                { step: '04', title: 'Ongoing Monitoring', desc: 'Activity monitored for suspicious behavior.' },
              ].map((item) => (
                <div key={item.step} className="rounded-3xl bg-navy-800/50 p-6 border border-navy-700/50">
                  <span className="text-3xl font-extrabold text-emerald-400/30">{item.step}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-navy-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges showcase */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Look for these badges</h2>
            <p className="text-navy-500">Badges help you identify trusted members and listings at a glance.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BadgeCheck, title: 'Verified User', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Identity verified' },
              { icon: Star, title: 'Top Lender', color: 'text-accent-600', bg: 'bg-accent-50', desc: '50+ successful borrows' },
              { icon: ShieldCheck, title: 'Damage Protected', color: 'text-navy-600', bg: 'bg-navy-50', desc: 'Deposit secured' },
              { icon: Users, title: 'Community Member', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Active for 3+ months' },
            ].map((badge) => (
              <div key={badge.title} className="card p-6 text-center hover:shadow-card-hover">
                <div className={`w-14 h-14 rounded-2xl ${badge.bg} flex items-center justify-center mx-auto mb-3`}>
                  <badge.icon className={`w-7 h-7 ${badge.color}`} />
                </div>
                <p className="font-bold text-navy-900">{badge.title}</p>
                <p className="text-xs text-navy-400 mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community guidelines */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Community Guidelines</span>
              <h2 className="text-3xl font-extrabold text-navy-900 mt-2 mb-6">Rules that keep everyone safe</h2>
              <div className="space-y-4">
                {[
                  'Be honest about product condition and specifications',
                  'Communicate clearly and respond within 24 hours',
                  'Treat borrowed items with respect and care',
                  'Return items on time and in the agreed condition',
                  'Report any issues or damage immediately',
                  'Leave honest reviews after every transaction',
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-navy-600">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl bg-gradient-to-br from-emerald-50 to-accent-50 p-8">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-4">
                <Flag className="w-7 h-7 text-error-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Report an issue</h3>
              <p className="text-sm text-navy-500 mb-6">
                See something suspicious or experience a problem? Our support team reviews every report within 24 hours.
              </p>
              <button className="btn-primary">
                Report an Issue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="rounded-4xl bg-navy-900 p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Borrow with complete peace of mind</h2>
            <p className="text-navy-300 mb-8 max-w-lg mx-auto">Every borrow is protected. Every lender is verified. Every transaction is secure.</p>
            <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">
              Start Borrowing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
