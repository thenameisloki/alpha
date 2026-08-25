import { useState } from 'react';
import {
  Search, ArrowRight, Sparkles, ShieldCheck, Star, TrendingUp,
  Recycle, Wallet, Users, CheckCircle2, ChevronRight,
} from 'lucide-react';
import { useRouter } from '@/router';
import { ProductCard } from '@/components/ProductCard';
import { products, categories, howItWorksSteps, tryBeforeYouBuyExamples, trustBadges } from '@/data/products';
import * as Icons from 'lucide-react';

const heroCollage = [
  'https://images.pexels.com/photos/19969445/pexels-photo-19969445.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/30413428/pexels-photo-30413428.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/2526025/pexels-photo-2526025.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/8430203/pexels-photo-8430203.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/6996340/pexels-photo-6996340.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/5555813/pexels-photo-5555813.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
];

const searchExamples = ['Camera', 'Power tools', 'Camping gear', 'Baby products', 'Electronics', 'Fitness equipment', 'Fashion', 'Home appliances'];

export function HomePage() {
  const { navigate } = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ name: 'browse', query: searchValue });
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-accent-400/5 blur-3xl" />
        </div>

        <div className="container-max relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Try it. Borrow it. Love it. Then buy it.
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Don't buy it yet.
                <br />
                <span className="text-emerald-500">Borrow it first.</span>
              </h1>

              <p className="text-lg text-navy-500 leading-relaxed mb-8 max-w-lg">
                Try products in real life before you spend your money. Borrow from people and businesses around you, discover what actually works for you, then buy with confidence.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate({ name: 'list' })} className="btn-secondary">
                  List an Item
                </button>
              </div>

              <form onSubmit={handleSearch} className="relative max-w-lg">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="What do you want to try?"
                  className="w-full rounded-2xl bg-white pl-14 pr-32 py-4 text-base text-navy-900 placeholder:text-navy-300 shadow-card ring-1 ring-navy-900/5 transition-all focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-emerald !px-5 !py-2.5">
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs text-navy-400 py-1.5">Popular:</span>
                {searchExamples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => navigate({ name: 'browse', query: ex })}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy-600 ring-1 ring-navy-900/10 hover:ring-emerald-500/30 hover:text-emerald-600 transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero collage */}
            <div className="relative hidden lg:block animate-scale-in">
              <div className="grid grid-cols-3 gap-3">
                {heroCollage.map((img, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl overflow-hidden shadow-card ${
                      i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                    } ${i === 3 ? 'mt-6' : ''} ${i === 4 ? '-mt-3' : ''} ${i === 5 ? 'mt-3' : ''}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">Less waste</p>
                  <p className="text-[10px] text-navy-400">Sustainable borrowing</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">More savings</p>
                  <p className="text-[10px] text-navy-400">Try before you buy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-navy-900/5">
            {[
              { value: '12,000+', label: 'Products listed', icon: Search },
              { value: '₹4.2Cr+', label: 'Saved by borrowers', icon: Wallet },
              { value: '85,000+', label: 'Successful borrows', icon: CheckCircle2 },
              { value: '4.9/5', label: 'Average rating', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                  <stat.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-2xl font-extrabold text-navy-900">{stat.value}</span>
                </div>
                <p className="text-sm text-navy-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2 mb-4">Borrow in 4 simple steps</h2>
            <p className="text-navy-500">From discovery to decision — a smarter way to shop.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, i) => {
              const Icon = (Icons as any)[step.icon] as Icons.LucideIcon;
              return (
                <div key={step.step} className="relative group">
                  <div className="card p-6 h-full hover:shadow-card-hover hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-bold text-navy-300">{step.step}</span>
                    <h3 className="text-lg font-bold text-navy-900 mt-1 mb-2">{step.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{step.description}</p>
                  </div>
                  {i < howItWorksSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-6 h-6 text-navy-200" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl font-bold text-navy-900">
              Better decisions. <span className="text-emerald-500">Less waste.</span> <span className="text-accent-500">More savings.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Browse by Category</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">What are you looking for?</h2>
            </div>
            <button onClick={() => navigate({ name: 'browse' })} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const Icon = (Icons as any)[cat.icon] as Icons.LucideIcon;
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate({ name: 'browse', category: cat.name })}
                  className="card group p-5 text-center hover:shadow-card-hover hover:-translate-y-1 hover:ring-2 hover:ring-emerald-500/20"
                >
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-navy-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-sm font-bold text-navy-900 mb-0.5">{cat.name}</p>
                  <p className="text-xs text-navy-400">{cat.count.toLocaleString('en-IN')} items</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Featured Listings</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">Try these this week</h2>
            </div>
            <button onClick={() => navigate({ name: 'browse' })} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              See all products <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <button onClick={() => navigate({ name: 'browse' })} className="btn-secondary">
              See all products <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Try Before You Buy Feature */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-400/10 blur-3xl" />
        </div>

        <div className="container-max relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Why Borrow First?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Why buy something you haven't tried?</h2>
            <p className="text-navy-300">Real examples of how borrowing first leads to better decisions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tryBeforeYouBuyExamples.map((item, i) => {
              const Icon = (Icons as any)[item.icon] as Icons.LucideIcon;
              return (
                <div key={i} className="rounded-3xl bg-navy-800/50 backdrop-blur-sm p-6 border border-navy-700/50 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.product}</h3>
                  <p className="text-sm text-navy-300 leading-relaxed">{item.message}</p>
                </div>
              );
            })}

            {/* CTA card */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform">
              <TrendingUp className="w-10 h-10 mb-3" />
              <h3 className="text-lg font-bold mb-2">Ready to try?</h3>
              <p className="text-sm text-emerald-50 mb-4">Browse thousands of products available to borrow near you.</p>
              <button onClick={() => navigate({ name: 'browse' })} className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors">
                Start exploring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Borrow → Decide → Buy Feature */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-4xl bg-gradient-to-br from-emerald-50 via-white to-accent-50 p-8 lg:p-12 overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge bg-emerald-500 text-white mb-4">
                  <Sparkles className="w-3 h-3" />
                  Our signature feature
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4 leading-tight">
                  Borrow → Decide → Buy
                </h2>
                <p className="text-lg text-navy-500 mb-6 leading-relaxed">
                  Borrow a product, test it in your real life, and if you love it — buy it. Your borrowing cost is credited toward the purchase price. No wasted money, no buyer's remorse.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { step: 'Borrow', desc: 'Borrow for 3 days — pay only the daily rate', icon: Search },
                    { step: 'Decide', desc: 'Test it thoroughly in your real life', icon: ShieldCheck },
                    { step: 'Buy', desc: 'Love it? Buy it — borrowing cost credited', icon: Wallet },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">{item.step}</p>
                        <p className="text-sm text-navy-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">
                  Find something to try
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <div className="rounded-3xl bg-white shadow-card-hover p-6 max-w-sm mx-auto">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-navy-50">
                    <img src={products[0].images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-bold text-navy-900 mb-1">{products[0].name}</p>
                  <p className="text-xs text-navy-400 mb-4">{products[0].category} · {products[0].location}</p>

                  <div className="rounded-2xl bg-navy-50 p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-500">Borrow for 3 days</span>
                      <span className="font-bold text-navy-900">₹{(products[0].pricePerDay * 3).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navy-500">Estimated purchase price</span>
                      <span className="font-bold text-navy-900">₹{products[0].purchasePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-navy-200 pt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-600">Your credit toward purchase</span>
                      <span className="text-sm font-extrabold text-emerald-600">₹{(products[0].pricePerDay * 3).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button className="btn-emerald w-full mt-4">
                    Love it? Buy This Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety preview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Trust & Safety</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2 mb-4">Borrow with confidence</h2>
            <p className="text-navy-500">Every transaction is protected. Every member is verified.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustBadges.slice(0, 6).map((badge) => {
              const Icon = (Icons as any)[badge.icon] as Icons.LucideIcon;
              return (
                <div key={badge.title} className="flex gap-4 p-5 rounded-2xl bg-[#F8FAFC] hover:bg-emerald-50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-1">{badge.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate({ name: 'trust' })} className="btn-secondary">
              Learn more about trust & safety
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="rounded-4xl bg-navy-900 p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-2 text-xs font-semibold text-emerald-400 mb-6">
                <Users className="w-3.5 h-3.5" />
                Join 50,000+ members
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 max-w-2xl mx-auto leading-tight">
                Start borrowing smarter today
              </h2>
              <p className="text-navy-300 text-lg mb-8 max-w-xl mx-auto">
                Save money, reduce waste, and make better buying decisions. Your next purchase should be one you've tested first.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate({ name: 'list' })} className="rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all">
                  List an Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
