"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string;
}

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const contactInfo: ContactInfo[] = [
    { icon: <MapPin className="w-6 h-6" />, title: 'Address', details: '123 Blockchain Street, Tech City, 12345' },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', details: '+1 (555) 123-4567' },
    { icon: <Mail className="w-6 h-6" />, title: 'Email', details: 'contact@yourdapp.com' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 mr-3 text-indigo-600">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{info.title}</h3>
                        <p className="text-gray-600">{info.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/api/placeholder/600/400"
                    alt="Map placeholder"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default ContactPage;