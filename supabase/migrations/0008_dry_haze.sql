/*
  # Fix instructor profile setup

  1. Changes
    - Ensure instructor profile exists with correct data
    - Add RLS policies for instructor access
    - Add indexes for performance

  2. Security
    - Add policies for instructor data access
    - Maintain existing RLS policies
*/

-- Ensure instructor profile exists with correct data
INSERT INTO profiles (id, full_name, updated_at)
VALUES (
  'be28b35e-d72b-4e89-be4b-d6ae73edc184',
  'Mr. Han Lee',
  now()
)
ON CONFLICT (id) DO UPDATE 
SET full_name = EXCLUDED.full_name
RETURNING id;

-- Ensure instructor record exists
INSERT INTO instructors (id, is_admin)
VALUES (
  'be28b35e-d72b-4e89-be4b-d6ae73edc184',
  true
)
ON CONFLICT (id) DO NOTHING;

-- Add policy for public instructor profile access
CREATE POLICY "Anyone can view instructor profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    id IN (SELECT id FROM instructors)
    OR auth.uid() = id
  );

-- Add index for instructor lookups
CREATE INDEX IF NOT EXISTS idx_profiles_instructor_id
ON profiles(id);

-- Add index for instructor status
CREATE INDEX IF NOT EXISTS idx_instructors_id
ON instructors(id);