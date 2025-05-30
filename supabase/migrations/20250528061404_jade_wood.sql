/*
  # Initial E-commerce Database Schema

  1. New Tables
    - `products`: Stores product information
      - `id` (uuid, primary key): Unique product identifier
      - `created_at` (timestamptz): Creation timestamp
      - `name` (text): Product name
      - `description` (text): Product description
      - `price` (numeric): Product price
      - `category` (text): Product category
      - `image_url` (text): URL to product image
      - `stock` (integer): Available stock quantity
      - `featured` (boolean): Featured product flag
    
    - `orders`: Stores order information
      - `id` (uuid, primary key): Unique order identifier
      - `created_at` (timestamptz): Order creation timestamp
      - `user_id` (uuid): Reference to auth.users
      - `status` (text): Order status
      - `total` (numeric): Order total amount
      - `shipping_address` (jsonb): Shipping address
      - `payment_intent` (text): Payment provider reference
    
    - `order_items`: Stores items within orders
      - `id` (uuid, primary key): Unique order item identifier
      - `created_at` (timestamptz): Creation timestamp
      - `order_id` (uuid): Reference to orders
      - `product_id` (uuid): Reference to products
      - `quantity` (integer): Quantity ordered
      - `price` (numeric): Price at time of purchase
    
    - `profiles`: Stores user profile information
      - `id` (uuid, primary key): User ID from auth.users
      - `created_at` (timestamptz): Creation timestamp
      - `updated_at` (timestamptz): Last update timestamp
      - `first_name` (text): User's first name
      - `last_name` (text): User's last name
      - `avatar_url` (text): URL to avatar image
      - `phone` (text): Phone number
      - `address` (jsonb): User's address
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read product information (everyone)
      - Read their own orders and order items
      - Read and update their own profile
      - Create orders and order items
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  image_url text NOT NULL,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  featured boolean DEFAULT false
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending',
  total numeric NOT NULL CHECK (total >= 0),
  shipping_address jsonb NOT NULL,
  payment_intent text
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0)
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  first_name text,
  last_name text,
  avatar_url text,
  phone text,
  address jsonb
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Products: Anyone can read products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Orders: Users can only read their own orders
CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders: Users can create their own orders
CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can read their own order items
CREATE POLICY "Users can read their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Order Items: Users can create their own order items
CREATE POLICY "Users can create their own order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Profiles: Users can read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Profiles: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create functions to maintain updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update the updated_at column
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();