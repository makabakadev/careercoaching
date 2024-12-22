import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Send } from 'lucide-react';
import { useConversations } from '../../hooks/useConversations';

interface MessageComposerProps {
  receiverId: string;
  onMessageSent?: () => void;
}

export default function MessageComposer({ receiverId, onMessageSent }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { refresh } = useConversations();

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || sending) return;

    try {
      setSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert({
          content: message.trim(),
          sender_id: user.id,
          receiver_id: receiverId,
        });

      if (error) throw error;
      setMessage('');
      onMessageSent?.();
      refresh(); // Refresh the conversation list
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={sendMessage} className="p-4 border-t border-gray-800">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}