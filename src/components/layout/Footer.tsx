import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Truck, Package, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Benefits Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center">
              <Truck className="mr-4 text-emerald-500" size={24} />
              <div>
                <h3 className="font-semibold text-white">Free Shipping</h3>
                <p className="text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <Package className="mr-4 text-emerald-500" size={24} />
              <div>
                <h3 className="font-semibold text-white">Easy Returns</h3>
                <p className="text-sm">30 day return policy</p>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="mr-4 text-emerald-500" size={24} />
              <div>
                <h3 className="font-semibold text-white">Secure Payments</h3>
                <p className="text-sm">Protected by encryption</p>
              </div>
            </div>
            <div className="flex items-center">
              <CreditCard className="mr-4 text-emerald-500" size={24} />
              <div>
                <h3 className="font-semibold text-white">Multiple Payment Options</h3>
                <p className="text-sm">All major cards accepted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">BuyNest</h2>
            <p className="mb-4">Your one-stop destination for quality products at affordable prices. We've been serving customers since 2025.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/products?filter=featured" className="hover:text-white transition-colors">Featured Items</Link></li>
              <li><Link to="/products?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?filter=sale" className="hover:text-white transition-colors">Sale Items</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-4">Stay updated with our latest offers and products.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} BuyNest. All rights reserved.</p>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <img src="src/images/visa.png" alt="Visa" className="h-6" />
              <img src="src/images/mc.png" alt="Mastercard" className="h-6" />
              <img src="src/images/paypal.png" alt="PayPal" className="h-6" />
              <img src="src/images/apple.png" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};