/*
  # Create trades table

  1. New Tables
    - `trades`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `currency_pair` (text)
      - `entry_price` (numeric)
      - `exit_price` (numeric)
      - `size` (numeric)
      - `type` (text)
      - `entry_date` (timestamptz)
      - `exit_date` (timestamptz)
      - `profit_loss` (numeric)
      - `notes` (text)
      - `status` (text)
      - `stop_loss` (numeric)
      - `take_profit` (numeric)
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `trades` table
    - Add policies for authenticated users to manage their own trades
*/

CREATE TABLE trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  currency_pair text NOT NULL,
  entry_price numeric NOT NULL,
  exit_price numeric,
  size numeric NOT NULL,
  type text NOT NULL,
  entry_date timestamptz NOT NULL,
  exit_date timestamptz,
  profit_loss numeric NOT NULL DEFAULT 0,
  notes text,
  status text NOT NULL,
  stop_loss numeric,
  take_profit numeric,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own trades
CREATE POLICY "Users can read own trades"
  ON trades
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own trades
CREATE POLICY "Users can insert own trades"
  ON trades
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own trades
CREATE POLICY "Users can update own trades"
  ON trades
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own trades
CREATE POLICY "Users can delete own trades"
  ON trades
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);