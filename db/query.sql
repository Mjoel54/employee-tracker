-- Connect to the database
psql -U postgres -d postgres -d staff_db

-- Create the staff_db database
\i db/schema.sql

-- Insert dummy data into the staff_db database
\i db/seeds.sql

