import { Star, MapPin, CheckCircle2, Clock, Shield, Eye, TrendingUp, Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/types';
import { useRouter } from '@/router';
import { useCartWishlist } from '@/lib/cart';
import { useState } from 'react';

export function ProductCard({ product }: { product: Product }) {
  const { navigate } = useRouter();
  const { toggleWishlist, isInWishlist, addToCart } = useCartWishlist();
  const [added, setAdded] = useState(false);

  const availabilityColor: Record<string, string> = {
    'Available today': 'bg-emerald-500/15 text-emerald-300',
    'Available this week': 'bg-accent-500/15 text-accent-300',
    'Booked': 'bg-error-500/15 text-error-400',
    'Limited slots': 'bg-warning-500/15 text-warning-300',
  };

  const categoryColors: Record<string, string> = {
    'Electronics': 'text-sky-300 bg-sky-500/10',
    'Cameras': 'text-violet-300 bg-violet-500/10',
    'Tools': 'text-accent-300 bg-accent-500/10',
    'Fitness': 'text-error-300 bg-error-500/10',
    'Outdoor & Camping': 'text-emerald-300 bg-emerald-500/10',
    'Baby & Kids': 'text-rose-300 bg-rose-500/10',
    'Fashion': 'text-violet-300 bg-violet-500/10',
    'Home & Kitchen': 'text-accent-300 bg-accent-500/10',
    'Beauty': 'text-teal-300 bg-teal-500/10',
    'Hobbies': 'text-teal-300 bg-teal-500/10',
    'Vehicles': 'text-sky-300 bg-sky-500/10',
    'Party & Events': 'text-coral-300 bg-coral-500/10',
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigate({ name: 'product', id: product.id })}
      className="card group cursor-pointer overflow-hidden card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${availabilityColor[product.availability]} backdrop-blur-sm`}>
            <Clock className="w-3 h-3" />
            {product.availability}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {product.buyAfterBorrowing && (
            <span className="badge bg-navy-950/80 text-white backdrop-blur-sm">
              <Shield className="w-3 h-3 text-emerald-400" />
              Buy after
            </span>
          )}
          <button
            onClick={handleWishlist}
            className="w-8 h-8 rounded-xl bg-navy-950/80 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-navy-300 hover:text-rose-400'}`} />
          </button>
        </div>

        {product.views && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="badge bg-navy-950/80 text-navy-200 backdrop-blur-sm">
              <Eye className="w-3 h-3" />
              {product.views.toLocaleString('en-IN')} views
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md ${categoryColors[product.category] || 'text-navy-300 bg-navy-800'}`}>
            {product.category}
          </span>
          <span className="text-xs text-navy-400">{product.condition}</span>
        </div>

        <h3 className="text-base font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-3 text-xs text-navy-400">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
            <span className="font-semibold text-navy-200">{product.rating}</span>
            <span>({product.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {product.distanceKm} km
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4 text-xs text-navy-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{product.successfulBorrows} successful borrows</span>
          {product.tags && product.tags.length > 0 && (
            <span className="ml-auto flex items-center gap-1 text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-navy-800">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-display font-extrabold text-white">₹{product.pricePerDay.toLocaleString('en-IN')}</span>
              <span className="text-xs text-navy-400">/day</span>
            </div>
            <span className="text-xs text-navy-400">Deposit ₹{product.securityDeposit.toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
              added ? 'bg-emerald-500/15 text-emerald-300' : 'btn-emerald !px-4 !py-2'
            }`}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
