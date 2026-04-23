-- Create quotes table for storing shipping quotes
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  destination TEXT NOT NULL,
  products JSONB NOT NULL,
  total_weight DECIMAL(10, 2) NOT NULL,
  total_volume DECIMAL(10, 4) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by date
CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON public.quotes(created_at DESC);

-- Create index for client name searches
CREATE INDEX IF NOT EXISTS quotes_client_name_idx ON public.quotes(client_name);

-- Disable RLS for this table since it's an internal tool (no user auth)
ALTER TABLE public.quotes DISABLE ROW LEVEL SECURITY;
