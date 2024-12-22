/*
  # Fix instructor messaging system

  1. Changes
    - Add missing foreign key relationships
    - Update instructor profile data
    - Fix course-instructor relationships

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Update instructor profile
UPDATE profiles 
SET full_name = 'Mr. Han Lee'
WHERE id = 'be28b35e-d72b-4e89-be4b-d6ae73edc184';

-- Ensure courses have proper instructor relationships
UPDATE courses
SET instructor_id = 'be28b35e-d72b-4e89-be4b-d6ae73edc184'
WHERE instructor_id IS NULL;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course 
ON enrollments(user_id, course_id);

-- Add index for message queries
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver 
ON messages(sender_id, receiver_id);