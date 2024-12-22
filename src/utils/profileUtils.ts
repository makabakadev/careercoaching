import { supabase } from '../lib/supabase';
import { debug } from './debug';

export async function fetchUserProfile(userId: string) {
  try {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            full_name: userId === 'be28b35e-d72b-4e89-be4b-d6ae73edc184' ? 'Han Lee' : null,
            updated_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        debug.error('Error creating profile:', insertError);
        throw insertError;
      }
    }

    return existingProfile;
  } catch (error) {
    debug.error('Error in fetchUserProfile:', error);
    throw error;
  }
}