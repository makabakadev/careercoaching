import { useState } from 'react';
import { MessageAlert } from './MessageAlert';

interface ProfileFormProps {
  fullName: string;
  loading: boolean;
  onUpdateName: (name: string) => void;
  message: { type: string; text: string };
}

export function ProfileForm({ fullName, loading, onUpdateName, message }: ProfileFormProps) {
  const [name, setName] = useState(fullName);

  return (
    <div className="space-y-6">
      <MessageAlert message={message} />
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={() => onUpdateName(name)}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
}