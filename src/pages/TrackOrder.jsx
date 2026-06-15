import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, ChefHat, Flame, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

import ordersData from '../assets/orders.json';
import deliveryData from '../assets/delivery.json';

const STEPS = [
  { id: 'received', label: 'Order Received', icon: Package },
  { id: 'preparing', label: 'Preparing Ingredients', icon: ChefHat },
  { id: 'cooking', label: 'Cooking', icon: Flame },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 }
];

export default function TrackOrder() {
  const [searchId, setSearchId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      let order = ordersData.find(o => o.orderId.toLowerCase() === searchId.toLowerCase());
      let delivery = null;

      if (!order) {
        // Try searching by tracking ID instead
        delivery = deliveryData.find(d => d.trackingId && d.trackingId.toLowerCase() === searchId.toLowerCase());
        if (delivery) {
          order = ordersData.find(o => o.orderId === delivery.orderId);
        }
      }

      if (!order) {
        setError('Order not found. Please check your Order ID or Tracking ID.');
        setTrackingInfo(null);
      } else {
        if (!delivery) {
          delivery = deliveryData.find(d => d.orderId === order.orderId);
        }
        setTrackingInfo({
          ...order,
          deliveryInfo: delivery || null
        });
      }
      setIsSearching(false);
    }, 800);
  };

  const getStepIndex = (status) => {
    const index = STEPS.findIndex(s => s.id === status);
    return index >= 0 ? index : 0;
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 lg:pt-40 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-navy mb-4">Track Your Order</h1>
          <p className="text-slate">Enter your Order ID to see real-time updates.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. ord_0001 or track_0001"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy/90 transition-colors disabled:opacity-70"
            >
              {isSearching ? 'Searching...' : 'Track'}
            </button>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-copper text-sm mt-3 flex items-center justify-center gap-1"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.p>
          )}
        </div>

        {/* Tracking Results */}
        <AnimatePresence mode="wait">
          {trackingInfo && (
            <motion.div
              key="tracking-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-gray-100 overflow-hidden"
            >
              <div className="bg-navy p-6 text-white flex justify-between items-center">
                <div>
                  <p className="text-slate-300 text-sm mb-1">Order Details</p>
                  <h3 className="font-mono font-bold text-xl">{trackingInfo.orderId}</h3>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm mb-1">Amount</p>
                  <h3 className="font-bold text-xl text-copper">RM {trackingInfo.amount.toFixed(2)}</h3>
                </div>
              </div>

              <div className="p-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />
                  
                  <div className="space-y-8 relative">
                    {STEPS.map((step, index) => {
                      const currentStepIndex = getStepIndex(trackingInfo.status);
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const Icon = step.icon;

                      return (
                        <motion.div 
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 }}
                          className="flex gap-6 items-start"
                        >
                          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500
                            ${isCompleted ? 'bg-teal text-white' : 'bg-gray-100 text-slate'}
                            ${isCurrent ? 'ring-4 ring-teal/20 scale-110' : ''}
                          `}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="pt-2">
                            <h4 className={`font-bold ${isCurrent ? 'text-navy text-lg' : isCompleted ? 'text-navy' : 'text-slate'}`}>
                              {step.label}
                            </h4>
                            {isCurrent && index < STEPS.length - 1 && (
                              <p className="text-sm text-slate mt-1">
                                Currently in progress...
                              </p>
                            )}
                            {isCurrent && step.id === 'out_for_delivery' && trackingInfo.deliveryInfo && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-sm font-medium text-navy">Driver: {trackingInfo.deliveryInfo.driverName}</p>
                                <p className="text-sm text-slate">Contact: {trackingInfo.deliveryInfo.driverPhone}</p>
                                <p className="text-sm text-slate mt-1">Est. Time: {trackingInfo.deliveryInfo.estimatedTime}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
