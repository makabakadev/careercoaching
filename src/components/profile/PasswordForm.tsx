import { useState } from 'react';

interface PasswordFormProps {
  loading: boolean;
  onUpdatePassword: (password: string) => void;
}

export function PasswordForm({ loading, onUpdatePassword }: PasswordFormProps) {
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={() => {
          onUpdatePassword(newPassword);
          setNewPassword('');
        }}
        disabled={loading || !newPassword}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        Update Password
      </button>
    </div>
  );
}