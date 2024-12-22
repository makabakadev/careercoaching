import { useState } from 'react';
import InstructorList from '../components/messaging/InstructorList';
import MessageList from '../components/messaging/MessageList';
import MessageComposer from '../components/messaging/MessageComposer';
import NewConversationButton from '../components/messaging/NewConversationButton';
import { useMessages } from '../hooks/useMessages';
import type { User } from '../types/conversations';

export default function Inbox() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { messages, loading, currentUserId, fetchMessages } = useMessages(selectedUserId);

  const handleSelectInstructor = (instructor: User) => {
    setSelectedUserId(instructor.id);
  };

  return (
    <div className="h-full flex">
      <div className="flex flex-col w-80 border-r border-gray-800">
        <NewConversationButton onSelectInstructor={handleSelectInstructor} />
        <InstructorList 
          onSelectInstructor={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="flex-1">
        {selectedUserId ? (
          <div className="h-full flex flex-col">
            <MessageList 
              messages={messages}
              loading={loading}
              currentUserId={currentUserId}
            />
            <MessageComposer 
              receiverId={selectedUserId} 
              onMessageSent={fetchMessages}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation or start a new one to begin messaging
          </div>
        )}
      </div>
    </div>
  );
}