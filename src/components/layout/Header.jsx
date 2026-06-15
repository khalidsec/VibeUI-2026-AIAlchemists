import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import logo from '../../assets/sponsor/HoteMeal_logo.jpeg';

export default function Header({ currentPage, setCurrentPage }) {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'catalog', label: 'Order Dumplings' },
    { id: 'track', label: 'Track Order' },
    { id: 'seller', label: 'Join as Seller' },
    { id: 'admin', label: 'Seller Panel' }
  ];

  const handleNav = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent py-5 md:py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          
          {/* Left Side: Brand Logo & Subtitle */}
          <div 
            className="flex items-center gap-6 cursor-pointer"
            onClick={() => setCurrentPage('landing')}
          >
            <img 
              src={logo} 
              alt="Hot Meal Bar" 
              className="h-10 md:h-12 w-auto object-contain rounded-sm"
            />

          </div>

          {/* Right Side: Dark Pill Container */}
          <div className="bg-[#1b263b] text-white rounded-full px-6 py-3 flex items-center gap-6 shadow-lg border border-white/10">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="hidden md:flex items-center gap-3 border border-white/30 rounded-full px-5 py-2 text-sm font-semibold hover:bg-white hover:text-navy transition-colors"
            >
              Explore our menu
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#d6fa3e] text-navy text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </button>

            <div className="w-px h-6 bg-white/20 mx-1 hidden md:block"></div>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="hover:opacity-70 transition-opacity flex flex-col gap-1.5 justify-center h-5 w-6"
            >
              <div className="w-full h-[1.5px] bg-white"></div>
              <div className="w-full h-[1.5px] bg-white"></div>
              <div className="w-full h-[1.5px] bg-white"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-navy text-ivory flex flex-col overflow-y-auto">
          <div className="max-w-[1400px] w-full mx-auto px-6 pt-8 flex justify-between items-center">
            <img 
              src={logo} 
              alt="Hot Meal Bar" 
              className="h-12 w-auto object-contain rounded-sm cursor-pointer"
              onClick={() => handleNav('landing')}
            />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-copper transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 max-w-[1400px] w-full mx-auto py-12 md:py-20">
            <nav className="flex flex-col gap-4 md:gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-3xl md:text-5xl font-display text-left hover:text-copper transition-colors ${
                    currentPage === item.id ? 'text-copper' : 'text-ivory'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-16 flex flex-col md:flex-row gap-10 opacity-60 text-xs md:text-sm uppercase tracking-[0.15em] font-medium">
              <div>
                <p className="text-copper mb-4">Location</p>
                <p className="leading-relaxed">KTF, UTM Alumni Area<br/>Johor Bahru, 81310</p>
              </div>
              <div>
                <p className="text-copper mb-4">Socials</p>
                <div className="flex flex-col gap-4">
                  <span className="hover:text-ivory cursor-pointer transition-colors">Instagram</span>
                  <span className="hover:text-ivory cursor-pointer transition-colors">Facebook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
