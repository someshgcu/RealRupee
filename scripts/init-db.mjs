// One-time DB init script — run with: node scripts/init-db.mjs
// Uses the Supabase Management API to execute SQL
import { execSync } from "child_process";

const PROJECT_REF = "pqqbgcojrjebtylpjkoh";

// Read access token from supabase CLI login
let accessToken;
try {
    // Try to get token from env or supabase CLI config
    accessToken = process.env.SUPABASE_ACCESS_TOKEN;
} catch { }

if (!accessToken) {
    console.error("Please set SUPABASE_ACCESS_TOKEN environment variable.");
    console.error("You can get one from: https://supabase.com/dashboard/account/tokens");
    process.exit(1);
}

const SQL_ENUMS = `
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type_enum') THEN
    CREATE TYPE property_type_enum AS ENUM ('Residential', 'Commercial', 'Agricultural', 'Development');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_condition_enum') THEN
    CREATE TYPE property_condition_enum AS ENUM ('New', 'Resale', 'Foreclosure');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'area_unit_enum') THEN
    CREATE TYPE area_unit_enum AS ENUM ('Square feet', 'Square yards', 'Cents', 'Acres');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_status_enum') THEN
    CREATE TYPE property_status_enum AS ENUM ('Draft', 'Awaiting Approval', 'Active', 'Sold', 'Rejected');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_type_enum') THEN
    CREATE TYPE service_type_enum AS ENUM ('Auction', 'Property Validation', 'Group Buying');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_status_enum') THEN
    CREATE TYPE transaction_status_enum AS ENUM ('Pending', 'Success', 'Failed');
  END IF;
END $$;
`;

const SQL_TABLES = `
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE,
    whatsapp_number TEXT,
    avatar_url TEXT,
    coins_balance INT DEFAULT 0,
    referral_code TEXT UNIQUE,
    referred_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coin_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status property_status_enum DEFAULT 'Draft',
    property_type property_type_enum NOT NULL,
    property_subtype TEXT NOT NULL,
    property_condition property_condition_enum,
    area_value NUMERIC NOT NULL,
    area_unit area_unit_enum NOT NULL,
    cost_per_unit NUMERIC,
    total_cost NUMERIC NOT NULL,
    price_negotiable BOOLEAN DEFAULT FALSE,
    additional_costs TEXT,
    bedrooms INT,
    bathrooms INT,
    balconies INT,
    car_parking INT,
    facing TEXT,
    amenities TEXT[],
    title TEXT NOT NULL,
    description TEXT,
    door_no TEXT,
    locality TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    landmarks TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    contact_phone_1 TEXT NOT NULL,
    contact_phone_2 TEXT,
    contact_whatsapp TEXT,
    contact_email_1 TEXT NOT NULL,
    contact_email_2 TEXT,
    youtube_url TEXT,
    validation_progress INT DEFAULT 0,
    is_rr_validated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id, document_name)
);

CREATE TABLE IF NOT EXISTS shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

CREATE TABLE IF NOT EXISTS leads_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    inquirer_id UUID REFERENCES profiles(id),
    inquirer_name TEXT NOT NULL,
    inquirer_phone TEXT NOT NULL,
    inquirer_email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    visitor_id UUID REFERENCES profiles(id),
    visitor_name TEXT DEFAULT 'Anonymous Guest',
    source TEXT,
    visited_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id),
    service_type service_type_enum NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_method TEXT,
    status transaction_status_enum DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
`;

const SQL_FUNCTIONS = `
CREATE OR REPLACE FUNCTION generate_referral_code(length INT) RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INT := 0;
BEGIN
  FOR i IN 1..length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INT, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_unique_referral_code() RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  is_unique BOOLEAN := FALSE;
BEGIN
  WHILE NOT is_unique LOOP
    new_code := 'RR' || generate_referral_code(6);
    IF NOT EXISTS (SELECT 1 FROM profiles WHERE referral_code = new_code) THEN
      is_unique := TRUE;
    END IF;
  END LOOP;
  NEW.referral_code := new_code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_referral_code ON profiles;
CREATE TRIGGER trigger_set_referral_code
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_unique_referral_code();
`;

const SQL_RLS = `
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_transactions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- Profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can manage their own profile" ON profiles FOR ALL USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view basic profiles' AND tablename = 'profiles') THEN
    CREATE POLICY "Public can view basic profiles" ON profiles FOR SELECT USING (true);
  END IF;

  -- Properties
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active properties' AND tablename = 'properties') THEN
    CREATE POLICY "Public can view active properties" ON properties FOR SELECT USING (status = 'Active');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own properties' AND tablename = 'properties') THEN
    CREATE POLICY "Users can manage their own properties" ON properties FOR ALL USING (auth.uid() = seller_id);
  END IF;

  -- Property Images
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view images' AND tablename = 'property_images') THEN
    CREATE POLICY "Public can view images" ON property_images FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage their property images' AND tablename = 'property_images') THEN
    CREATE POLICY "Users manage their property images" ON property_images FOR ALL USING (auth.uid() IN (SELECT seller_id FROM properties WHERE id = property_id));
  END IF;

  -- Property Documents
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage their property documents' AND tablename = 'property_documents') THEN
    CREATE POLICY "Users manage their property documents" ON property_documents FOR ALL USING (auth.uid() IN (SELECT seller_id FROM properties WHERE id = property_id));
  END IF;

  -- Shortlists
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage their shortlists' AND tablename = 'shortlists') THEN
    CREATE POLICY "Users manage their shortlists" ON shortlists FOR ALL USING (auth.uid() = user_id);
  END IF;

  -- Leads
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Owners manage their leads' AND tablename = 'leads_enquiries') THEN
    CREATE POLICY "Owners manage their leads" ON leads_enquiries FOR ALL USING (auth.uid() = owner_id);
  END IF;

  -- Visitors
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Owners view their visitors' AND tablename = 'property_visitors') THEN
    CREATE POLICY "Owners view their visitors" ON property_visitors FOR SELECT USING (auth.uid() = owner_id);
  END IF;

  -- Coin transactions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users view own coin transactions' AND tablename = 'coin_transactions') THEN
    CREATE POLICY "Users view own coin transactions" ON coin_transactions FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Service transactions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users view own service transactions' AND tablename = 'service_transactions') THEN
    CREATE POLICY "Users view own service transactions" ON service_transactions FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;
`;

async function runSQL(label, sql) {
    const url = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sql }),
    });

    if (!res.ok) {
        const text = await res.text();
        console.error(`❌ ${label} failed (${res.status}): ${text}`);
        return false;
    }

    console.log(`✅ ${label} succeeded`);
    return true;
}

async function main() {
    console.log("🔧 Initializing database schema...\n");

    const steps = [
        ["Enums", SQL_ENUMS],
        ["Tables", SQL_TABLES],
        ["Functions & Triggers", SQL_FUNCTIONS],
        ["RLS Policies", SQL_RLS],
    ];

    for (const [label, sql] of steps) {
        const ok = await runSQL(label, sql);
        if (!ok) {
            console.error(`\n⛔ Stopping — fix the ${label} error and re-run.`);
            process.exit(1);
        }
    }

    console.log("\n🎉 Database schema initialized successfully!");
}

main();
