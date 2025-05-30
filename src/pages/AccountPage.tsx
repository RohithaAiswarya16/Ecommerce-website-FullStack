import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/auth';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const AccountPage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: user?.profile?.first_name || '',
      last_name: user?.profile?.last_name || '',
      phone: user?.profile?.phone || '',
      address: user?.profile?.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await updateProfile(data);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your account</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-blue-900" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">
                  {user.profile?.first_name 
                    ? `${user.profile.first_name} ${user.profile.last_name}`
                    : 'Welcome!'
                  }
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  leftIcon={<User size={18} className="text-gray-400" />}
                />
                
                <Input
                  label="Last Name"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  leftIcon={<User size={18} className="text-gray-400" />}
                />
              </div>
              
              <Input
                label="Email"
                value={user.email}
                disabled
                leftIcon={<Mail size={18} className="text-gray-400" />}
              />
              
              <Input
                label="Phone"
                {...register('phone')}
                error={errors.phone?.message}
                leftIcon={<Phone size={18} className="text-gray-400" />}
              />
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    {...register('address.street')}
                    error={errors.address?.street?.message}
                    leftIcon={<MapPin size={18} className="text-gray-400" />}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      {...register('address.city')}
                      error={errors.address?.city?.message}
                    />
                    
                    <Input
                      label="State/Province"
                      {...register('address.state')}
                      error={errors.address?.state?.message}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ZIP/Postal Code"
                      {...register('address.zipCode')}
                      error={errors.address?.zipCode?.message}
                    />
                    
                    <Input
                      label="Country"
                      {...register('address.country')}
                      error={errors.address?.country?.message}
                    />
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="mt-6"
              >
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};