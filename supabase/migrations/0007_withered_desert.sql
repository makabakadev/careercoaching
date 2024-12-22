/*
  # Fix instructor profile and messaging

  1. Changes
    - Ensure instructor profile exists
    - Add missing RLS policies for messages
    - Add indexes for better performance

  2. Security
    - Add RLS policies for messages table
    - Ensure proper access control for instructor-student communication
*/

-- Ensure instructor profile exists
INSERT INTO profiles (id, full_name, updated_at)
VALUES (
  'be28b35e-d72b-4e89-be4b-d6ae73edc184',
  'Mr. Han Lee',
  now()
) ON CONFLICT (id) DO UPDATE 
SET full_name = 'Mr. Han Lee';

-- Add missing RLS policies for messages
CREATE POLICY "Users can view messages they're part of"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation
ON messages(sender_id, receiver_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_profiles_instructor
ON profiles(id) WHERE id = 'be28b35e-d72b-4e89-be4b-d6ae73edc184';