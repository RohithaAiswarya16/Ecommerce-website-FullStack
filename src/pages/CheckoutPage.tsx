import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface CheckoutFormData {
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  card: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
}

export const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      shipping_address: user?.profile?.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: getTotalPrice(),
          shipping_address: data.shipping_address,
          status: 'processing'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-4">Add some items to your cart before checking out.</p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="space-y-4">
                    <Input
                      label="Street Address"
                      {...register('shipping_address.street', { required: 'Street address is required' })}
                      error={errors.shipping_address?.street?.message}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="City"
                        {...register('shipping_address.city', { required: 'City is required' })}
                        error={errors.shipping_address?.city?.message}
                      />
                      
                      <Input
                        label="State/Province"
                        {...register('shipping_address.state', { required: 'State is required' })}
                        error={errors.shipping_address?.state?.message}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="ZIP/Postal Code"
                        {...register('shipping_address.zipCode', { required: 'ZIP code is required' })}
                        error={errors.shipping_address?.zipCode?.message}
                      />
                      
                      <Input
                        label="Country"
                        {...register('shipping_address.country', { required: 'Country is required' })}
                        error={errors.shipping_address?.country?.message}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      {...register('card.number', { 
                        required: 'Card number is required',
                        pattern: {
                          value: /^\d{16}$/,
                          message: 'Please enter a valid card number'
                        }
                      })}
                      error={errors.card?.number?.message}
                      leftIcon={<CreditCard size={18} className="text-gray-400" />}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        {...register('card.expiry', { 
                          required: 'Expiry date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: 'Please enter a valid expiry date'
                          }
                        })}
                        error={errors.card?.expiry?.message}
                      />
                      
                      <Input
                        label="CVC"
                        {...register('card.cvc', { 
                          required: 'CVC is required',
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: 'Please enter a valid CVC'
                          }
                        })}
                        error={errors.card?.cvc?.message}
                      />
                      
                      <Input
                        label="Name on Card"
                        {...register('card.name', { required: 'Name is required' })}
                        error={errors.card?.name?.message}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Place Order
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck size={16} className="mr-2" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ShieldCheck size={16} className="mr-2" />
                    <span>Secure payment processing</span>
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