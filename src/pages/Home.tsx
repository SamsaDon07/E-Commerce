import { useEffect, useState } from 'react';
import { Link } from '../router';
import { Layout } from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { mockProducts, mockCategories } from '../data/mockData';

export function Home() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const featuredProducts = mockProducts.filter(p => p.isFeatured);
  const topCategories = mockCategories.filter(c => !c.parentId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      {/* HERO SECTION with Earth Background */}
      <section className="relative overflow-hidden pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-10 md:pt-14">
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-[540px] lg:min-h-[640px] flex items-center">
            {/* Earth Background */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=2000&h=1200&fit=crop" 
                alt="Earth from space" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-pink-900/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            {/* Animated elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
            
            {/* Floating product cards - Updated positions */}
            <div className="absolute top-20 right-20 hidden lg:block animate-float">
              <div className="glass-card rounded-2xl p-4 w-48 shadow-2xl">
                <img src={mockProducts[6]?.images[0] || mockProducts[0].images[0]} alt="iPhone" className="w-full h-28 object-cover rounded-xl" />
                <div className="mt-3 text-sm font-bold text-slate-900">iPhone 17 Pro</div>
                <div className="text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">$1,299</div>
              </div>
            </div>
            <div className="absolute bottom-20 left-20 hidden lg:block animate-float-slow">
              <div className="glass-card rounded-2xl p-4 w-52 shadow-2xl">
                <img src={mockProducts[7]?.images[0] || mockProducts[2].images[0]} alt="MacBook" className="w-full h-32 object-cover rounded-xl" />
                <div className="mt-3 text-sm font-bold text-slate-900">MacBook Pro M4</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 py-20 md:px-16 lg:px-20 md:py-24 text-center text-white">
              <div
                className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-white backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  500+ Premium Vendors Online
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
                  Discover Amazing
                  <br />
                  <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent animate-gradient">
                    Products
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                  From the latest iPhone 17 Pro to cutting-edge MacBook Pro M4, find everything you need 
                  from our trusted network of premium vendors worldwide.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/products"
                    className="btn bg-white text-slate-900 hover:shadow-2xl hover:shadow-white/30 px-8 py-4 text-base backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explore Collection
                  </Link>
                  <Link
                    to={user?.role === 'vendor' ? '/vendor' : '/register'}
                    className="btn btn-ghost text-white border border-white/30 hover:bg-white/10 px-8 py-4 text-base backdrop-blur-sm"
                  >
                    {user?.role === 'vendor' ? 'Vendor Dashboard' : 'Start Selling'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-14 pt-10 border-t border-white/20">
                  {[
                    { label: 'Premium Products', value: '50K+' },
                    { label: 'Verified Vendors', value: '1,000+' },
                    { label: 'Happy Customers', value: '100K+' },
                    { label: 'Avg Rating', value: '4.9★' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs text-blue-200 uppercase tracking-wider mt-2 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <span className="badge badge-gradient mb-4">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Marketplace
              <span className="gradient-text ml-3">Excellence</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience the future of online shopping with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: '100% Verified',
                desc: 'Every vendor is thoroughly vetted and verified for your safety'
              },
              { 
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Lightning Fast',
                desc: 'Express shipping and instant digital delivery on all products'
              },
              { 
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                title: 'Best Prices',
                desc: 'Price match guarantee ensures you always get the best deals'
              },
              { 
                icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
                title: '24/7 Support',
                desc: 'Round-the-clock customer service for all your needs'
              }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl text-center card-hover group animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-end mb-14 md:mb-16">
            <div>
              <span className="badge badge-gradient mb-4">Shop by Category</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                Find What You
                <span className="gradient-text ml-2">Love</span>
              </h2>
              <p className="text-slate-600 mt-4 max-w-xl text-base md:text-lg leading-relaxed">Browse through our curated categories and discover products tailored to your lifestyle.</p>
            </div>
            <Link to="/categories" className="hidden md:inline-flex btn btn-ghost">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 md:gap-7">
            {topCategories.slice(0, 8).map((category, idx) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="card card-hover group relative overflow-hidden aspect-square"
                style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 100}ms both` }}
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-image absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-pink-600/0 group-hover:from-indigo-600/40 group-hover:to-pink-600/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-lg">{category.name}</h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    {mockProducts.filter(p => p.category === category.name).length} items
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-end mb-14 md:mb-16">
            <div>
              <span className="badge badge-gradient mb-3">🔥 Hot Picks</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                Featured
                <span className="gradient-text ml-2">Products</span>
              </h2>
              <p className="text-slate-600 mt-3 max-w-xl">Hand-picked by our team based on what customers love right now.</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex btn btn-ghost">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} onAddToCart={addItem} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            {[
              { icon: 'M5 13l4 4L19 7', title: 'Verified Vendors', desc: 'Every seller is thoroughly vetted' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Payments', desc: 'Your transactions are protected' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Fast Delivery', desc: 'Get your orders quickly' },
              { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: '24/7 Support', desc: 'We\'re here to help anytime' }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="group text-center p-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
                style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 150}ms both` }}
              >
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <span className="badge badge-gradient mb-4">Customer Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Loved by
              <span className="gradient-text ml-3">Thousands</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Real experiences from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "Tech Enthusiast",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                comment: "Found my iPhone 17 Pro here at an amazing price. The verification process made me feel completely secure. Best marketplace experience ever!",
                rating: 5
              },
              {
                name: "Sarah Chen",
                role: "Small Business Owner",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                comment: "As a vendor, the analytics dashboard helps me track everything. Sales are up 300% since joining MarketHub!",
                rating: 5
              },
              {
                name: "Marcus Johnson",
                role: "Frequent Shopper",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                comment: "The variety is unmatched. From my MacBook Pro to yoga gear, everything arrives fast and exactly as described.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className="glass-card p-8 rounded-2xl card-hover animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
            <div className="mb-8">
              <span className="badge badge-gradient mb-4">Stay Updated</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Get the Latest
                <span className="gradient-text ml-3">Deals</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Subscribe to our newsletter and never miss out on exclusive offers
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-modern flex-1"
                />
                <button className="btn btn-primary px-6">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                No spam, unsubscribe at any time. Privacy Policy applies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 lg:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-blob" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
            </div>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 text-white">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Ready to Start
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Selling?</span>
              </h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join thousands of successful vendors and reach millions of customers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/vendor/register"
                  className="btn bg-white text-slate-900 hover:shadow-2xl hover:shadow-white/20 px-8 py-4 text-base"
                >
                  Become a Vendor
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/vendor"
                  className="btn btn-ghost text-white border border-white/30 hover:bg-white/10 px-8 py-4 text-base backdrop-blur"
                >
                  Vendor Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ProductCard({ product, index, onAddToCart }: { product: any; index: number; onAddToCart: (item: any) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card card-hover group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms both` }}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img
          src={product.images[hovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          className="card-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {product.comparePrice && (
            <span className="badge bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px]">
              -{Math.round((1 - product.price / product.comparePrice) * 100)}%
            </span>
          )}
          {product.isFeatured && (
            <span className="badge bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px]">
              ★ Featured
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-indigo-50 hover:scale-110 transition-all">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom action bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button
            onClick={() => onAddToCart({ ...product, quantity: 1 })}
            className="btn btn-primary w-full text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-indigo-600">{product.storeName}</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500">{product.category}</span>
        </div>
        <h3 className="font-semibold text-base md:text-lg text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-slate-200'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-slate-500">{product.rating} ({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl md:text-3xl font-bold text-slate-900">${product.price}</span>
            {product.comparePrice && (
              <span className="text-sm text-slate-400 line-through ml-2">
                ${product.comparePrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart({ ...product, quantity: 1 })}
            className="btn btn-primary btn-icon sm:hidden"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
