import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Shield className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Data Protection</h2>
              </div>
              <p className="text-gray-600">
                We use industry-standard security measures to protect your personal information.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Lock className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Secure Transactions</h2>
              </div>
              <p className="text-gray-600">
                All payment information is encrypted and processed securely.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Eye className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Transparency</h2>
              </div>
              <p className="text-gray-600">
                We're clear about how we collect, use, and protect your data.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <UserCheck className="text-blue-900 mr-3" size={24} />
                <h2 className="text-xl font-semibold">Your Control</h2>
              </div>
              <p className="text-gray-600">
                You have full control over your personal data and privacy preferences.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Name and contact information</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="space-y-4 text-gray-600">
                  <li>
                    <strong>Order Processing:</strong>
                    <p>To process and fulfill your orders, including shipping and customer service.</p>
                  </li>
                  <li>
                    <strong>Account Management:</strong>
                    <p>To create and manage your account, including authentication and password reset.</p>
                  </li>
                  <li>
                    <strong>Communication:</strong>
                    <p>To send order confirmations, shipping updates, and respond to your inquiries.</p>
                  </li>
                  <li>
                    <strong>Marketing:</strong>
                    <p>To send promotional offers and newsletters (with your consent).</p>
                  </li>
                  <li>
                    <strong>Website Improvement:</strong>
                    <p>To analyze website usage and improve our services.</p>
                  </li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>SSL encryption for all data transmission</li>
                  <li>Regular security assessments and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Employee training on data security</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="text-gray-600">
                  <p>Email: privacy@buynest.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};