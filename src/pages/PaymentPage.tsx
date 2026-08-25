import { useState } from 'react';
import {
  CreditCard, Lock, Check, Shield, ArrowRight, ArrowLeft,
  Wallet, Smartphone, Building2, CheckCircle2, Loader2,
} from 'lucide-react';
import { useCartWishlist } from '@/lib/cart';
import { useRouter } from '@/router';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';
type PayState = 'form' | 'processing' | 'success';

export function PaymentPage() {
  const { cart, cartTotal, cartDepositTotal, clearCart } = useCartWishlist();
  const { navigate } = useRouter();
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [payState, setPayState] = useState<PayState>('form');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  const grandTotal = cartTotal + cartDepositTotal;

  if (cart.length === 0 && payState !== 'success') {
    return (
      <div className="container-max px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">Nothing to pay for</h1>
        <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">Browse products</button>
      </div>
    );
  }

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPayState('processing');
    setTimeout(() => {
      setPayState('success');
      setTimeout(() => {
        clearCart();
        navigate({ name: 'dashboard-borrower' });
      }, 2500);
    }, 2000);
  };

  if (payState === 'success') {
    return (
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto animate-scale-in">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 mb-3">Payment Successful!</h1>
          <p className="text-navy-500 mb-2">Your borrowing has been confirmed.</p>
          <p className="text-sm text-navy-400 mb-8">A confirmation has been sent to your email. You can track your bookings from the dashboard.</p>
          <div className="rounded-3xl bg-emerald-50 p-6 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-navy-500">Amount paid</span>
              <span className="font-bold text-navy-900">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-navy-500">Items</span>
              <span className="font-bold text-navy-900">{cart.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy-500">Payment method</span>
              <span className="font-bold text-navy-900 capitalize">{method === 'upi' ? 'UPI' : method === 'netbanking' ? 'Net Banking' : method}</span>
            </div>
          </div>
          <p className="text-sm text-navy-400 animate-pulse-soft">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  if (payState === 'processing') {
    return (
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-sky-100 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 mb-3">Processing Payment...</h1>
          <p className="text-navy-500">Please don't close this window. Your payment is being processed securely.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-navy-400">
            <Lock className="w-4 h-4 text-emerald-500" />
            256-bit encrypted transaction
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate({ name: 'checkout' })} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-navy-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to checkout
      </button>

      <h1 className="text-3xl font-extrabold text-navy-900 mb-8">Payment</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handlePay} className="space-y-6">
            {/* Payment method selector */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Select Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'card' as PaymentMethod, label: 'Card', icon: CreditCard, color: 'text-sky-600 bg-sky-50' },
                  { id: 'upi' as PaymentMethod, label: 'UPI', icon: Smartphone, color: 'text-violet-600 bg-violet-50' },
                  { id: 'netbanking' as PaymentMethod, label: 'Net Banking', icon: Building2, color: 'text-emerald-600 bg-emerald-50' },
                  { id: 'wallet' as PaymentMethod, label: 'Wallet', icon: Wallet, color: 'text-accent-600 bg-accent-50' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMethod(opt.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ring-1 transition-all ${
                      method === opt.id ? 'ring-emerald-500 bg-emerald-50' : 'ring-navy-900/10 hover:ring-navy-900/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${opt.color} flex items-center justify-center`}>
                      <opt.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-navy-900">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card payment */}
            {method === 'card' && (
              <div className="card p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Card Details</h2>

                {/* Card preview */}
                <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-6 mb-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-500" />
                      <span className="text-xs font-semibold text-navy-300">LENORA PAY</span>
                    </div>
                    <p className="text-lg font-mono tracking-wider mb-4">
                      {cardData.number || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-navy-300 uppercase">Card Holder</p>
                        <p className="text-sm font-semibold">{cardData.name || 'YOUR NAME'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-navy-300 uppercase">Expires</p>
                        <p className="text-sm font-semibold">{cardData.expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Card number</label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
                        setCardData({ ...cardData, number: val });
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="input-field font-mono"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Name on card</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                      placeholder="ARJUN MEHTA"
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Expiry</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                          setCardData({ ...cardData, expiry: val });
                        }}
                        placeholder="MM/YY"
                        className="input-field"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy-700 mb-1.5 block">CVV</label>
                      <input
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.slice(0, 4) })}
                        placeholder="•••"
                        className="input-field"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UPI */}
            {method === 'upi' && (
              <div className="card p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-navy-900 mb-4">UPI Payment</h2>
                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="input-field"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                    <button
                      key={app}
                      type="button"
                      className="rounded-xl bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-600 hover:bg-navy-100 transition-colors"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Net Banking */}
            {method === 'netbanking' && (
              <div className="card p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Select Bank</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Yes Bank'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBank(b)}
                      className={`flex items-center gap-3 p-4 rounded-2xl ring-1 transition-all ${
                        bank === b ? 'ring-emerald-500 bg-emerald-50' : 'ring-navy-900/10 hover:ring-navy-900/20'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-navy-600" />
                      <span className="text-sm font-semibold text-navy-900">{b}</span>
                      {bank === b && <Check className="w-4 h-4 text-emerald-500 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet */}
            {method === 'wallet' && (
              <div className="card p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Wallet</h2>
                <div className="rounded-2xl bg-navy-50 p-6 text-center">
                  <Wallet className="w-12 h-12 text-navy-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-navy-900">Lendora Wallet Balance</p>
                  <p className="text-2xl font-extrabold text-navy-900 mt-1">₹0</p>
                  <p className="text-xs text-navy-400 mt-2">Add money to your wallet or use another method</p>
                </div>
              </div>
            )}

            <button type="submit" className="btn-emerald w-full text-base !py-4">
              <Lock className="w-4 h-4" />
              Pay ₹{grandTotal.toLocaleString('en-IN')} Securely
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 lg:sticky lg:top-20">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Payment Summary</h2>

            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-navy-400">{item.days} days</p>
                  </div>
                  <span className="text-sm font-bold text-navy-900 shrink-0">₹{(item.product.pricePerDay * item.days).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-navy-100 pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Borrowing cost</span>
                <span className="font-semibold text-navy-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Security deposits</span>
                <span className="font-semibold text-navy-900">₹{cartDepositTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="border-t border-navy-100 pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-navy-900">Total</span>
                <span className="text-2xl font-extrabold text-navy-900">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-navy-500">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                PCI DSS compliant payment processing
              </div>
              <div className="flex items-center gap-2 text-xs text-navy-500">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                256-bit SSL encryption
              </div>
              <div className="flex items-center gap-2 text-xs text-navy-500">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Deposits auto-refunded on safe return
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
