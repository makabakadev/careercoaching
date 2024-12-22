import { useState } from 'react';
import { Search } from 'lucide-react';
import { useConversations } from '../../hooks/useConversations';
import { ConversationItem } from './ConversationItem';
import type { Conversation } from '../../types/conversations';

interface InstructorListProps {
  onSelectInstructor: (instructorId: string) => void;
  selectedUserId?: string;
}

export default function InstructorList({ onSelectInstructor, selectedUserId }: InstructorListProps) {
  const { conversations, loading, error } = useConversations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conversation: Conversation) => {
    if (!searchQuery.trim()) return true;
    
    const name = conversation.userProfile?.full_name?.toLowerCase() || '';
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-80 border-r border-gray-800 h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4">
            <div className="text-sm text-gray-500">Loading conversations...</div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-400">
            {error}
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.userId}
              conversation={conversation}
              isSelected={selectedUserId === conversation.userId}
              onClick={() => onSelectInstructor(conversation.userId)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        )}
      </div>
    </div>
  );
}