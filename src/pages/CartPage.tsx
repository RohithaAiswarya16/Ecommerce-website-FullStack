import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, AlertCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(getTotalPrice());
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" /> Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.productId} className="py-6 flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between mb-2">
                          <Link 
                            to={`/products/${item.productId}`}
                            className="text-lg font-semibold hover:text-blue-900"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-4">{item.product.category}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="mr-2">Qty:</span>
                            <div className="flex border border-gray-300 rounded">
                              <button
                                className="px-2 py-1 border-r border-gray-300"
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button
                                className="px-2 py-1 border-l border-gray-300"
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(item.product.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(item.product.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link to="/products">
                <Button variant="outline" leftIcon={<ArrowLeft size={16} />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-semibold">
                      <span>Estimated Total</span>
                      <span>{formattedTotal}</span>
                    </div>
                  </div>
                </div>
                
                {!isAuthenticated ? (
                  <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg flex items-start">
                    <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Please sign in to checkout</p>
                      <p className="text-sm mt-1">
                        You need to be signed in to complete your purchase.
                      </p>
                      <div className="mt-3">
                        <Link to="/login">
                          <Button variant="primary" size="sm">Sign In</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/checkout" className="block">
                    <Button variant="primary" fullWidth size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                )}
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>We accept:</p>
                  <div className="flex space-x-2 mt-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};