import { motion } from 'framer-motion';
import { CheckCircle, Package, Clock, ArrowRight } from 'lucide-react';

export default function OrderConfirmation({ setCurrentPage, lastOrder }) {
  if (!lastOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <p className="mb-4">No recent order found.</p>
        <button onClick={() => setCurrentPage('catalog')} className="text-copper underline">Go Order</button>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory pt-32 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-teal/10 text-center border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-teal" />
        </motion.div>
        
        <h1 className="text-3xl font-display font-bold text-navy mb-2">Order Confirmed!</h1>
        <p className="text-slate mb-8">
          Thank you, {lastOrder.customer}. Your dumplings are being prepared.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-center gap-3 text-navy">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5 text-copper" />
            </div>
            <div>
              <p className="text-sm text-slate">Order ID</p>
              <p className="font-mono font-bold">{lastOrder.orderId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-navy">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Clock className="w-5 h-5 text-copper" />
            </div>
            <div>
              <p className="text-sm text-slate">Estimated Delivery</p>
              <p className="font-bold">{lastOrder.deliveryTime}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setCurrentPage('track')}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition-colors shadow-lg flex justify-center items-center gap-2"
          >
            Track Order
          </button>
          <button
            onClick={() => setCurrentPage('landing')}
            className="w-full py-4 bg-white text-navy border-2 border-gray-100 rounded-xl font-bold hover:border-copper hover:text-copper transition-colors"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
