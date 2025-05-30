import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      // Featured products
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(4);
      
      if (featuredError) {
        console.error('Error fetching featured products:', featuredError);
      } else {
        setFeaturedProducts(featured as Product[]);
      }
      
      // New arrivals
      const { data: newProducts, error: newError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      
      if (newError) {
        console.error('Error fetching new products:', newError);
      } else {
        setNewArrivals(newProducts as Product[]);
      }
      
      setIsLoading(false);
    };
    
    fetchProducts();
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="text-xl mb-8">
              Shop the latest trends with free shipping on orders over $50
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link to="/products?filter=featured" className="text-blue-900 hover:text-blue-700 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} isLoading={isLoading} />
      </section>
      
      {/* Categories Banner */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty'].map((category) => (
              <Link 
                to={`/categories/${category.toLowerCase()}`} 
                key={category}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </div>
                </div>
                <div className="p-4 bg-blue-900 text-white group-hover:bg-blue-800 transition-colors">
                  <span className="flex items-center justify-between">
                    <span>Shop Now</span>
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <Link to="/products?filter=new" className="text-blue-900 hover:text-blue-700 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <ProductGrid products={newArrivals} isLoading={isLoading} />
      </section>
      
      {/* Newsletter */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-blue-900 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Stay updated with our latest products, exclusive offers, and promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};