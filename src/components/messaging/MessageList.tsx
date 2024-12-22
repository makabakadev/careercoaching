import { useEffect, useRef } from 'react';
import EmptyState from './EmptyState';
import MessageBubble from './MessageBubble';
import { Message } from '../../hooks/useMessages';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  currentUserId: string | null;
}

export default function MessageList({ messages, loading, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isCurrentUser={currentUserId === message.sender_id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}