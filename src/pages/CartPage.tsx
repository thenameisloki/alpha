import { useState } from 'react';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft,
  Package, Truck, Shield, Tag, X,
} from 'lucide-react';
import { useCartWishlist } from '@/lib/cart';
import { useRouter } from '@/router';

export function CartPage() {
  const { cart, removeFromCart, updateCartDays, cartTotal, cartDepositTotal, clearCart } = useCartWishlist();
  const { navigate } = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-navy-50 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-navy-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 mb-3">Your cart is empty</h1>
          <p className="text-navy-500 mb-8">Browse products and add items you want to borrow.</p>
          <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">
            Browse Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const grandTotal = cartTotal + cartDepositTotal;

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-navy-900">Your Cart</h1>
          <p className="text-navy-500 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'} ready to borrow</p>
        </div>
        <button onClick={clearCart} className="btn-ghost text-error-500 hover:bg-error-50">
          <Trash2 className="w-4 h-4" />
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemCost = item.product.pricePerDay * item.days;
            return (
              <div key={item.product.id} className="card p-4 flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-2xl object-cover shrink-0 cursor-pointer"
                  onClick={() => navigate({ name: 'product', id: item.product.id })}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className="font-bold text-navy-900 cursor-pointer hover:text-emerald-600 transition-colors"
                        onClick={() => navigate({ name: 'product', id: item.product.id })}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-navy-400 mt-0.5">{item.product.category} · {item.product.location}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center text-navy-400 hover:text-error-500 hover:bg-error-50 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Days selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-navy-400">Days:</span>
                      <div className="flex items-center gap-1 rounded-xl bg-navy-50 p-1">
                        <button
                          onClick={() => updateCartDays(item.product.id, item.days - 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-navy-600 hover:bg-navy-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-navy-900">{item.days}</span>
                        <button
                          onClick={() => updateCartDays(item.product.id, item.days + 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-navy-600 hover:bg-navy-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-1.5 text-xs text-navy-400">
                      {item.deliveryMethod === 'Pickup' ? <Package className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                      {item.deliveryMethod}
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-3 pt-3 border-t border-navy-50">
                    <div>
                      <span className="text-xs text-navy-400">Deposit</span>
                      <p className="text-sm font-semibold text-navy-700">₹{item.product.securityDeposit.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-navy-400">₹{item.product.pricePerDay.toLocaleString('en-IN')}/day × {item.days}</span>
                      <p className="text-lg font-extrabold text-navy-900">₹{itemCost.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button onClick={() => navigate({ name: 'browse' })} className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4" />
            Continue browsing
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 lg:sticky lg:top-20">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Borrowing cost</span>
                <span className="font-semibold text-navy-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Security deposits</span>
                <span className="font-semibold text-navy-900">₹{cartDepositTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Platform fee</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
            </div>

            <div className="border-t border-navy-100 pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-navy-900">Total due today</span>
                <span className="text-2xl font-extrabold text-navy-900">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-navy-400 mt-1">Deposits are refundable upon safe return</p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 mb-6 flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-navy-600">Your payment is protected. Deposits are refunded automatically when items are returned in good condition.</p>
            </div>

            <button onClick={() => navigate({ name: 'checkout' })} className="btn-emerald w-full">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
