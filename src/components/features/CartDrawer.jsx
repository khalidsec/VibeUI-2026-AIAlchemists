import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ setCurrentPage }) {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-display font-semibold text-navy flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-copper" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate hover:text-copper transition-colors bg-gray-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg mb-6">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentPage('catalog');
                    }}
                    className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 font-medium"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-navy leading-tight">{item.name}</h3>
                          <p className="text-copper font-medium mt-1">RM {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-slate hover:text-copper transition"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-slate hover:text-teal transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-slate hover:text-copper underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate font-medium text-lg">Total</span>
                  <span className="text-2xl font-display font-bold text-navy">
                    RM {cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-copper text-white rounded-xl font-semibold text-lg hover:bg-[#b86b4d] transition-colors shadow-lg shadow-copper/20 flex justify-center items-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
