import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useAuthStore } from '../store/auth';
import { supabase } from '../lib/supabase';
import { Order, OrderItem } from '../types';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items (
              *,
              product:products (*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData as Order[]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'cancelled':
        return <XCircle className="text-red-500" />;
      case 'processing':
        return <Clock className="text-yellow-500" />;
      default:
        return <Package className="text-blue-500" />;
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Package size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600">When you place an order, it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order placed</p>
                        <p className="font-semibold">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(order.total)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono text-sm">{order.id.slice(0, 8)}</p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2 font-semibold capitalize">{order.status}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      {order.items?.map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center py-4">
                          <div className="h-20 w-20 flex-shrink-0">
                            <img
                              src={item.product?.image_url}
                              alt={item.product?.name}
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-lg font-semibold">{item.product?.name}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="font-semibold">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm">
                        <p className="font-semibold mb-2">Shipping Address:</p>
                        <p>{order.shipping_address.street}</p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.state}{' '}
                          {order.shipping_address.zipCode}
                        </p>
                        <p>{order.shipping_address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};