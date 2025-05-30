import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/auth';

type FormValues = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuthStore();
  
  const from = location.state?.from?.pathname || '/';
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        setError(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  fullWidth
                  leftIcon={<Mail size={18} className="text-gray-400" />}
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email'
                    }
                  })}
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  fullWidth
                  leftIcon={<Lock size={18} className="text-gray-400" />}
                  error={errors.password?.message}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-900 hover:underline font-semibold">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-4">
              <User size={20} className="text-blue-900 mr-2" />
              <h2 className="text-lg font-semibold">New Customer?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Create an account to enjoy these benefits:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <ArrowRight size={16} className="text-blue-900 mr-2" />
                <span>Fast checkout process</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-blue-900 mr-2" />
                <span>Save multiple shipping addresses</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={16} className="text-blue-900 mr-2" />
                <span>View and track orders</span>
              </li>
            </ul>
            <Link to="/register">
              <Button variant="outline" fullWidth>
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};