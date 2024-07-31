"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission' },
    { id: 'work', label: 'What We Do' },
    { id: 'team', label: 'Our Team' },
  ];

  const content:any = {
    mission: "We are dedicated to connecting unskilled and unorganized migrant workers with job providers through blockchain technology. Our goal is to eliminate exploitation by middlemen and empower workers to build their experience and climb the social ladder.",
    work: (
      <ul className="list-disc list-inside text-gray-600">
        <li>Provide a decentralized platform for job listings and applications</li>
        <li>Enable direct connections between workers and job providers</li>
        <li>Build verifiable job history and rating mechanisms for laborers</li>
        <li>Offer a transparent and secure job application process</li>
      </ul>
    ),
    team: "Our team consists of passionate individuals dedicated to making a positive impact in the lives of migrant workers. We combine expertise in blockchain technology, web development, and social impact to create innovative solutions.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-brx from-blue-100 to-indigo-200 bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 text-center">
          About Us
        </h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <div className="text-gray-600">
              {content[activeTab]}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">Ready to make a difference?</h3>
          <Link href={"/contact"}>
          <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-600 transition-colors duration-200">
            Join Our Mission
          </button>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AboutPage;