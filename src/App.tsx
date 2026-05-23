import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Router } from './router';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/cart', element: <Cart /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/vendor', element: <VendorDashboard /> },
  { path: '/vendor/dashboard', element: <VendorDashboard /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '*', element: (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Go Home
        </a>
      </div>
    </div>
  )}
];

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router routes={routes} />
      </CartProvider>
    </AuthProvider>
  );
}
