/*
  # Course and enrollment system

  1. New Tables
    - `instructors` - Course instructors (admin users)
    - `enrollments` - Track course enrollments
    - `course_messages` - Messages between students and instructors

  2. Security
    - Enable RLS on all tables
    - Add policies for appropriate access control
*/

-- Create instructors table
CREATE TABLE instructors (
  id uuid PRIMARY KEY REFERENCES profiles(id),
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  course_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create course messages table
CREATE TABLE course_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id),
  sender_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to instructors"
  ON instructors FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves"
  ON enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read course messages"
  ON course_messages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.id = course_messages.enrollment_id
      AND (e.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM instructors i WHERE i.id = auth.uid()
      ))
    )
  );

CREATE POLICY "Users can send course messages"
  ON course_messages FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.id = enrollment_id
      AND (e.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM instructors i WHERE i.id = auth.uid()
      ))
    )
  );