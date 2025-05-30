import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Truck, Clock, Globe, Package } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shipping & Delivery</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Truck className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Free Shipping</h2>
              </div>
              <p className="text-gray-600">
                Enjoy free standard shipping on all orders over $50 within the United States.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Fast Delivery</h2>
              </div>
              <p className="text-gray-600">
                Most orders are processed and shipped within 24-48 hours of purchase.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Globe className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">International Shipping</h2>
              </div>
              <p className="text-gray-600">
                We ship to most countries worldwide with competitive rates.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Package className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Order Tracking</h2>
              </div>
              <p className="text-gray-600">
                Track your package at any time with our real-time tracking system.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Delivery Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">Standard Shipping</td>
                      <td className="px-6 py-4">3-5 business days</td>
                      <td className="px-6 py-4">Free over $50 / $4.99</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Express Shipping</td>
                      <td className="px-6 py-4">2-3 business days</td>
                      <td className="px-6 py-4">$9.99</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Next Day Delivery</td>
                      <td className="px-6 py-4">1 business day</td>
                      <td className="px-6 py-4">$14.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  International shipping rates and delivery times vary by location. During checkout, you'll see the exact shipping cost and estimated delivery time for your country.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Canada: 5-7 business days</li>
                  <li>Europe: 7-10 business days</li>
                  <li>Asia Pacific: 10-14 business days</li>
                  <li>Rest of World: 14-21 business days</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  Please note the following restrictions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>We cannot ship to P.O. boxes</li>
                  <li>Some items may not be available for international shipping</li>
                  <li>Additional customs fees may apply for international orders</li>
                  <li>Certain countries may have import restrictions</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};