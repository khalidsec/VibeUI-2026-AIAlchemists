import { motion } from 'framer-motion';
import { ArrowRight, Snowflake, Truck, ShieldCheck, Quote, Star, Plus, Utensils, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import heroVideo from '../assets/sponsor/Dump2.mp4';

const testimonials = [
  { id: 1, text: "The quality is unbelievable. It literally tastes better than most restaurants, and I just heated it in my hostel room.", author: "Ahmad Z.", role: "Engineering Student", rating: 5 },
  { id: 2, text: "Lifesaver during exam week. The spicy beef dumplings are my absolute favorite.", author: "Sarah L.", role: "Architecture", rating: 5 },
  { id: 3, text: "Flash frozen perfection. They don't stick together and cook perfectly every time.", author: "Mohd F.", role: "Postgrad", rating: 5 }
];

const blogPosts = [
  { id: 1, title: "The Art of the Perfect Fold", date: "Oct 12, 2026", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=800", category: "Craftsmanship" },
  { id: 2, title: "Why Flash Freezing Matters", date: "Sep 28, 2026", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800", category: "Quality" },
  { id: 3, title: "Quick Hostel Meals", date: "Sep 15, 2026", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800", category: "Tips & Tricks" }
];

const brands = ["Premium Quality", "Halal Certified", "Handcrafted", "Locally Sourced"];

export default function Landing({ setCurrentPage }) {
  const showcaseProducts = products.filter(p => p.popular).slice(0, 3);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full font-sans text-[15px] leading-[1.6]">

      {/* 1. Hero Section (Cream, 2-column split) */}
      <section className="bg-ivory text-navy pt-24 lg:pt-0 lg:min-h-screen flex items-center relative">
        <div className="max-w-[1400px] w-full mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch z-10 min-h-[100vh] lg:h-auto">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-xl pt-32 pb-16 lg:pt-40 lg:pb-16 flex flex-col h-full justify-between">
            <div className="flex-1 flex flex-col justify-center items-start">

            <h1 className="font-display font-normal text-[2.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.9] mb-8 tracking-[-0.03em] whitespace-nowrap">
              <div className="flex flex-nowrap items-center gap-x-3 sm:gap-x-4 md:gap-x-6">
                <span>Where</span>
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[80px] h-[48px] sm:w-[120px] sm:h-[64px] md:w-[150px] md:h-[76px] rounded-full overflow-hidden shadow-lg inline-block relative -mt-1 sm:-mt-2 md:-mt-4"
                >
                  <img
                    src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=400&auto=format&fit=crop"
                    alt="Dumplings"
                    className="w-full h-full object-cover scale-110"
                  />
                </motion.div>
              </div>
              <div className="mt-2 md:mt-4">every dish</div>
              <div className="mt-2 md:mt-4">tells a story</div>
            </h1>
            <p className="text-lg opacity-70 mb-12 max-w-lg">
              Restaurant-quality Chinese Muslim recipes. Stock up your freezer with premium ingredients, hand-folded daily and ready in minutes.
            </p>
            <button
              onClick={() => setCurrentPage('catalog')}
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-navy text-ivory hover:bg-copper transition-colors"
            >
              <span className="uppercase tracking-[0.1em] text-xs font-bold">Explore our menu</span>
              <div className="w-1.5 h-1.5 bg-ivory rounded-full" />
            </button>
            </div>


          </motion.div>

          {/* Spacer for Desktop Grid */}
          <div className="hidden lg:block w-full h-full"></div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[400px] lg:absolute lg:top-4 lg:right-4 lg:w-[calc(50vw-16px)] lg:h-[calc(100vh-32px)] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-2xl shadow-navy/5 border border-navy/5 z-0"
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Trusted by Clients Cutout */}
            <div className="absolute bottom-0 left-0 bg-ivory rounded-tr-[32px] pr-6 md:pr-8 pt-5 md:pt-6 flex items-center gap-4 md:gap-6 z-10">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-ivory object-cover" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-ivory object-cover" />
                <img src="https://i.pravatar.cc/100?img=13" alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-ivory object-cover" />
              </div>
              <div className="pb-1">
                <div className="flex gap-1 text-navy mb-1.5">
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-navy/70">Trusted by clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro Philosophy (Cream) */}
      <section className="bg-ivory text-navy py-32 border-t border-navy/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="font-display text-[2.5rem] md:text-[3.5rem] leading-[1.2] mb-16 max-w-4xl mx-auto flex flex-col items-center justify-center">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              <span>For over a</span>
              <div className="w-[80px] h-[45px] md:w-[100px] md:h-[55px] rounded-[12px] overflow-hidden shadow-md inline-block relative -mt-1 md:-mt-2">
                <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=200&auto=format&fit=crop" alt="Dumplings" className="w-full h-full object-cover" />
              </div>
              <span>decade,</span>
            </div>
            <div>
              <span>Hot Meal Bar has redefined fine</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-navy/60">
              <span>dining</span>
              <div className="w-[80px] h-[45px] md:w-[100px] md:h-[55px] rounded-[12px] overflow-hidden shadow-md inline-block relative -mt-1 md:-mt-2">
                <img src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=200&auto=format&fit=crop" alt="Preparation" className="w-full h-full object-cover" />
              </div>
              <span>through</span>
            </div>
            <div className="text-navy/60">
              <span>Craftsmanship, passion, and</span>
            </div>
            <div className="text-navy/60">
              <span>a love for timeless flavor.</span>
            </div>
          </motion.h2>

          {/* Vertical Divider Line */}
          <motion.div initial={{ height: 0 }} whileInView={{ height: 96 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut" }} className="w-px bg-navy/15 mx-auto mb-20"></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[800px] mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-6 text-navy">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="font-medium text-lg">Halal Certified</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-6 text-navy">
                <Snowflake className="w-6 h-6" />
              </div>
              <p className="font-medium text-lg">Flash Frozen</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-6 text-navy">
                <Truck className="w-6 h-6" />
              </div>
              <p className="font-medium text-lg">Campus Delivery</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Culinary Showcase (Cream, 3-column grid) */}
      <section className="bg-ivory text-navy py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-8 snap-x">
            {showcaseProducts.map((product, idx) => (
              <div key={product.id} className="min-w-[85vw] md:min-w-0 snap-start group cursor-pointer flex flex-col" onClick={() => setCurrentPage('catalog')}>
                <div className="relative aspect-[4/5] w-full bg-navy/5 rounded-[24px] overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Top Right Price Tab with Inverse Border Radius */}
                  <div className="absolute top-0 right-0 bg-ivory rounded-bl-[24px] pl-6 pb-6 pt-0 pr-0 z-10 flex items-center justify-center">
                    <span className="font-sans font-bold text-[#1a3630] text-lg mt-4 mr-6">RM {product.price.toFixed(0)}</span>
                    {/* Inverse corner top-left */}
                    <div className="absolute top-0 -left-6 w-6 h-6 bg-transparent rounded-tr-[24px] shadow-[12px_-12px_0_12px_#f8f5f2] pointer-events-none"></div>
                    {/* Inverse corner bottom-right */}
                    <div className="absolute -bottom-6 right-0 w-6 h-6 bg-transparent rounded-tr-[24px] shadow-[12px_-12px_0_12px_#f8f5f2] pointer-events-none"></div>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-[#1a3630] text-[18px] md:text-[20px] mb-3 px-2">{product.name}</h3>
                <p className="opacity-70 text-[14px] leading-relaxed px-2 line-clamp-2">{product.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Marquee (Navy) */}
      <section className="bg-navy text-ivory py-16 overflow-hidden border-y border-ivory/10">
        <div className="flex w-max relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-16 px-8"
          >
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <span key={idx} className="text-[2.5rem] font-display uppercase tracking-[0.05em] flex items-center gap-16">
                {brand}
                <span className="text-copper text-2xl">*</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Our Culinary Philosophy (Cream, 3-column) */}
      <section className="bg-ivory text-navy py-32 border-t border-navy/5">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
            <p className="uppercase tracking-[0.1em] text-[11px] font-bold text-copper mb-6">
              Our Culinary Philosophy
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-[4rem] leading-[1.05] mb-8 tracking-[-0.02em] text-navy">
              Crafted with Precision,<br />Inspired by Nature's
            </h2>
            <p className="opacity-90 text-[14px] leading-relaxed max-w-sm">
              We believe fine dining is more than just food. It's an experience that connects people, culture, and creativity. Our philosophy is rooted in balance between innovation and tradition.
            </p>
          </motion.div>

          {/* Middle Column: Tall Image */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
            <div className="w-full aspect-[3/4] md:h-[600px] rounded-[32px] overflow-hidden shadow-xl shadow-navy/5">
              <img 
                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop" 
                alt="Hand-folded dumplings preparation" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Two Cards */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4 flex flex-col gap-6 h-full justify-center">
            
            {/* Quote Card */}
            <div className="bg-white rounded-[32px] p-10 md:p-12 relative mt-4 md:mt-0 shadow-lg shadow-navy/5">
              <p className="text-[20px] md:text-[22px] font-medium leading-[1.4] mb-12">
                Cooking is not chemistry.<br/>It's an art that expresses emotion.
              </p>
              <div>
                <p className="font-bold text-[13px] text-navy">Chef Antoine Delmare,</p>
                <p className="text-[12px] opacity-70 mt-1">Verified Buyer</p>
              </div>
              
              {/* Overlapping Avatar */}
              <div className="absolute -left-6 bottom-8 w-14 h-14 rounded-full border-[3px] border-ivory overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Sub-philosophy Card */}
            <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-lg shadow-navy/5">
              <h3 className="text-[22px] font-medium mb-4">Inspired by tradition</h3>
              <p className="text-[14px] opacity-80 leading-relaxed">
                Each plate that leaves our kitchen is a reflection of our devotion to craft
              </p>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 6. Reserve Table (Image background, Dark) */}
      <section 
        className="relative text-ivory py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop")' }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#111815]/80"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
          
          {/* Left Text */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl">
            <p className="uppercase tracking-[0.1em] text-[11px] font-bold text-copper mb-6">
              RESERVE YOUR TABLE
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-[4rem] leading-[1.05] mb-8 text-[#e8e4d8]">
              Your seat awaits.<br/>Reserve a memorable dining experience
            </h2>
            <p className="opacity-80 text-[15px] mb-8 max-w-sm text-[#e8e4d8] leading-relaxed">
              Prefer dining at home? Enjoy our signature dishes delivered fresh to your door.
            </p>
            <button onClick={() => setCurrentPage('catalog')} className="flex items-center gap-2 text-[12px] font-bold tracking-[0.05em] uppercase hover:text-copper transition-colors border-b border-ivory/30 pb-1 w-max">
              ORDER ONLINE <Utensils className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
          
          {/* Right Form Card */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-white text-navy p-10 md:p-14 rounded-[32px] shadow-2xl">
            <h3 className="font-medium text-[28px] mb-10">Reserve your table</h3>
            
            <div className="flex flex-col gap-8">
              {/* Name */}
              <input 
                type="text" 
                placeholder="Full name *" 
                className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] placeholder-navy/70 focus:outline-none focus:border-navy transition-colors" 
              />
              
              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input 
                  type="email" 
                  placeholder="Email *" 
                  className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] placeholder-navy/70 focus:outline-none focus:border-navy transition-colors" 
                />
                <input 
                  type="text" 
                  placeholder="Phone number *" 
                  className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] placeholder-navy/70 focus:outline-none focus:border-navy transition-colors" 
                />
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  placeholder="Date *" 
                  className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] placeholder-navy/70 focus:outline-none focus:border-navy transition-colors" 
                />
                <div className="relative">
                  <select defaultValue="" className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] text-navy/70 appearance-none focus:outline-none cursor-pointer">
                    <option value="" disabled>Guests *</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4+ People</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-0 top-0 text-navy/70 pointer-events-none" />
                </div>
              </div>

              {/* Notes */}
              <input 
                type="text" 
                placeholder="Notes *" 
                className="w-full border-b border-navy/20 bg-transparent pb-2 text-[14px] placeholder-navy/70 focus:outline-none focus:border-navy transition-colors mt-2" 
              />

              {/* Submit Button */}
              <button 
                onClick={() => alert('Reservation submitted!')} 
                className="mt-6 bg-navy text-ivory px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-copper transition-colors w-max"
              >
                Reserve Now
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. Feedback / Testimonials Grid (Cream) */}
      <section className="bg-ivory py-32 overflow-hidden border-t border-navy/5">
        
        {/* Horizontal scroll container */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-6 lg:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
          
          {/* Decorative Sliver on Left */}
          <div className="hidden lg:block w-[100px] h-[500px] flex-shrink-0 rounded-[24px] overflow-hidden shadow-lg shadow-navy/5 snap-center ml-[-120px]">
             <img src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=800&auto=format&fit=crop" alt="Food details" className="w-full h-full object-cover" />
          </div>

          {/* Column 1: Tall Image */}
          <div className="w-[280px] md:w-[320px] h-[400px] md:h-[500px] flex-shrink-0 snap-center rounded-[24px] overflow-hidden shadow-lg shadow-navy/5">
            <img src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop" alt="Noodles" className="w-full h-full object-cover" />
          </div>

          {/* Column 2: Stacked Cards */}
          <div className="w-[280px] md:w-[320px] h-[400px] md:h-[500px] flex-shrink-0 snap-center flex flex-col gap-4 md:gap-6">
            
            {/* Top Review */}
            <div className="bg-navy text-ivory flex-1 rounded-[24px] p-8 flex flex-col relative shadow-lg shadow-navy/5">
              <div className="flex gap-1 mb-6 mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />)}
              </div>
              <p className="text-[17px] leading-[1.5] opacity-90 mb-auto">
                Every dish felt like a piece of art. The flavors, the presentation, the service — perfection
              </p>
              <p className="text-[12px] opacity-70 mt-6 font-medium">Farzana Rahman</p>
              {/* Quote marks aesthetic */}
              <div className="absolute top-8 left-8 flex gap-1 opacity-20">
                <div className="w-2 h-4 bg-white -skew-x-12"></div>
                <div className="w-2 h-4 bg-white -skew-x-12"></div>
              </div>
            </div>

            {/* Bottom Rating */}
            <div className="bg-copper text-white h-[160px] md:h-[180px] rounded-[24px] p-8 flex flex-col justify-center shadow-lg shadow-navy/5">
              <p className="font-display text-[4rem] leading-none mb-3">4.5</p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-white fill-white" />)}
              </div>
              <p className="text-[12px] opacity-90">Based on 567 review</p>
            </div>

          </div>

          {/* Column 3: Tall Review */}
          <div className="w-[280px] md:w-[320px] h-[400px] md:h-[500px] flex-shrink-0 snap-center bg-navy text-ivory rounded-[24px] p-8 md:p-10 flex flex-col relative shadow-lg shadow-navy/5">
            <div className="flex gap-1 mb-8 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />)}
            </div>
            <p className="text-[18px] md:text-[20px] leading-[1.6] opacity-90 mb-auto">
              Dining at Elara is more than just enjoying exquisite food — it's a journey of taste, texture, and emotion. Every plate feels like a work of art, and every moment is curated with genuine care & passion
            </p>
            <p className="text-[12px] opacity-70 mt-6 font-medium">Nadia & Arif Hasan</p>
            {/* Quote marks aesthetic */}
            <div className="absolute top-10 left-10 flex gap-1 opacity-20">
              <div className="w-2 h-4 bg-white -skew-x-12"></div>
              <div className="w-2 h-4 bg-white -skew-x-12"></div>
            </div>
          </div>

          {/* Column 4: Tall Image */}
          <div className="w-[280px] md:w-[320px] h-[400px] md:h-[500px] flex-shrink-0 snap-center rounded-[24px] overflow-hidden shadow-lg shadow-navy/5">
            <img src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=800&auto=format&fit=crop" alt="Premium Dumplings" className="w-full h-full object-cover" />
          </div>
          
          {/* Extra Card for scrolling padding */}
          <div className="w-[20px] flex-shrink-0"></div>

        </div>

        {/* Global style for hiding scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}} />
      </section>

      {/* 8. Blog Layout (Cream, 3-column) */}
      <section className="bg-ivory text-navy py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex justify-between items-end mb-16">
            <div>
              <p className="uppercase tracking-[0.15em] text-xs font-semibold text-copper mb-4">
                Insights
              </p>
              <h2 className="font-display text-5xl">Stories from our kitchen</h2>
            </div>
            <button className="hidden md:block border-b border-navy pb-1 text-sm font-medium hover:text-copper hover:border-copper transition-colors">
              View all stories
            </button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.div key={post.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={idx} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-[16px] overflow-hidden mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-4 opacity-60">
                  <span className="text-copper">{post.category}</span>
                  <span className="w-1 h-1 bg-navy/30 rounded-full" />
                  <span>{post.date}</span>
                </div>
                <h3 className="font-display text-2xl leading-[1.3] group-hover:text-copper transition-colors">{post.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
