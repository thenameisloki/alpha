import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, MapPin, Star } from 'lucide-react';
import { useRouter } from '@/router';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import type { Category } from '@/data/types';

export function BrowsePage({ initialCategory, initialQuery }: { initialCategory?: string; initialQuery?: string }) {
  const { navigate } = useRouter();
  const [search, setSearch] = useState(initialQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating' | 'distance'>('recommended');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.pricePerDay <= maxPrice);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case 'price-high': result.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'distance': result.sort((a, b) => a.distanceKm - b.distanceKm); break;
    }
    return result;
  }, [search, selectedCategory, sortBy, maxPrice]);

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900 mb-2">
          {selectedCategory ? selectedCategory : 'Browse Products'}
        </h1>
        <p className="text-navy-500">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available to borrow near you
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, categories, or locations..."
          className="w-full rounded-2xl bg-white pl-12 pr-4 py-3.5 text-sm shadow-soft ring-1 ring-navy-900/5 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            !selectedCategory ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 ring-1 ring-navy-900/10 hover:ring-emerald-500/30'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              selectedCategory === cat.name ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 ring-1 ring-navy-900/10 hover:ring-emerald-500/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/30 lg:bg-transparent lg:relative lg:inset-auto' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
          <div className={`${showFilters ? 'fixed bottom-0 left-0 right-0 top-16 lg:static rounded-t-3xl lg:rounded-3xl bg-white p-6 overflow-auto' : ''} lg:sticky lg:top-20`}>
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-bold text-navy-900">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="hidden lg:block mb-6">
              <h3 className="font-bold text-navy-900 mb-4">Sort by</h3>
              <div className="space-y-2">
                {([
                  ['recommended', 'Recommended'],
                  ['price-low', 'Price: Low to High'],
                  ['price-high', 'Price: High to Low'],
                  ['rating', 'Highest Rated'],
                  ['distance', 'Nearest First'],
                ] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSortBy(val)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                      sortBy === val ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-navy-500 hover:bg-navy-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-navy-900 mb-4">Max daily price</h3>
              <input
                type="range"
                min={100}
                max={2000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-navy-400 mt-1">
                <span>₹100</span>
                <span className="font-semibold text-navy-700">₹{maxPrice}/day</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-navy-900 mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                    className={`flex items-center justify-between w-full text-sm px-3 py-2 rounded-xl transition-colors ${
                      selectedCategory === cat.name ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-navy-500 hover:bg-navy-50'
                    }`}
                  >
                    {cat.name}
                    <span className="text-xs text-navy-300">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setShowFilters(false)} className="btn-emerald w-full lg:hidden">
              Show {filtered.length} results
            </button>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="hidden lg:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-navy-700 ring-1 ring-navy-900/10 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
              </select>
            </div>
            <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 ring-1 ring-navy-900/10 lg:hidden">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-3xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-navy-300" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">No products found</h3>
              <p className="text-sm text-navy-500 mb-4">Try adjusting your search or filters.</p>
              <button onClick={() => { setSearch(''); setSelectedCategory(null); setMaxPrice(2000); }} className="btn-secondary">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
