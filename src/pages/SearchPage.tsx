import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/products/ProductGrid';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchQuery}%`);
      
      if (error) {
        console.error('Error searching products:', error);
      } else {
        setProducts(data as Product[]);
      }
      
      setIsLoading(false);
    };

    fetchProducts();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchParams.set('q', searchQuery);
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Search Products</h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} className="text-gray-400" />}
                fullWidth
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </div>
          </form>
        </div>

        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {isLoading ? 'Searching...' : `Found ${products.length} results for "${searchQuery}"`}
            </p>
          </div>
        )}

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </Layout>
  );
};