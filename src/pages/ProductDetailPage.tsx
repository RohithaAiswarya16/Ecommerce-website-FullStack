import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Truck, Package, CreditCard, ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Product } from '../types';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addItem } = useCartStore();
  
  // Mock images array (in a real app, these would come from the database)
  const productImages = [
    product?.image_url,
    'https://images.pexels.com/photos/5650045/pexels-photo-5650045.jpeg',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg'
  ].filter(Boolean) as string[];
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data as Product);
        
        // Fetch related products in the same category
        const { data: related, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .limit(4);
        
        if (relatedError) {
          console.error('Error fetching related products:', relatedError);
        } else {
          setRelatedProducts(related as Product[]);
        }
      }
      
      setIsLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-900">Home</Link>
            </li>
            <li><ChevronRight size={14} className="text-gray-400" /></li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-blue-900">Products</Link>
            </li>
            <li><ChevronRight size={14} className="text-gray-400" /></li>
            <li>
              <Link 
                to={`/categories/${product.category.toLowerCase()}`} 
                className="text-gray-500 hover:text-blue-900"
              >
                {product.category}
              </Link>
            </li>
            <li><ChevronRight size={14} className="text-gray-400" /></li>
            <li className="text-gray-700 font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={productImages[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index ? 'border-blue-900' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">{product.category}</p>
              
              <p className="text-2xl font-bold text-gray-900 mb-6">{formattedPrice}</p>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="flex items-center mb-2">
                  <span className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm">
                    {product.stock > 0 
                      ? `In Stock (${product.stock} available)` 
                      : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex w-32 h-10">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="flex-1 text-center border-y border-gray-300 w-full py-2"
                  />
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  leftIcon={<ShoppingCart size={20} />}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Heart size={20} />}
                >
                  Wishlist
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-4">
                  <div className="flex">
                    <Truck className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium">Free Shipping</p>
                      <p className="text-sm text-gray-500">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Package className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium">Easy Returns</p>
                      <p className="text-sm text-gray-500">30 day return policy</p>
                    </div>
                  </div>
                  <div className="flex">
                    <CreditCard className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium">Secure Payments</p>
                      <p className="text-sm text-gray-500">All major cards accepted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-1">{relatedProduct.name}</h3>
                      <p className="font-semibold mt-2">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(relatedProduct.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};