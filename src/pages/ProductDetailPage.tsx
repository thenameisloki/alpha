import { useState } from 'react';
import {
  Star, MapPin, CheckCircle2, Shield, ArrowRight, ArrowLeft,
  Calendar, Truck, Package, MessageCircle, Heart, Share2,
  Check, BadgeCheck, Clock, Sparkles, Wallet, ShoppingCart,
  Mail, Phone, X, Loader2, User,
} from 'lucide-react';
import { useRouter } from '@/router';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useCartWishlist } from '@/lib/cart';

export function ProductDetailPage({ productId }: { productId: string }) {
  const { navigate } = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const product = products.find(p => p.id === productId);
  const [activeImage, setActiveImage] = useState(0);
  const [borrowDays, setBorrowDays] = useState(3);
  const [deliveryMethod, setDeliveryMethod] = useState('Pickup');
  const [showBuyOption, setShowBuyOption] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [pendingAction, setPendingAction] = useState<'borrow' | 'buy' | null>(null);

  if (!product) {
    return (
      <div className="container-max px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-white mb-4">Product not found</h1>
        <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">Browse products</button>
      </div>
    );
  }

  const borrowCost = product.pricePerDay * borrowDays;
  const creditAmount = Math.round(borrowCost * (product.creditTowardPurchase / 100));
  const effectivePrice = product.purchasePrice - creditAmount;
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, borrowDays, deliveryMethod);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBorrowNow = () => {
    setPendingAction('borrow');
    setShowContactModal(true);
  };

  const handleBuyProduct = () => {
    setPendingAction('buy');
    setShowContactModal(true);
  };

  const validateContact = () => {
    const errors: Record<string, string> = {};
    if (!contactName.trim()) errors.name = 'Please enter your name';
    if (!contactEmail.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!contactPhone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^[+]?[0-9]{10,13}$/.test(contactPhone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10-13 digits)';
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowContactModal(false);
      addToCart(product, borrowDays, deliveryMethod);
      const action = pendingAction;
      setPendingAction(null);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactErrors({});
      navigate({ name: 'checkout' });
    }, 800);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setPendingAction(null);
    setContactErrors({});
  };

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <button onClick={() => navigate({ name: 'browse', category: product.category })} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to {product.category}
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-800 mb-4 shadow-card">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="badge bg-emerald-500/10 text-emerald-300">
                <Clock className="w-3 h-3" />
                {product.availability}
              </span>
              {product.buyAfterBorrowing && (
                <span className="badge bg-navy-950/90 text-white backdrop-blur-sm">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Buy after borrow
                </span>
              )}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-9 h-9 rounded-xl bg-navy-900/90 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-navy-200 hover:text-rose-500'}`} />
              </button>
              <button className="w-9 h-9 rounded-xl bg-navy-900/90 backdrop-blur-sm flex items-center justify-center text-navy-200 hover:text-white transition-colors">
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
                  activeImage === i ? 'ring-emerald-500' : 'ring-transparent hover:ring-navy-700'
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
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">{product.category}</span>
            <span className="text-navy-500">·</span>
            <span className="text-xs text-navy-400">{product.condition}</span>
          </div>

          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-sm text-navy-400">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-navy-300">
              <MapPin className="w-4 h-4" />
              {product.location} · {product.distanceKm} km
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm text-navy-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {product.successfulBorrows} successful borrows
          </div>

          <p className="text-navy-200 leading-relaxed mb-6">{product.description}</p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span key={tag} className="badge bg-navy-800 text-navy-300">#{tag}</span>
              ))}
            </div>
          )}

          {/* Lender profile */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-navy-950 mb-6">
            <img src={product.lender.avatar} alt={product.lender.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-white">{product.lender.name}</p>
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

            {/* Delivery method selector */}
            <div className="mb-4">
              <label className="text-xs text-navy-300 mb-2 block">Delivery method</label>
              <div className="flex gap-2">
                {product.deliveryOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDeliveryMethod(opt)}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                      deliveryMethod === opt ? 'bg-emerald-500 text-white' : 'bg-navy-800 text-navy-300 hover:bg-navy-700'
                    }`}
                  >
                    {opt}
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

            <div className="flex gap-3 mb-3">
              <button onClick={handleAddToCart} className="flex-1 rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold hover:bg-navy-700 transition-colors flex items-center justify-center gap-2">
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
              <button onClick={handleBorrowNow} className="flex-1 btn-emerald">
                Borrow Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

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
                <button
                  onClick={handleBuyProduct}
                  className="btn-emerald w-full"
                >
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
                <div key={opt} className="rounded-2xl bg-navy-950 p-3 text-center">
                  <Icon className="w-5 h-5 text-navy-200 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-navy-200">{opt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-xl font-bold text-white mb-4">Specifications</h2>
          <div className="rounded-3xl bg-navy-900 shadow-card p-6">
            <dl className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-navy-800 last:border-0">
                  <dt className="text-sm text-navy-400">{key}</dt>
                  <dd className="text-sm font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Availability Calendar */}
        <div>
          <h2 className="font-display text-xl font-bold text-white mb-4">Availability</h2>
          <div className="rounded-3xl bg-navy-900 shadow-card p-6">
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
                      dayNum < 1 || dayNum > 31 ? 'text-navy-700' :
                      isToday ? 'bg-emerald-500 text-white font-bold' :
                      isAvailable ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 cursor-pointer' :
                      'bg-navy-800 text-navy-500 line-through'
                    }`}
                  >
                    {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-navy-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/10" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-navy-800" /> Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="font-display text-xl font-bold text-white mb-4">Borrower reviews ({product.reviews.length})</h2>
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-navy-900 shadow-card p-5">
              <div className="flex items-start gap-3">
                <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-white">{review.author}</p>
                    <span className="text-xs text-navy-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent-400 text-accent-400' : 'text-navy-700'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy-200 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact info modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={closeContactModal} />
          <div className="relative w-full max-w-md rounded-3xl bg-navy-900 shadow-card-hover p-6 lg:p-8 animate-scale-in">
            <button onClick={closeContactModal} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center text-navy-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-5">
              {pendingAction === 'buy' ? (
                <Wallet className="w-7 h-7 text-emerald-300" />
              ) : (
                <ShoppingCart className="w-7 h-7 text-emerald-300" />
              )}
            </div>

            <h2 className="font-display text-xl font-extrabold text-white mb-1">
              {pendingAction === 'buy' ? 'Buy this product' : 'Borrow this product'}
            </h2>
            <p className="text-sm text-navy-300 mb-6">
              Enter your contact details so the lender can reach you about {product.name}.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-navy-200 mb-1.5 block">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your full name"
                    className={`input-field pl-12 ${contactErrors.name ? 'border-error-400 focus:border-error-400 focus:ring-error-500/20' : ''}`}
                  />
                </div>
                {contactErrors.name && <p className="text-xs text-error-500 mt-1">{contactErrors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-navy-200 mb-1.5 block">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`input-field pl-12 ${contactErrors.email ? 'border-error-400 focus:border-error-400 focus:ring-error-500/20' : ''}`}
                  />
                </div>
                {contactErrors.email && <p className="text-xs text-error-500 mt-1">{contactErrors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-navy-200 mb-1.5 block">Phone number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`input-field pl-12 ${contactErrors.phone ? 'border-error-400 focus:border-error-400 focus:ring-error-500/20' : ''}`}
                  />
                </div>
                {contactErrors.phone && <p className="text-xs text-error-500 mt-1">{contactErrors.phone}</p>}
              </div>

              <div className="rounded-2xl bg-navy-800 p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-navy-300">
                  Your contact details are shared securely with the lender only. We never share your information with third parties.
                </p>
              </div>

              <button type="submit" disabled={submitting} className="btn-emerald w-full disabled:opacity-60">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {pendingAction === 'buy' ? 'Continue to Purchase' : 'Continue to Checkout'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-bold text-white mb-6">More in {product.category}</h2>
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
