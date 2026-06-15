import { Home, Search, ShoppingBag, MapPin, LayoutDashboard } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function MobileNav({ currentPage, setCurrentPage }) {
  const { cartCount, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'landing', icon: Home, label: 'Home' },
    { id: 'catalog', icon: Search, label: 'Order' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', isAction: true },
    { id: 'track', icon: MapPin, label: 'Track' },
    { id: 'admin', icon: LayoutDashboard, label: 'Panel' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center justify-center w-full h-full text-slate hover:text-copper transition-colors"
              >
                <div className="relative">
                  <Icon className="w-6 h-6 mb-1" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-copper rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-copper' : 'text-slate hover:text-navy'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
