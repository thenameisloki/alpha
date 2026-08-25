import {
  Search, Calendar, Sparkles, ShoppingBag, ArrowRight,
  Recycle, Wallet, Users, ShieldCheck, TrendingUp,
} from 'lucide-react';
import { useRouter } from '@/router';
import { howItWorksSteps, tryBeforeYouBuyExamples } from '@/data/products';
import * as Icons from 'lucide-react';

export function HowItWorksPage() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container-max text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">How It Works</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 mt-2 mb-4">
            Try it. Borrow it. Love it. Then buy it.
          </h1>
          <p className="text-lg text-navy-500">
            A smarter way to shop — borrow products in real life before spending your money.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, i) => {
              const Icon = (Icons as any)[step.icon] as Icons.LucideIcon;
              return (
                <div key={step.step} className="relative">
                  <div className="card p-6 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-navy-300">{step.step}</span>
                    <h3 className="text-lg font-bold text-navy-900 mt-1 mb-2">{step.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-extrabold text-navy-900">
              Better decisions. <span className="text-emerald-500">Less waste.</span> <span className="text-accent-500">More savings.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Try Before You Buy */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Why Borrow First?</span>
            <h2 className="text-3xl font-extrabold text-navy-900 mt-2 mb-4">Why buy something you haven't tried?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tryBeforeYouBuyExamples.map((item, i) => {
              const Icon = (Icons as any)[item.icon] as Icons.LucideIcon;
              return (
                <div key={i} className="card p-6 hover:shadow-card-hover">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{item.product}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{item.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-navy-900 text-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold mb-4">The benefits of borrowing first</h2>
            <p className="text-navy-300">It's not just about saving money — it's about making better decisions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wallet, title: 'Save money', desc: 'Test before you invest. Avoid costly mistakes and buyer\'s remorse.' },
              { icon: Recycle, title: 'Reduce waste', desc: 'Fewer impulse buys means less waste and a more sustainable lifestyle.' },
              { icon: ShieldCheck, title: 'Buy with confidence', desc: 'You\'ve already tested it in your real life. No surprises after purchase.' },
              { icon: TrendingUp, title: 'Credit toward purchase', desc: 'If you love it, your borrowing cost is credited toward buying it.' },
            ].map((benefit) => (
              <div key={benefit.title} className="rounded-3xl bg-navy-800/50 p-6 border border-navy-700/50">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-navy-300 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-4xl bg-gradient-to-br from-emerald-50 to-accent-50 p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Ready to start borrowing?</h2>
            <p className="text-navy-500 mb-8 max-w-lg mx-auto">Join thousands of smart shoppers who try before they buy.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">
                Explore Products <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate({ name: 'list' })} className="btn-secondary">
                List an Item
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
