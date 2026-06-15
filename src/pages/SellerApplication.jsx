import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, TrendingUp, DollarSign, Clock, AlertCircle } from 'lucide-react';

export default function SellerApplication() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    university: 'UTM',
    email: '',
    whatsapp: '',
    college: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'Required';
    if (!formData.college) newErrors.college = 'Required';
    if (!formData.motivation.trim()) newErrors.motivation = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg text-center"
        >
          <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-teal" />
          </div>
          <h2 className="text-3xl font-display font-bold text-navy mb-4">Application Received!</h2>
          <p className="text-slate mb-8">
            Thank you for your interest in joining Hot Meal Bar. Our team will review your application and contact you via WhatsApp within 24 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-copper hover:text-navy font-medium underline"
          >
            Submit another application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Value Proposition */}
          <div className="lg:col-span-2 space-y-8 sticky top-24">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 text-copper font-medium text-sm mb-6">
                <Briefcase className="w-4 h-4" />
                Student Jobs
              </span>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-navy leading-tight mb-4">
                Become a Student Reseller
              </h1>
              <p className="text-lg text-slate">
                Join our network of UTM student sellers. Earn extra income by delivering premium frozen dumplings directly to student hostels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-copper">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Earn RM500+/month</h3>
                  <p className="text-slate text-sm mt-1">High commission margins on every pack you sell in your college block.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-copper">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Zero Upfront Cost</h3>
                  <p className="text-slate text-sm mt-1">No need to buy inventory first. Take orders, collect from Hot Meal Bar, then deliver.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-copper">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">24h Fast Approval</h3>
                  <p className="text-slate text-sm mt-1">Apply today and start selling by tomorrow after a quick verification.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-navy/5 border border-gray-100">
              <h2 className="text-2xl font-bold text-navy mb-8">Application Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Full Name</label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.fullName ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`} 
                    />
                    {errors.fullName && <p className="text-copper text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Student ID (Matric No.)</label>
                    <input 
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.studentId ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`} 
                    />
                    {errors.studentId && <p className="text-copper text-xs mt-1">{errors.studentId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">University</label>
                    <select 
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy outline-none text-navy"
                    >
                      <option value="UTM">Universiti Teknologi Malaysia (UTM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Target College/Hostel</label>
                    <select 
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.college ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`}
                    >
                      <option value="">Select College to Cover</option>
                      <option value="KTF">Kolej Tun Fatimah (KTF)</option>
                      <option value="K9">Kolej 9</option>
                      <option value="K10">Kolej 10</option>
                      <option value="KTR">Kolej Tun Razak (KTR)</option>
                      <option value="KDSE">Kolej Datin Seri Endon (KDSE)</option>
                    </select>
                    {errors.college && <p className="text-copper text-xs mt-1">{errors.college}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`} 
                    />
                    {errors.email && <p className="text-copper text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">WhatsApp Number</label>
                    <input 
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border ${errors.whatsapp ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`} 
                      placeholder="+60"
                    />
                    {errors.whatsapp && <p className="text-copper text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate mb-1">Why do you want to join us?</label>
                  <textarea 
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full p-3 bg-gray-50 border ${errors.motivation ? 'border-copper' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-navy outline-none`} 
                    placeholder="Tell us a bit about your experience or motivation..."
                  />
                  {errors.motivation && <p className="text-copper text-xs mt-1">{errors.motivation}</p>}
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-copper text-white rounded-xl font-bold text-lg hover:bg-[#b86b4d] transition-colors shadow-lg shadow-copper/20"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
