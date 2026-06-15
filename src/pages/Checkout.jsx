import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, CheckCircle2, AlertCircle, ShieldCheck, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ordersData from '../assets/orders.json';
import deliveryData from '../assets/delivery.json';

export default function Checkout({ setCurrentPage, setLastOrder }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    college: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const colleges = [
    { value: 'KTF', label: 'Kolej Tun Fatimah (KTF)' },
    { value: 'K9', label: 'Kolej 9' },
    { value: 'K10', label: 'Kolej 10' },
    { value: 'KTR', label: 'Kolej Tun Razak (KTR)' },
    { value: 'KDSE', label: 'Kolej Datin Seri Endon (KDSE)' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory px-4 pt-32 lg:pt-40">
        <h2 className="text-2xl font-bold text-navy mb-4">Your cart is empty</h2>
        <button 
          onClick={() => setCurrentPage('catalog')}
          className="px-6 py-3 bg-copper text-white rounded-lg hover:bg-[#b86b4d]"
        >
          Go to Catalog
        </button>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.college) newErrors.college = 'College/Hostel selection is required';
    
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Valid 16-digit card number is required';
    }
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv.trim() || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Create mock order success for confirmation page
      const newOrder = {
        orderId: generatedId,
        items: [...cartItems],
        total: cartTotal + 5, // including delivery fee
        deliveryTime: '30-45 mins',
        customer: formData.name
      };
      
      // Mutate the mock databases directly so it shows up in Admin Panel and Tracking
      ordersData.unshift({
        orderId: generatedId,
        customerId: `cust_${Math.floor(100 + Math.random() * 900)}`,
        mealId: cartItems[0]?.id || "meal_001",
        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        amount: cartTotal + 5,
        status: "preparing",
        orderDate: new Date().toISOString()
      });

      deliveryData.unshift({
        trackingId: `track_${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: generatedId,
        deliveryAgentId: `agent_${Math.floor(10 + Math.random() * 90)}`,
        status: "preparing",
        estimatedTime: "30 mins"
      });
      
      setLastOrder(newOrder);
      clearCart();
      setCurrentPage('confirmation');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 lg:pt-40 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-navy mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Delivery Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6 text-navy">
                  <MapPin className="w-5 h-5 text-copper" />
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.name ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy focus:border-navy outline-none`} 
                      placeholder="John Doe" 
                    />
                    {errors.name && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.phone ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy outline-none`} 
                      placeholder="012-3456789" 
                    />
                    {errors.phone && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.phone}</p>}
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate mb-1">College / Hostel</label>
                    
                    {/* Background overlay for closing dropdown */}
                    {isCollegeOpen && (
                      <div className="fixed inset-0 z-10" onClick={() => setIsCollegeOpen(false)} />
                    )}
                    
                    <div 
                      onClick={() => setIsCollegeOpen(!isCollegeOpen)}
                      className={`relative z-20 w-full p-3 bg-gray-50 border ${errors.college ? 'border-copper' : 'border-gray-200'} rounded-lg cursor-pointer flex justify-between items-center hover:border-gray-300 transition-colors focus:ring-2 focus:ring-navy outline-none`}
                    >
                      <span className={formData.college ? 'text-navy' : 'text-slate opacity-70'}>
                        {formData.college ? colleges.find(c => c.value === formData.college)?.label : 'Select College'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate transition-transform duration-300 ${isCollegeOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {isCollegeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute z-30 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden origin-top"
                        >
                          {colleges.map(c => (
                            <div
                              key={c.value}
                              onClick={() => {
                                handleChange({ target: { name: 'college', value: c.value }});
                                setIsCollegeOpen(false);
                                if (errors.college) setErrors(prev => ({ ...prev, college: '' }));
                              }}
                              className={`p-3 cursor-pointer transition-colors ${
                                formData.college === c.value 
                                  ? 'bg-navy/5 text-navy font-medium' 
                                  : 'hover:bg-gray-50 text-slate hover:text-navy'
                              }`}
                            >
                              {c.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.college && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.college}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate mb-1">Detailed Address / Block / Room</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      className={`w-full p-3 bg-gray-50 border ${errors.address ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy outline-none`} 
                      placeholder="Block A, Room 101" 
                    />
                    {errors.address && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6 text-navy">
                  <CreditCard className="w-5 h-5 text-copper" />
                  <h2 className="text-xl font-bold">Payment Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="19"
                      className={`w-full p-3 bg-gray-50 border ${errors.cardNumber ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy outline-none font-mono`} 
                      placeholder="0000 0000 0000 0000" 
                    />
                    {errors.cardNumber && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        maxLength="5"
                        className={`w-full p-3 bg-gray-50 border ${errors.expiry ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy outline-none font-mono`} 
                        placeholder="MM/YY" 
                      />
                      {errors.expiry && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate mb-1">CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength="4"
                        className={`w-full p-3 bg-gray-50 border ${errors.cvv ? 'border-copper' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-navy outline-none font-mono`} 
                        placeholder="123" 
                      />
                      {errors.cvv && <p className="text-copper text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-navy mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate">
                      <span className="font-medium text-navy mr-2">{item.quantity}x</span>
                      {item.name}
                    </span>
                    <span className="font-medium text-navy">RM {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate">
                  <span>Subtotal</span>
                  <span>RM {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate">
                  <span>Delivery Fee</span>
                  <span>RM 5.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-navy pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-copper">RM {(cartTotal + 5).toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy/90 transition-colors shadow-lg shadow-navy/20 flex items-center justify-center gap-2"
              >
                Confirm & Pay
                <CheckCircle2 className="w-5 h-5" />
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate">
                <ShieldCheck className="w-4 h-4 text-teal" />
                Secure Mock Payment (Do not enter real details)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
