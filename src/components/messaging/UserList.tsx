import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface User {
  id: string;
  full_name: string;
}

interface UserListProps {
  onSelectUser: (userId: string) => void;
  selectedUserId?: string;
}

export default function UserList({ onSelectUser, selectedUserId }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .neq('id', currentUser.id);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div className="border-r border-gray-800 w-64">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <div className="overflow-y-auto">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full text-left p-4 hover:bg-gray-800 transition-colors ${
              selectedUserId === user.id ? 'bg-gray-800' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.full_name?.[0] || 'A'}
                </span>
              </div>
              <span className="text-gray-300">{user.full_name || 'Anonymous'}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}