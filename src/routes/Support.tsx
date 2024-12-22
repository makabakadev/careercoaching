import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ADMIN_ID = 'be28b35e-d72b-4e89-be4b-d6ae73edc184';

export default function Support() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    try {
      setSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert({
          content: `[${formData.priority.toUpperCase()}] ${formData.subject}\n\n${formData.message}`,
          sender_id: user.id,
          receiver_id: ADMIN_ID
        });

      if (error) throw error;

      setSubmitted(true);
      setFormData({ subject: '', message: '', priority: 'normal' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error sending support message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-white">Support Request</h2>
        
        {submitted && (
          <div className="mb-6 p-4 bg-green-500 bg-opacity-20 text-green-400 rounded-lg">
            Support request submitted successfully! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? 'Sending...' : 'Submit Request'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}