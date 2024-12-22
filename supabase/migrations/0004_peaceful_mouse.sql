/*
  # Add courses and enrollments tables

  1. New Tables
    - `courses`
      - `id` (text, primary key)
      - `title` (text)
      - `description` (text)
      - `instructor_id` (uuid, references instructors)
      - `duration` (text)
      - `level` (text)
      - `thumbnail` (text)
      - `created_at` (timestamptz)

  2. Changes
    - Insert admin instructor first
    - Create courses table with proper foreign key
    - Recreate enrollments and course_messages tables
*/

-- First, ensure admin exists in instructors table
INSERT INTO instructors (id, is_admin)
VALUES ('be28b35e-d72b-4e89-be4b-d6ae73edc184', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS course_messages;
DROP TABLE IF EXISTS enrollments;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  instructor_id uuid REFERENCES instructors(id),
  duration text NOT NULL,
  level text NOT NULL,
  thumbnail text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insert initial courses
INSERT INTO courses (id, title, description, instructor_id, duration, level, thumbnail)
VALUES 
  ('1', 'Career Planning Fundamentals', 'Learn the essential steps to plan and develop your career path', 'be28b35e-d72b-4e89-be4b-d6ae73edc184', '6 weeks', 'Beginner', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'),
  ('2', 'Professional Networking Mastery', 'Build and maintain meaningful professional relationships', 'be28b35e-d72b-4e89-be4b-d6ae73edc184', '4 weeks', 'Intermediate', 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=600'),
  ('3', 'Interview Success Strategies', 'Master the art of interviewing and land your dream job', 'be28b35e-d72b-4e89-be4b-d6ae73edc184', '3 weeks', 'Advanced', 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&q=80&w=600');

-- Recreate enrollments table with proper foreign key
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  course_id text REFERENCES courses(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Recreate course_messages table
CREATE TABLE course_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id),
  sender_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
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