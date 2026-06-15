import { useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown, ChevronDown, ChevronUp, Package, DollarSign, Truck, Star } from 'lucide-react';

import ordersData from '../../assets/orders.json';
import deliveryData from '../../assets/delivery.json';
import ratingsData from '../../assets/ratings.json';

function CountUpNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    prefix + Number(latest).toFixed(decimals) + suffix
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });
  const itemsPerPage = 20;

  // Join data using useMemo for performance
  const joinedData = useMemo(() => {
    // Create a map of delivery data for O(1) lookup
    const deliveryMap = new Map();
    deliveryData.forEach(d => {
      deliveryMap.set(d.orderId, d);
    });

    return ordersData.map(order => {
      const delivery = deliveryMap.get(order.orderId) || {};
      return {
        orderId: order.orderId,
        deliveryId: delivery.trackingId || 'N/A',
        orderDate: order.orderDate,
        deliveryTime: delivery.estimatedTime || 'N/A',
        status: order.status,
        orderItems: `Meal ${order.mealId.replace('meal_', '')} (x${order.quantity})`,
        amount: order.amount
      };
    });
  }, []);

  // Filter and Sort
  const filteredAndSortedData = useMemo(() => {
    let result = joinedData;

    if (statusFilter !== 'All') {
      result = result.filter(item => item.status === statusFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.orderId.toLowerCase().includes(lowerSearch) ||
        item.deliveryId.toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [joinedData, searchTerm, statusFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-teal/10 text-teal';
      case 'out_for_delivery': return 'bg-navy/10 text-navy';
      case 'cooking': return 'bg-copper/10 text-copper';
      case 'preparing': return 'bg-slate/10 text-slate';
      case 'received': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-navy mb-2">Order Management</h1>
          <p className="text-slate">View and manage all customer orders.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Orders', value: ordersData.length, icon: Package },
            { label: 'Total Revenue', value: ordersData.reduce((sum, o) => sum + o.amount, 0), prefix: 'RM ', decimals: 2, icon: DollarSign },
            { label: 'Active Deliveries', value: deliveryData.filter(d => d.status !== 'delivered').length, icon: Truck },
            { label: 'Average Rating', value: ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length, decimals: 1, suffix: ' / 5.0', icon: Star }
          ].map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div 
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy p-6 rounded-2xl shadow-xl shadow-navy/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-16 h-16 text-white" />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-300 text-sm font-medium mb-1">{kpi.label}</p>
                  <h3 className="text-3xl font-bold text-copper font-mono">
                    <CountUpNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} />
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-t-2xl shadow-sm border border-gray-200 border-b-0 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by Order ID or Delivery ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-200 text-navy py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="All">All Statuses</option>
              <option value="received">Received</option>
              <option value="preparing">Preparing</option>
              <option value="cooking">Cooking</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-b-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-slate uppercase font-medium border-b border-gray-200">
                <tr>
                  {['Order ID', 'Delivery ID', 'Order Date', 'Delivery Time', 'Items', 'Status'].map((header, idx) => {
                    const keys = ['orderId', 'deliveryId', 'orderDate', 'deliveryTime', 'orderItems', 'status'];
                    const sortKey = keys[idx];
                    return (
                      <th 
                        key={sortKey} 
                        className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort(sortKey)}
                      >
                        <div className="flex items-center gap-2">
                          {header}
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-navy">{item.orderId}</td>
                      <td className="px-6 py-4 font-mono text-slate">{item.deliveryId}</td>
                      <td className="px-6 py-4 text-slate">
                        {new Date(item.orderDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate">{item.deliveryTime}</td>
                      <td className="px-6 py-4 text-navy font-medium">{item.orderItems}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                          {formatStatus(item.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate">
                      No records found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white p-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-slate">
              Showing {filteredAndSortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg text-slate hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium px-4">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-gray-200 rounded-lg text-slate hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
