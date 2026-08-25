import { Star, MapPin, CheckCircle2, Clock, Shield, ArrowRight } from 'lucide-react';
import type { Product } from '@/data/types';
import { useRouter } from '@/router';

export function ProductCard({ product }: { product: Product }) {
  const { navigate } = useRouter();

  const availabilityColor: Record<string, string> = {
    'Available today': 'bg-emerald-100 text-emerald-700',
    'Available this week': 'bg-accent-100 text-accent-700',
    'Booked': 'bg-error-100 text-error-600',
    'Limited slots': 'bg-warning-100 text-warning-700',
  };

  return (
    <div
      onClick={() => navigate({ name: 'product', id: product.id })}
      className="card group cursor-pointer overflow-hidden hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${availabilityColor[product.availability]}`}>
            <Clock className="w-3 h-3" />
            {product.availability}
          </span>
        </div>
        {product.buyAfterBorrowing && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-navy-900/90 text-white backdrop-blur-sm">
              <Shield className="w-3 h-3 text-emerald-400" />
              Buy after borrow
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{product.category}</span>
          <span className="text-xs text-navy-400">{product.condition}</span>
        </div>

        <h3 className="text-base font-bold text-navy-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-3 text-xs text-navy-500">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
            <span className="font-semibold text-navy-700">{product.rating}</span>
            <span>({product.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {product.distanceKm} km away
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4 text-xs text-navy-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{product.successfulBorrows} successful borrows</span>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-navy-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-navy-900">₹{product.pricePerDay.toLocaleString('en-IN')}</span>
              <span className="text-xs text-navy-400">/day</span>
            </div>
            <span className="text-xs text-navy-400">Deposit ₹{product.securityDeposit.toLocaleString('en-IN')}</span>
          </div>
          <button className="btn-emerald !px-4 !py-2 text-xs group/borrow">
            Borrow
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/borrow:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
