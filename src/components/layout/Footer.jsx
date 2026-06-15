import logo from '../../assets/sponsor/HoteMeal_logo.jpeg';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-navy text-ivory pt-32 pb-12 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-6 flex flex-col">
            <h2 className="font-display text-[5rem] md:text-[7rem] leading-[0.9] tracking-tight mb-8">
              Hot Meal Bar<span className="text-copper text-3xl align-top">®</span>
            </h2>
            <p className="max-w-sm opacity-60 text-lg">
              Premium frozen dumplings from the authentic Chinese Muslim restaurant at KTF, UTM Alumni area.
            </p>
          </div>
          
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pt-6">
            <div>
              <p className="font-semibold text-xs uppercase tracking-[0.15em] text-copper mb-8">Navigation</p>
              <ul className="space-y-4 opacity-70">
                <li><button onClick={() => setCurrentPage('landing')} className="hover:text-copper transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('catalog')} className="hover:text-copper transition-colors">Order Now</button></li>
                <li><button onClick={() => setCurrentPage('track')} className="hover:text-copper transition-colors">Track Order</button></li>
              </ul>
            </div>
            
            <div>
              <p className="font-semibold text-xs uppercase tracking-[0.15em] text-copper mb-8">Partners</p>
              <ul className="space-y-4 opacity-70">
                <li><button onClick={() => setCurrentPage('seller')} className="hover:text-copper transition-colors">Join as Seller</button></li>
                <li><button onClick={() => setCurrentPage('admin')} className="hover:text-copper transition-colors">Seller Portal</button></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-xs uppercase tracking-[0.15em] text-copper mb-8">Location</p>
              <p className="opacity-70 leading-relaxed text-sm">
                KTF, UTM Alumni Area<br/>
                Johor Bahru, 81310<br/>
                Malaysia
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ivory/10 text-xs uppercase tracking-wider opacity-50 pb-16 md:pb-0">
          <p>&copy; 2026 Hot Meal Bar. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <span className="hover:text-copper cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-copper cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-copper cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
