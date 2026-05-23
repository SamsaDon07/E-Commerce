import { useState } from 'react';
import { useNavigate, Link } from '../router';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/Layout';

export function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'vendor'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(formData);
      navigate('/');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Branding */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-blob" />
              <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

              <div className="relative animate-fade-in-up">
                <span className="badge badge-gradient mb-6">Join MarketHub</span>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Start your
                  <br />
                  <span className="gradient-text">journey</span> today
                </h1>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Whether you want to shop or sell, MarketHub has everything you need to succeed.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Shop', desc: '50K+ products', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4' },
                    { title: 'Sell', desc: '500+ vendors', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9' },
                    { title: 'Earn', desc: 'Top revenue', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
                    { title: 'Grow', desc: '+50K users', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
                  ].map((stat, idx) => (
                    <div
                      key={stat.title}
                      className="glass-card p-5 rounded-2xl animate-fade-in-up"
                      style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                        </svg>
                      </div>
                      <div className="font-bold text-slate-900">{stat.title}</div>
                      <div className="text-xs text-slate-500">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="animate-fade-in-up">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
                <p className="text-slate-600 mt-1">Fill in the details below to get started</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input-modern"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input-modern"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <input
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input-modern"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm</label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="input-modern"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Account type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'customer', label: 'Customer', desc: 'Shop products', gradient: 'from-blue-500 to-cyan-500', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4' },
                      { value: 'vendor', label: 'Vendor', desc: 'Sell products', gradient: 'from-purple-500 to-pink-500', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9' }
                    ].map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => setFormData({ ...formData, role: option.value as 'customer' | 'vendor' })}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          formData.role === option.value
                            ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-3`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={option.icon} />
                          </svg>
                        </div>
                        <div className="font-bold text-slate-900">{option.label}</div>
                        <div className="text-xs text-slate-500">{option.desc}</div>
                        {formData.role === option.value && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded accent-indigo-600" />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="font-semibold text-indigo-600 hover:text-indigo-700">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="font-semibold text-indigo-600 hover:text-indigo-700">Privacy Policy</Link>
                  </span>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
