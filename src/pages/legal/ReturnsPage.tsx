import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { RefreshCw, Package, Clock, CheckCircle } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Returns & Exchanges</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <RefreshCw className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Easy Returns</h2>
              </div>
              <p className="text-gray-600">
                Return any item within 30 days of delivery for a full refund.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Package className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Free Returns</h2>
              </div>
              <p className="text-gray-600">
                We provide free return shipping labels for all domestic orders.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Quick Processing</h2>
              </div>
              <p className="text-gray-600">
                Refunds are typically processed within 3-5 business days of receipt.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Quality Guarantee</h2>
              </div>
              <p className="text-gray-600">
                Not satisfied? We'll make it right or give you your money back.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Items must be unused and in original packaging</li>
                  <li>All tags and labels must be attached</li>
                  <li>Include the original receipt or order number</li>
                  <li>Items on sale or marked as final sale may not be returnable</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center bg-blue-900 text-white rounded-full w-6 h-6 mt-0.5 mr-3 flex-shrink-0">1</span>
                    <div>
                      <h3 className="font-medium">Initiate Your Return</h3>
                      <p className="text-gray-600">Log into your account and select the order containing the item(s) you wish to return.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center bg-blue-900 text-white rounded-full w-6 h-6 mt-0.5 mr-3 flex-shrink-0">2</span>
                    <div>
                      <h3 className="font-medium">Print Return Label</h3>
                      <p className="text-gray-600">Print the prepaid return shipping label provided in your return confirmation email.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center bg-blue-900 text-white rounded-full w-6 h-6 mt-0.5 mr-3 flex-shrink-0">3</span>
                    <div>
                      <h3 className="font-medium">Package Your Return</h3>
                      <p className="text-gray-600">Securely package your items in their original packaging if possible.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center bg-blue-900 text-white rounded-full w-6 h-6 mt-0.5 mr-3 flex-shrink-0">4</span>
                    <div>
                      <h3 className="font-medium">Ship Your Return</h3>
                      <p className="text-gray-600">Drop off your package at any authorized shipping location.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  Need a different size or color? We recommend returning your item for a refund and placing a new order to ensure you get the item you want before it sells out.
                </p>
                <p className="text-gray-600">
                  If you need assistance with an exchange, our customer service team is happy to help.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Refunds will be issued to the original payment method</li>
                  <li>Processing time is typically 3-5 business days after we receive your return</li>
                  <li>Shipping costs are non-refundable unless the item was defective or we made a mistake</li>
                  <li>You will receive an email confirmation when your refund is processed</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};