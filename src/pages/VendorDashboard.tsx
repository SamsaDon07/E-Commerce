import { useState } from 'react';
import { Link } from '../router';
import { Layout } from '../components/Layout';
import { mockProducts, mockOrders, mockSalesData } from '../data/mockData';

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');
  const [products] = useState(mockProducts);
  const [orders] = useState(mockOrders);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    averageRating: 4.6
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'products', name: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', name: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'analytics', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden btn btn-secondary mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>

          {/* Sidebar */}
          <aside className={`lg:w-80 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="glass-card rounded-2xl p-6 lg:p-7 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <span className="text-white font-bold">VS</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 truncate">Vendor Store</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Seller
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    style={{ animation: `slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms both` }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link to="/products/new" className="btn btn-primary w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                  Add Product
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
                  <p className="text-slate-600">Here's what's happening with your store today</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(0)}`} change="+12.5%" gradient="from-indigo-500 to-purple-500" delay={0} />
                  <StatCard title="Total Orders" value={stats.totalOrders.toString()} change="+8.2%" gradient="from-blue-500 to-cyan-500" delay={100} />
                  <StatCard title="Products" value={stats.totalProducts.toString()} change="+3" gradient="from-purple-500 to-pink-500" delay={200} />
                  <StatCard title="Avg Rating" value={stats.averageRating.toString()} change="+0.2" gradient="from-amber-500 to-orange-500" delay={300} />
                </div>

                {/* Sales Chart */}
                <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Sales Performance</h2>
                      <p className="text-sm text-slate-500">Last 6 months overview</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                      {['Week', 'Month', 'Year'].map((period, i) => (
                        <button key={period} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${i === 1 ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockSalesData.map((data, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-700">{data.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{data.orders} orders</span>
                            <span className="font-bold text-slate-900">${data.sales.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-indigo-500/30"
                            style={{
                              width: `${(data.sales / 70000) * 100}%`,
                              animation: `slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100 + 500}ms both`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
                    <Link to="/vendor/orders" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                      View All →
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="pb-3 pr-4">Order ID</th>
                          <th className="pb-3 pr-4">Customer</th>
                          <th className="pb-3 pr-4">Amount</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order, idx) => (
                          <tr key={order.id} className="border-t border-slate-100" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80 + 700}ms both` }}>
                            <td className="py-4 pr-4 font-mono text-sm font-semibold text-slate-900">{order.id}</td>
                            <td className="py-4 pr-4 text-sm text-slate-600">#{order.customerId}</td>
                            <td className="py-4 pr-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
                            <td className="py-4 pr-4">
                              <span className={`badge text-[10px] ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-sm text-slate-500">
                              {order.createdAt.toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="animate-fade-in-up">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Products</h1>
                    <p className="text-slate-600">Manage your product catalog</p>
                  </div>
                  <button className="btn btn-primary animate-fade-in-up">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Add Product
                  </button>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, idx) => (
                          <tr key={product.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms both` }}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                  <div className="font-semibold text-slate-900 text-sm line-clamp-1">{product.name}</div>
                                  <div className="text-xs text-slate-500">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold">${product.price}</td>
                            <td className="px-6 py-4 text-slate-600">{product.inventory}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <span className="text-amber-400">★</span>
                                <span className="text-sm font-semibold">{product.rating}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`badge text-[10px] ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                {product.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="btn btn-ghost !p-2 !w-8 !h-8 text-slate-500 hover:text-indigo-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button className="btn btn-ghost !p-2 !w-8 !h-8 text-slate-500 hover:text-red-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Orders</h1>
                  <p className="text-slate-600">Process and manage customer orders</p>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, idx) => (
                          <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms both` }}>
                            <td className="px-6 py-4 font-mono font-semibold text-slate-900">{order.id}</td>
                            <td className="px-6 py-4 text-slate-600">{order.items.length} items</td>
                            <td className="px-6 py-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
                            <td className="px-6 py-4">
                              <select className="text-xs font-semibold border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="pending" selected={order.status === 'pending'}>Pending</option>
                                <option value="processing" selected={order.status === 'processing'}>Processing</option>
                                <option value="shipped" selected={order.status === 'shipped'}>Shipped</option>
                                <option value="delivered" selected={order.status === 'delivered'}>Delivered</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`badge text-[10px] ${
                                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                order.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{order.createdAt.toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
                  <p className="text-slate-600">Deep insights into your store performance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Trend</h3>
                    <div className="space-y-4">
                      {mockSalesData.map((data, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium text-slate-700">{data.month}</span>
                            <span className="font-bold text-slate-900">${data.sales.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                              style={{
                                width: `${(data.sales / 70000) * 100}%`,
                                animation: `slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 100}ms both`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Top Categories</h3>
                    <div className="space-y-5">
                      {[
                        { name: 'Electronics', pct: 45, color: 'from-indigo-500 to-purple-500' },
                        { name: 'Fashion', pct: 30, color: 'from-pink-500 to-rose-500' },
                        { name: 'Home & Garden', pct: 25, color: 'from-amber-500 to-orange-500' }
                      ].map((cat, idx) => (
                        <div key={cat.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700">{cat.name}</span>
                            <span className="font-bold text-slate-900">{cat.pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r ${cat.color}`}
                              style={{
                                width: `${cat.pct}%`,
                                animation: `slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 150}ms both`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
                      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">+23%</div>
                      <div className="text-sm text-slate-600 font-medium">Growth</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">+18%</div>
                      <div className="text-sm text-slate-600 font-medium">Revenue</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
                      <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">+31%</div>
                      <div className="text-sm text-slate-600 font-medium">Orders</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, change, gradient, delay }: { title: string; value: string; change: string; gradient: string; delay: number }) {
  return (
    <div
      className="glass-card rounded-2xl p-5 card-hover group"
      style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="badge bg-green-100 text-green-700 text-[10px]">{change}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-0.5">{value}</div>
      <div className="text-sm text-slate-500">{title}</div>
    </div>
  );
}
