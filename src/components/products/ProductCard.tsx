import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cart';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-sm text-gray-500 mb-1">{product.category}</h3>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h2>
          <p className="text-gray-900 font-semibold mb-3">{formattedPrice}</p>
          
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            leftIcon={<ShoppingCart size={16} />}
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};