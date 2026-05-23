import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { Layout } from '../components/Layout';
import { mockProducts, mockCategories } from '../data/mockData';

export function Products() {
  const { addItem } = useCart();
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = mockCategories.filter(c => !c.parentId);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => product.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, maxPrice, sortBy, products]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMaxPrice(1000);
    setSortBy('featured');
  };

  const hasActiveFilters = searchTerm || selectedCategory || maxPrice < 1000 || sortBy !== 'featured';

  return (
    <Layout>
      {/* Page Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-10 md:pt-14">
        <div className="text-center mb-14 md:mb-20">
          <span className="badge badge-gradient mb-4">Discover Products</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-5">
            Shop Our
            <span className="gradient-text ml-3">Collection</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore thousands of products from verified vendors worldwide
          </p>
        </div>

        {/* Search & Toolbar */}
        <div className="glass-card rounded-2xl p-5 md:p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="input-modern w-full pl-12 pr-4"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="btn btn-secondary lg:hidden flex-1 md:flex-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-pink-500 rounded-full" />
                )}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-modern !py-2.5 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View toggle */}
              <div className="hidden sm:flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="glass-card rounded-2xl p-6 lg:p-7 lg:sticky lg:top-28">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Category</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      !selectedCategory ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex justify-between items-center group ${
                        selectedCategory === category.name ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-xs ${selectedCategory === category.name ? 'text-white/80' : 'text-slate-400'}`}>
                        {products.filter(p => p.category === category.name).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Price: <span className="text-indigo-600">Up to ${maxPrice}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Rating Filter (visual) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Customer Rating</label>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-slate-200'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">& up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-8' : 'space-y-5'}>
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    viewMode={viewMode}
                    onAddToCart={addItem}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-16 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full flex items-center justify-center mb-6 animate-bounce-subtle">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ProductCard({ product, index, viewMode, onAddToCart }: {
  product: any;
  index: number;
  viewMode: 'grid' | 'list';
  onAddToCart: (item: any) => void;
}) {
  const [hovered, setHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div
        className="card card-hover p-4 md:p-6 flex flex-col md:flex-row gap-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms both` }}
      >
        <div className="relative md:w-52 flex-shrink-0 overflow-hidden rounded-xl aspect-[4/3] md:aspect-square">
          <img
            src={product.images[hovered && product.images[1] ? 1 : 0]}
            alt={product.name}
            className="card-image absolute inset-0 w-full h-full object-cover"
          />
          {product.comparePrice && (
            <span className="badge bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] absolute top-3 left-3">
              -{Math.round((1 - product.price / product.comparePrice) * 100)}%
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-indigo-600">{product.storeName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">{product.category}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-500">{product.rating} ({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <span className="text-3xl font-bold text-slate-900">${product.price}</span>
              {product.comparePrice && (
                <span className="text-sm text-slate-400 line-through ml-2">${product.comparePrice}</span>
              )}
            </div>
            <button
              onClick={() => onAddToCart({ ...product, quantity: 1 })}
              className="btn btn-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card card-hover group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms both` }}
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

        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-indigo-50 hover:scale-110 transition-all">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

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
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 20 20">
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
              <span className="text-sm text-slate-400 line-through ml-2">${product.comparePrice}</span>
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
