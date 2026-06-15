import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-ivory pt-32 lg:pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
            Our Frozen Selection
          </h1>
          <p className="text-slate text-lg max-w-2xl">
            Stock up on our restaurant-quality handmade dumplings. All packs contain 12 pieces unless stated otherwise.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCategory === category
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-slate hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-navy/5 border border-gray-100 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-navy">
                    {product.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-navy leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate mb-4 flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-display font-bold text-copper">
                      RM {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center hover:bg-copper hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No products found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
