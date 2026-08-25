import { useState } from 'react';
import {
  Star, MapPin, CheckCircle2, Shield, ArrowRight, ArrowLeft,
  Calendar, Truck, Package, MessageCircle, Heart, Share2,
  Check, BadgeCheck, Clock, Sparkles, Wallet,
} from 'lucide-react';
import { useRouter } from '@/router';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailPage({ productId }: { productId: string }) {
  const { navigate } = useRouter();
  const product = products.find(p => p.id === productId);
  const [activeImage, setActiveImage] = useState(0);
  const [borrowDays, setBorrowDays] = useState(3);
  const [showBuyOption, setShowBuyOption] = useState(false);

  if (!product) {
    return (
      <div className="container-max px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">Product not found</h1>
        <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">Browse products</button>
      </div>
    );
  }

  const borrowCost = product.pricePerDay * borrowDays;
  const creditAmount = Math.round(borrowCost * (product.creditTowardPurchase / 100));
  const effectivePrice = product.purchasePrice - creditAmount;
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Breadcrumb */}
      <button onClick={() => navigate({ name: 'browse', category: product.category })} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-navy-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to {product.category}
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-50 mb-4 shadow-card">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="badge bg-emerald-100 text-emerald-700">
                <Clock className="w-3 h-3" />
                {product.availability}
              </span>
              {product.buyAfterBorrowing && (
                <span className="badge bg-navy-900/90 text-white backdrop-blur-sm">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Buy after borrow
                </span>
              )}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-600 hover:text-error-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-600 hover:text-navy-900 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-2xl overflow-hidden ring-2 transition-all ${
                  activeImage === i ? 'ring-emerald-500' : 'ring-transparent hover:ring-navy-200'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{product.category}</span>
            <span className="text-navy-300">·</span>
            <span className="text-xs text-navy-400">{product.condition}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-navy-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
              <span className="font-bold text-navy-900">{product.rating}</span>
              <span className="text-sm text-navy-400">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-navy-500">
              <MapPin className="w-4 h-4" />
              {product.location} · {product.distanceKm} km
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm text-navy-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {product.successfulBorrows} successful borrows
          </div>

          <p className="text-navy-600 leading-relaxed mb-6">{product.description}</p>

          {/* Lender profile */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F8FAFC] mb-6">
            <img src={product.lender.avatar} alt={product.lender.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-navy-900">{product.lender.name}</p>
                {product.lender.verified && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
              </div>
              <p className="text-xs text-navy-400">
                ★ {product.lender.rating} · {product.lender.totalListings} listings · Responds {product.lender.responseTime}
              </p>
            </div>
            <button className="btn-ghost !px-3">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Borrow → Decide → Buy Box */}
          <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">Borrow → Decide → Buy</span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex-1 rounded-xl bg-navy-800 p-3 text-center">
                <p className="text-xs text-navy-300 mb-1">Borrow</p>
                <p className="text-sm font-bold">₹{product.pricePerDay}/day</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy-400" />
              <div className="flex-1 rounded-xl bg-navy-800 p-3 text-center">
                <p className="text-xs text-navy-300 mb-1">Decide</p>
                <p className="text-sm font-bold">Try it out</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy-400" />
              <div className="flex-1 rounded-xl bg-emerald-500 p-3 text-center">
                <p className="text-xs text-emerald-50 mb-1">Buy</p>
                <p className="text-sm font-bold">If you love it</p>
              </div>
            </div>

            {/* Days selector */}
            <div className="mb-4">
              <label className="text-xs text-navy-300 mb-2 block">Borrowing period</label>
              <div className="flex gap-2">
                {[1, 3, 7, 14].map((days) => (
                  <button
                    key={days}
                    onClick={() => setBorrowDays(days)}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                      borrowDays === days ? 'bg-emerald-500 text-white' : 'bg-navy-800 text-navy-300 hover:bg-navy-700'
                    }`}
                  >
                    {days === 1 ? '1 day' : `${days} days`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-700">
              <span className="text-sm text-navy-300">Borrow for {borrowDays} {borrowDays === 1 ? 'day' : 'days'}</span>
              <span className="text-xl font-extrabold">₹{borrowCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-navy-300">Security deposit (refundable)</span>
              <span className="text-sm font-semibold">₹{product.securityDeposit.toLocaleString('en-IN')}</span>
            </div>

            <button className="btn-emerald w-full mb-3">
              Borrow Now
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Buy option */}
            <button
              onClick={() => setShowBuyOption(!showBuyOption)}
              className="w-full flex items-center justify-between rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold hover:bg-navy-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                Love it? Buy it.
              </span>
              <span className="text-emerald-400">₹{product.purchasePrice.toLocaleString('en-IN')}</span>
            </button>

            {showBuyOption && (
              <div className="mt-3 rounded-xl bg-emerald-500/10 p-4 animate-fade-in">
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-300">Purchase price</span>
                    <span className="text-white">₹{product.purchasePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Your borrowing credit ({product.creditTowardPurchase}%)</span>
                    <span className="text-emerald-400">− ₹{creditAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-navy-700">
                    <span className="font-bold text-white">Effective price after credit</span>
                    <span className="font-extrabold text-emerald-400">₹{effectivePrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button className="btn-emerald w-full">
                  Buy This Product
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-navy-300 mt-2 text-center">
                  Your borrowing cost of ₹{borrowCost.toLocaleString('en-IN')} is credited toward purchase.
                </p>
              </div>
            )}
          </div>

          {/* Delivery options */}
          <div className="grid grid-cols-3 gap-3">
            {product.deliveryOptions.map((opt) => {
              const icon = opt === 'Pickup' ? Package : opt === 'Doorstep delivery' ? Truck : Package;
              const Icon = icon;
              return (
                <div key={opt} className="rounded-2xl bg-[#F8FAFC] p-3 text-center">
                  <Icon className="w-5 h-5 text-navy-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-navy-700">{opt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-navy-900 mb-4">Specifications</h2>
          <div className="rounded-3xl bg-white shadow-card p-6">
            <dl className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-navy-50 last:border-0">
                  <dt className="text-sm text-navy-400">{key}</dt>
                  <dd className="text-sm font-semibold text-navy-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Availability Calendar */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 mb-4">Availability</h2>
          <div className="rounded-3xl bg-white shadow-card p-6">
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-semibold text-navy-400 py-1">{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 2;
                const isAvailable = dayNum > 0 && dayNum <= 31 && ![5, 12, 13, 19, 26].includes(dayNum);
                const isToday = dayNum === 25;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                      dayNum < 1 || dayNum > 31 ? 'text-navy-200' :
                      isToday ? 'bg-emerald-500 text-white font-bold' :
                      isAvailable ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer' :
                      'bg-navy-50 text-navy-300 line-through'
                    }`}
                  >
                    {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-navy-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-50" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-navy-50" /> Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-navy-900 mb-4">Borrower reviews ({product.reviews.length})</h2>
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-white shadow-card p-5">
              <div className="flex items-start gap-3">
                <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-navy-900">{review.author}</p>
                    <span className="text-xs text-navy-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent-400 text-accent-400' : 'text-navy-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy-600 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-navy-900 mb-6">More in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
