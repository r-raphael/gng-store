/*
  # Create Products and Categories Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Fashion, Technology, Home Products
      - `slug` (text, unique) - URL-friendly category name
      - `description` (text) - Category description
      - `icon` (text) - Icon name for category
      - `created_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `price` (numeric) - Product price
      - `category_id` (uuid, foreign key) - Reference to categories
      - `image_url` (text) - Product image URL
      - `description` (text) - Product description
      - `stock` (integer) - Quantity in stock
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add public read policies for products and categories
    - No authentication required for browsing
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url text,
  description text,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are public"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are public"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_name_idx ON products(name);
