
import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-900 text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Company Logo Space */}
            <div className="bg-white p-3 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-600 font-bold text-lg">
                JBS
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Jaffer Business System
              </h1>
              <p className="text-blue-200 text-lg">
                OKR Management Platform - Objectives, Key Results & SMART Goals
              </p>
            </div>
          </div>
          {/* Random decorative image */}
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop&crop=center" 
              alt="Business workspace" 
              className="w-48 h-28 object-cover rounded-lg shadow-lg opacity-80"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
