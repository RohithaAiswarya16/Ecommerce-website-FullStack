import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { supabase } from '../lib/supabase';

interface Category {
  name: string;
  count: number;
  image: string;
}

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('category');
      
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        // Count products in each category
        const categoryCounts = data.reduce((acc: { [key: string]: number }, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        // Category images mapping
        const categoryImages: { [key: string]: string } = {
          'Electronics': 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg',
          'Clothing': 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
          'Home & Kitchen': 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg',
          'Beauty': 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
        };

        const formattedCategories = Object.entries(categoryCounts).map(([name, count]) => ({
          name,
          count,
          image: categoryImages[name] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
        }));

        setCategories(formattedCategories);
      }
      
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/2] rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Shop by Category</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-gray-600">{category.count} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};