import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import CartDrawer from './components/features/CartDrawer';

import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import SellerApplication from './pages/SellerApplication';
import OrderManagement from './pages/admin/OrderManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [lastOrder, setLastOrder] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'landing': return <Landing setCurrentPage={setCurrentPage} />;
      case 'catalog': return <Catalog />;
      case 'checkout': return <Checkout setCurrentPage={setCurrentPage} setLastOrder={setLastOrder} />;
      case 'confirmation': return <OrderConfirmation setCurrentPage={setCurrentPage} lastOrder={lastOrder} />;
      case 'track': return <TrackOrder />;
      case 'seller': return <SellerApplication />;
      case 'admin': return <OrderManagement />;
      default: return <Landing setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-ivory font-sans text-navy selection:bg-copper/20">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="flex-1 flex flex-col relative w-full pb-16 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer setCurrentPage={setCurrentPage} />
        <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CartDrawer setCurrentPage={setCurrentPage} />
      </div>
    </CartProvider>
  );
}

export default App;
