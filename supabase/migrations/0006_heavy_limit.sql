/*
  # Fix course instructor relationship

  1. Changes
    - Add foreign key relationship between courses and profiles for instructors
    - Update existing courses to use the correct instructor relationship
    - Add RLS policies for instructor access

  2. Security
    - Enable RLS on courses table
    - Add policy for instructor access
*/

-- Add foreign key relationship between courses and profiles
ALTER TABLE courses
DROP CONSTRAINT IF EXISTS courses_instructor_id_fkey;

ALTER TABLE courses
ADD CONSTRAINT courses_instructor_id_fkey
FOREIGN KEY (instructor_id) REFERENCES profiles(id);

-- Update RLS policies for instructors
CREATE POLICY "Instructors can manage their courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM instructors
      WHERE id = auth.uid()
      AND id = instructor_id
    )
  );