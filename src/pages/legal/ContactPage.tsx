import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="text-blue-900 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">support@buynest.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-blue-900 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                {/* <div className="flex items-start">
                  <MapPin className="text-blue-900 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">
                      123 Fashion Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Your name"
                  fullWidth
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  fullWidth
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  leftIcon={<MessageSquare size={18} />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">What are your business hours?</h3>
                <p className="text-gray-600">We're available Monday through Friday, 9:00 AM to 6:00 PM EST.</p>
              </div>
              <div>
                <h3 className="font-medium">How long does it take to get a response?</h3>
                <p className="text-gray-600">We typically respond to all inquiries within 24 business hours.</p>
              </div>
              <div>
                <h3 className="font-medium">Do you offer international support?</h3>
                <p className="text-gray-600">Yes, we provide support to customers worldwide in English.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};