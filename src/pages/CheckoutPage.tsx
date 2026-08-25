import { useState } from 'react';
import {
  MapPin, Truck, Package, ArrowRight, ArrowLeft, Check,
  User, Phone, Mail, Calendar, Shield, CreditCard,
} from 'lucide-react';
import { useCartWishlist } from '@/lib/cart';
import { useRouter } from '@/router';

export function CheckoutPage() {
  const { cart, cartTotal, cartDepositTotal } = useCartWishlist();
  const { navigate } = useRouter();
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    startDate: '',
    notes: '',
  });

  const grandTotal = cartTotal + cartDepositTotal;

  if (cart.length === 0) {
    return (
      <div className="container-max px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">Your cart is empty</h1>
        <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">Browse products</button>
      </div>
    );
  }

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate({ name: 'cart' })} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-navy-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </button>

      <h1 className="text-3xl font-extrabold text-navy-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery method */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-500" />
              Delivery Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 'pickup', label: 'Pickup', desc: 'Collect from lender', icon: Package },
                { id: 'delivery', label: 'Doorstep Delivery', desc: 'Delivered to your address', icon: Truck },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDeliveryOption(opt.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl ring-1 transition-all ${
                    deliveryOption === opt.id ? 'ring-emerald-500 bg-emerald-50' : 'ring-navy-900/10 hover:ring-navy-900/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${deliveryOption === opt.id ? 'bg-emerald-500' : 'ring-1 ring-navy-200'}`}>
                    {deliveryOption === opt.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <opt.icon className="w-5 h-5 text-navy-600" />
                  <div className="text-left">
                    <p className="font-semibold text-navy-900 text-sm">{opt.label}</p>
                    <p className="text-xs text-navy-400">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-sky-500" />
              Contact Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Arjun Mehta"
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="arjun@example.com"
                    className="input-field pl-11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address (if delivery) */}
          {deliveryOption === 'delivery' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-coral-500" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Street address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Flat 12B, Hill Road"
                    className="input-field"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-700 mb-1.5 block">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Mumbai"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="400050"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Start date */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-500" />
              Borrowing Start Date
            </h2>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="input-field max-w-xs"
            />
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Notes to lender (optional)</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special requests or questions for the lender..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 lg:sticky lg:top-20">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-navy-400">{item.days} days · ₹{item.product.pricePerDay.toLocaleString('en-IN')}/day</p>
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
                <span className="text-2xl font-extrabold text-navy-900">₹{(cartTotal + cartDepositTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 mb-6 flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-navy-600">Deposits refunded automatically upon safe return.</p>
            </div>

            <button onClick={() => navigate({ name: 'payment' })} className="btn-emerald w-full">
              <CreditCard className="w-4 h-4" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
