import { useState } from 'react';
import { Layout } from '../components/Layout';
import { mockUsers, mockStores, mockProducts, mockOrders, mockSalesData } from '../data/mockData';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'stores' | 'products' | 'orders' | 'analytics'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const users = mockUsers;
  const stores = mockStores;
  const products = mockProducts;
  const orders = mockOrders;

  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    totalOrders: orders.length,
    totalUsers: users.length,
    totalStores: stores.filter(s => s.status === 'active').length
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'users', name: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { id: 'stores', name: 'Stores', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'products', name: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', name: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'analytics', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900">Administrator</div>
                  <div className="text-xs text-slate-500">Platform Control</div>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
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
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Platform Overview 📊</h1>
                  <p className="text-slate-600">Real-time insights across your entire marketplace</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(0)}`} change="+15.3%" gradient="from-indigo-500 to-purple-500" delay={0} />
                  <StatCard title="Total Orders" value={stats.totalOrders.toString()} change="+12.1%" gradient="from-blue-500 to-cyan-500" delay={100} />
                  <StatCard title="Total Users" value={stats.totalUsers.toString()} change="+5.2%" gradient="from-pink-500 to-rose-500" delay={200} />
                  <StatCard title="Active Stores" value={stats.totalStores.toString()} change="+2" gradient="from-amber-500 to-orange-500" delay={300} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                  {/* Recent Users */}
                  <div className="glass-card rounded-2xl p-7 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-xl font-bold text-slate-900 mb-7">Recent Users</h2>
                    <div className="space-y-3">
                      {users.slice(0, 5).map((user, idx) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors"
                          style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80 + 500}ms both` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.firstName[0]}{user.lastName[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{user.firstName} {user.lastName}</div>
                              <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                          </div>
                          <span className={`badge text-[10px] ${
                            user.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'vendor' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Applications */}
                  <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Store Applications</h2>
                    <div className="space-y-3">
                      {stores.filter(s => s.status === 'pending').length === 0 && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-sm text-slate-600 font-medium">All caught up!</p>
                          <p className="text-xs text-slate-500">No pending applications</p>
                        </div>
                      )}
                      {stores.filter(s => s.status === 'pending').map((store, idx) => (
                        <div key={store.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80 + 600}ms both` }}>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">{store.name}</div>
                            <div className="text-xs text-slate-500">Vendor #{store.vendorId}</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost !p-2 !w-8 !h-8 text-green-600 hover:bg-green-50">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button className="btn btn-ghost !p-2 !w-8 !h-8 text-red-600 hover:bg-red-50">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && <DataTable title="Users" data={users} columns={['User', 'Email', 'Role', 'Joined']} gradient="from-indigo-500 to-purple-500" />}
            {activeTab === 'stores' && <DataTable title="Stores" data={stores} columns={['Store', 'Vendor', 'Products', 'Status']} gradient="from-purple-500 to-pink-500" />}
            {activeTab === 'products' && <DataTable title="Products" data={products} columns={['Product', 'Store', 'Price', 'Stock']} gradient="from-blue-500 to-cyan-500" />}
            {activeTab === 'orders' && <DataTable title="Orders" data={orders} columns={['Order ID', 'Customer', 'Total', 'Status']} gradient="from-green-500 to-emerald-500" />}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Platform Analytics</h1>
                  <p className="text-slate-600">Comprehensive marketplace insights</p>
                </div>

                <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h3>
                  <div className="space-y-4">
                    {mockSalesData.map((data, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{data.month}</span>
                          <span className="font-bold">${data.sales.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">User Distribution</h3>
                    <div className="space-y-5">
                      {[
                        { label: 'Customers', count: users.filter(u => u.role === 'customer').length, total: users.length, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Vendors', count: users.filter(u => u.role === 'vendor').length, total: users.length, color: 'from-purple-500 to-pink-500' },
                        { label: 'Admins', count: users.filter(u => u.role === 'admin').length, total: users.length, color: 'from-red-500 to-orange-500' }
                      ].map((item, idx) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium">{item.label}</span>
                            <span className="font-bold">{item.count}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                              style={{
                                width: `${(item.count / item.total) * 100}%`,
                                animation: `slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 150}ms both`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Platform Growth</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">+23%</div>
                        <div className="text-xs text-slate-600 font-medium">Users</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                        <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">+18%</div>
                        <div className="text-xs text-slate-600 font-medium">Revenue</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                        <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">+31%</div>
                        <div className="text-xs text-slate-600 font-medium">Orders</div>
                      </div>
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

function DataTable({ title, data, columns, gradient }: { title: string; data: any[]; columns: string[]; gradient: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600">Manage {data.length} {title.toLowerCase()}</p>
        </div>
        <button className={`btn btn-primary animate-fade-in-up bg-gradient-to-r ${gradient}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add {title.slice(0, -1)}
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{col}</th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 50}ms both` }}>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 text-sm">
                      {item.firstName ? `${item.firstName} ${item.lastName}` : item.name || item.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.email || item.vendorId || item.storeName || item.customerId || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.role || item.totalProducts || item.price ? `$${item.price}` : item.totalAmount ? `$${item.totalAmount.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {item.status && (
                      <span className={`badge text-[10px] ${
                        item.status === 'active' || item.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        item.status === 'pending' || item.status === 'shipped' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    )}
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
      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-0.5">{value}</div>
      <div className="text-xs text-slate-500">{title}</div>
    </div>
  );
}
