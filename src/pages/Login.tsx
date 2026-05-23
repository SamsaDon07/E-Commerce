import { useState } from 'react';
import { useNavigate, Link } from '../router';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/Layout';

export function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  const useDemoAccount = (email: string) => {
    setFormData({ email, password: 'password' });
  };

  return (
    <Layout>
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Branding */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl animate-blob" />
              <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

              <div className="relative animate-fade-in-up">
                <span className="badge badge-gradient mb-6">Welcome back</span>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Sign in to your
                  <br />
                  <span className="gradient-text">MarketHub</span>
                  <br />
                  account
                </h1>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Access your orders, wishlist, and personalized recommendations. Join millions of happy customers.
                </p>

                <div className="space-y-4">
                  {[
                    'Exclusive deals and offers',
                    'Fast and secure checkout',
                    'Track orders in real-time'
                  ].map((feature, idx) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Floating testimonial */}
                <div className="mt-12 glass-card rounded-2xl p-6 max-w-sm animate-float-slow">
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 mb-4">"The best marketplace I've ever used. So many amazing products from trusted vendors!"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">S</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Sarah M.</div>
                      <div className="text-xs text-slate-500">Verified Customer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="animate-fade-in-up">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="lg:hidden mb-8 text-center">
                <span className="badge badge-gradient mb-3">Welcome back</span>
                <h2 className="text-3xl font-bold text-slate-900">Sign in to your account</h2>
              </div>

              <div className="hidden lg:block mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
                <p className="text-slate-600 mt-1">Enter your credentials to continue</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3 animate-scale-in">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-modern pl-11"
                      placeholder="you@example.com"
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                    <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input-modern pl-11"
                      placeholder="••••••••"
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                  <span className="text-sm text-slate-600">Keep me signed in</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-4 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-rotate-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Sign up free
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-slate-500 font-semibold uppercase tracking-wider">Demo accounts</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { role: 'Customer', email: 'customer@example.com', gradient: 'from-blue-500 to-cyan-500' },
                    { role: 'Vendor', email: 'vendor@example.com', gradient: 'from-purple-500 to-pink-500' },
                    { role: 'Admin', email: 'admin@example.com', gradient: 'from-orange-500 to-red-500' }
                  ].map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => useDemoAccount(demo.email)}
                      className="group p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${demo.gradient} flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform`}>
                        {demo.role[0]}
                      </div>
                      <div className="text-xs font-semibold text-slate-700">{demo.role}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
