import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About Buy Nest</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Welcome to <span className="font-semibold text-yellow-200">Buy Nest</span>, your one-stop shop for quality products that make life better. At Buy Nest, we’re passionate about curating a wide range of items, from home essentials to unique finds, all designed to bring comfort and joy to your everyday.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-gray-600 mb-2">
              Buy Nest was born from a simple idea: to create a shopping experience that feels personal, reliable, and meaningful. We wanted to build a digital “nest” where customers could discover high-quality products with ease and confidence.
            </p>
            <p className="text-gray-600 mb-4">
              From humble beginnings, Buy Nest has grown into a trusted name in e-commerce, serving customers worldwide. Our journey is driven by a passion for quality, sustainability, and community. Every product we offer is carefully selected to meet our high standards, ensuring it brings value and joy to our customers.
            </p>
            <p className='text-yellow-800'>
            Buy Nest is more than a store—it’s a community built on trust and quality. <br/>Thank you for being part of our story.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">We never compromise on quality, ensuring each item meets our high standards.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Trust</h3>
                <p className="text-gray-600">Building lasting relationships through transparency and reliability.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to get your fashion to you faster.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always here to help with any questions or concerns.</p>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </Layout>
  );
};