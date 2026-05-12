-- DATABASE SCHEMA FOR LIFELINE BLOOD BANK

-- 1. Profiles table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  age INTEGER,
  blood_group TEXT,
  address TEXT,
  avatar_url TEXT,
  latitude FLOAT,
  longitude FLOAT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Blood Requests table
CREATE TABLE blood_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  patient_name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  location TEXT NOT NULL,
  units_required INTEGER NOT NULL,
  urgency_level TEXT CHECK (urgency_level IN ('Normal', 'Urgent', 'Critical')),
  contact_number TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Hospitals table
CREATE TABLE hospitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES

-- Profiles: Users can view all profiles (to find donors), but only edit their own.
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Blood Requests: Viewable by everyone, insert/update by owner or admin.
CREATE POLICY "Blood requests are viewable by everyone." ON blood_requests
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create blood requests." ON blood_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blood requests." ON blood_requests
  FOR UPDATE USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can delete requests." ON blood_requests
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Hospitals: Viewable by everyone, managed by admins.
CREATE POLICY "Hospitals are viewable by everyone." ON hospitals
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage hospitals." ON hospitals
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 5. FUNCTION: Sync Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, age, blood_group, address, latitude, longitude, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    new.email,
    new.raw_user_meta_data->>'phone',
    (new.raw_user_meta_data->>'age')::integer,
    new.raw_user_meta_data->>'blood_group',
    new.raw_user_meta_data->>'address',
    (new.raw_user_meta_data->>'latitude')::float,
    (new.raw_user_meta_data->>'longitude')::float,
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
