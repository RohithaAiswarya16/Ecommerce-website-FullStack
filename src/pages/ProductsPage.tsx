import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/products/ProductGrid';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const initialCategory = searchParams.get('category');
  const initialQuery = searchParams.get('q') || '';
  const initialFilter = searchParams.get('filter');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string | null>(initialFilter);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      let query = supabase.from('products').select('*');
      
      // Apply category filter
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      // Apply search filter
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }
      
      // Apply special filters
      if (activeFilter) {
        switch (activeFilter) {
          case 'featured':
            query = query.eq('featured', true);
            break;
          case 'new':
            query = query.order('created_at', { ascending: false });
            break;
          case 'sale':
            // Add sale filter logic here if you have a sale field
            // query = query.eq('on_sale', true);
            break;
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data as Product[]);
      }
      
      setIsLoading(false);
    };
    
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .order('category');
      
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, searchQuery, activeFilter]);
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    // Update URL params
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL params
    if (searchQuery) {
      searchParams.set('q', searchQuery);
    } else {
      searchParams.delete('q');
    }
    
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setActiveFilter(null);
    setSearchParams({});
  };
  
  const hasActiveFilters = selectedCategory !== null || searchQuery !== '' || activeFilter !== null;
  
  const getFilterLabel = () => {
    switch (activeFilter) {
      case 'featured':
        return 'Featured Products';
      case 'new':
        return 'New Arrivals';
      case 'sale':
        return 'Sale Items';
      default:
        return '';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden w-full">
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              leftIcon={<SlidersHorizontal size={16} />}
            >
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Sidebar for desktop or when expanded on mobile */}
          <aside className={`w-full md:w-64 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-900 hover:text-blue-700 flex items-center"
                  >
                    Clear All <X size={14} className="ml-1" />
                  </button>
                )}
              </div>
              
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              
              {/* Price Filter would go here */}
              
              {/* Availability Filter would go here */}
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search size={18} className="text-gray-400" />}
                  fullWidth
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </form>
            </div>
            
            {/* Results info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {isLoading ? 'Loading products...' : (
                  <>
                    Showing {products.length} products
                    {selectedCategory && ` in ${selectedCategory}`}
                    {searchQuery && ` matching "${searchQuery}"`}
                    {activeFilter && ` - ${getFilterLabel()}`}
                  </>
                )}
              </p>
              
              {/* Sort options would go here */}
            </div>
            
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};