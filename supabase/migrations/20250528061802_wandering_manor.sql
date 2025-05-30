/*
  # Seed products table with initial data
  
  1. Initial Data
    - Adds 12 sample products across different categories
    - Sets appropriate prices, stock levels, and featured status
    - Includes product descriptions and image URLs
*/

INSERT INTO products (name, description, price, category, image_url, stock, featured)
VALUES
  (
    E'Wireless Noise-Cancelling Headphones',
    E'Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    199.99,
    E'Electronics',
    E'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    45,
    true
  ),
  (
    E'Smart Fitness Tracker',
    E'Track your steps, heart rate, sleep quality, and more with this water-resistant fitness band. Compatible with iOS and Android.',
    79.99,
    E'Electronics',
    E'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    78,
    false
  ),
  (
    E'Bluetooth Portable Speaker',
    E'Compact and powerful Bluetooth speaker with 12-hour battery life, waterproof design, and built-in microphone for calls.',
    59.99,
    E'Electronics',
    E'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg',
    23,
    true
  ),
  (
    E'Men\'s Classic Oxford Shirt',
    E'Timeless Oxford shirt made from 100% cotton. Button-down collar and regular fit make it perfect for both casual and formal occasions.',
    49.99,
    E'Clothing',
    E'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    120,
    false
  ),
  (
    E'Women\'s Casual Knit Sweater',
    E'Soft and comfortable knit sweater with relaxed fit. Perfect for layering in colder weather.',
    39.99,
    E'Clothing',
    E'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    85,
    true
  ),
  (
    E'Slim Fit Jeans',
    E'Classic 5-pocket jeans with slim fit design. Made from premium denim with slight stretch for comfort.',
    54.99,
    E'Clothing',
    E'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg',
    92,
    false
  ),
  (
    E'Stainless Steel Cookware Set',
    E'10-piece cookware set including pots, pans, and lids. Made from high-quality stainless steel with heat-resistant handles.',
    149.99,
    E'Home & Kitchen',
    E'https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg',
    32,
    true
  ),
  (
    E'Automatic Coffee Maker',
    E'Programmable coffee maker with 12-cup capacity, built-in grinder, and auto shut-off feature for safety.',
    89.99,
    E'Home & Kitchen',
    E'https://images.pexels.com/photos/6413701/pexels-photo-6413701.jpeg',
    54,
    false
  ),
  (
    E'Memory Foam Pillow',
    E'Ergonomic memory foam pillow that adapts to your head and neck for optimal support and comfort while sleeping.',
    34.99,
    E'Home & Kitchen',
    E'https://images.pexels.com/photos/5790091/pexels-photo-5790091.jpeg',
    76,
    false
  ),
  (
    E'Vitamin C Serum',
    E'Antioxidant facial serum that brightens skin, reduces fine lines, and improves overall complexion. Suitable for all skin types.',
    29.99,
    E'Beauty',
    E'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
    110,
    true
  ),
  (
    E'Natural Moisturizing Cream',
    E'Hydrating face and body cream made with natural ingredients. Free from parabens, sulfates, and artificial fragrances.',
    24.99,
    E'Beauty',
    E'https://images.pexels.com/photos/3735217/pexels-photo-3735217.jpeg',
    87,
    false
  ),
  (
    E'Hair Styling Kit',
    E'Complete hair styling kit including blow dryer, straightener, and curling iron with multiple heat settings and quick heat-up.',
    79.99,
    E'Beauty',
    E'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg',
    41,
    false
  );