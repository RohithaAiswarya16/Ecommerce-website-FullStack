import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCartStore();
  const { user, isAuthenticated, signOut } = useAuthStore();
  console.log(user);
  const totalItems = cart.getTotalItems();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900 flex items-center">
            <img src='/images/logo.png' alt='BuyNest' width={50}/>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-900 font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-900 font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-900 font-medium">
              About
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-gray-700 hover:text-blue-900">
              <Search size={20} />
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-blue-900 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-blue-900"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User size={20} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Orders
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-900 font-medium">
                Products
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-900 font-medium">
                Categories
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-900 font-medium">
                About
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <Link to="/search" className="flex items-center text-gray-700 hover:text-blue-900">
                  <Search size={20} className="mr-2" />
                  <span>Search</span>
                </Link>
              </div>
              
              <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-900">
                <ShoppingCart size={20} className="mr-2" />
                <span>Cart ({totalItems})</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="flex items-center text-gray-700 hover:text-blue-900">
                    <User size={20} className="mr-2" />
                    <span>My Account</span>
                  </Link>
                  <Link to="/orders" className="text-gray-700 hover:text-blue-900">
                    Orders
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-left text-gray-700 hover:text-blue-900"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="w-full">
                  <Button variant="primary" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
