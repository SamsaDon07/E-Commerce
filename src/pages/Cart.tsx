import { useState } from 'react';
import { useNavigate } from '../router';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Layout } from '../components/Layout';

export function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, updateQuantity, removeItem, total } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try SAVE10 or SAVE20');
    }
  };

  const proceedToCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse-glow" />
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full flex items-center justify-center animate-float">
              <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-slate-600 mb-8 text-lg">Add some amazing products to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary px-8 py-4 text-base"
          >
            Start Shopping
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-14 md:py-20">
        <div className="mb-12 md:mb-16">
          <span className="badge badge-gradient mb-4">Shopping Cart</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Review Your
            <span className="gradient-text ml-3">Items</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item, idx) => (
              <CartItem
                key={item.id}
                item={item}
                index={idx}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold gradient-text">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="input-modern flex-1"
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    {couponApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Try: SAVE10 or SAVE20</p>
              </div>

              <button
                onClick={proceedToCheckout}
                className="btn btn-primary w-full mb-3 py-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn btn-ghost w-full"
              >
                Continue Shopping
              </button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CartItem({ item, index, onUpdateQuantity, onRemove }: {
  item: any;
  index: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className="card card-hover p-5 md:p-6 flex gap-5 md:gap-6"
      style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms both` }}
    >
      <div className="relative flex-shrink-0 w-28 md:w-36 aspect-square rounded-xl overflow-hidden bg-slate-100">
        <img src={item.images[0]} alt={item.name} className="card-image w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between gap-3 mb-1">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-indigo-600 mb-1">{item.storeName}</div>
            <h4 className="font-semibold text-slate-900 line-clamp-2">{item.name}</h4>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="btn btn-ghost btn-icon !w-9 !h-9 text-slate-400 hover:text-red-500 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="inline-flex items-center bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">${item.price.toFixed(2)} each</div>
            <div className="text-xl font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
