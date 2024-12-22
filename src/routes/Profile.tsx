import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProfileForm } from '../components/profile/ProfileForm';
import { PasswordForm } from '../components/profile/PasswordForm';
import { useUserProfile } from '../hooks/useUserProfile';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { profile, refetch } = useUserProfile();

  async function updateProfile(newName: string) {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        full_name: newName,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      await refetch();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile!' });
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating password!' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-white">Edit Profile</h2>
        
        <ProfileForm
          fullName={profile?.full_name || ''}
          loading={loading}
          onUpdateName={updateProfile}
          message={message}
        />

        <div className="border-t border-gray-800 pt-6 mt-6">
          <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
          <PasswordForm
            loading={loading}
            onUpdatePassword={updatePassword}
          />
        </div>
      </div>
    </div>
  );
}