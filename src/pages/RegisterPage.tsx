import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/auth';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        setError(error.message);
      } else {
        navigate('/account', { replace: true });
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
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-600">Sign up for a free account</p>
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
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-400" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match'
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
                Create Account
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-900 hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};