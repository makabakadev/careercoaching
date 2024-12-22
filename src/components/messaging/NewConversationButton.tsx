import { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useInstructors } from '../../hooks/useInstructors';
import { User } from '../../types/conversations';

interface NewConversationButtonProps {
  onSelectInstructor: (instructor: User) => void;
}

export default function NewConversationButton({ onSelectInstructor }: NewConversationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { instructors, loading } = useInstructors();

  const filteredInstructors = instructors.filter(instructor => 
    instructor.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-blue-400 hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Start New Conversation</span>
      </button>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">New Conversation</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="text-center py-4 text-gray-400">Loading instructors...</div>
              ) : filteredInstructors.length > 0 ? (
                filteredInstructors.map((instructor) => (
                  <button
                    key={instructor.id}
                    onClick={() => {
                      onSelectInstructor(instructor);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">
                        {instructor.full_name?.[0] || 'A'}
                      </span>
                    </div>
                    <span className="text-gray-300">{instructor.full_name}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">No instructors found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}