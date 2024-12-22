import { useState } from 'react';
import { 
  Inbox, 
  BookOpen, 
  Bot, 
  Settings, 
  LifeBuoy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mainMenuItems = [
  { icon: Inbox, label: 'Inbox', path: '/dashboard/inbox' },
  { icon: BookOpen, label: 'Courses', path: '/dashboard' },
  { 
    icon: Bot, 
    label: 'AI Tutor', 
    path: '/dashboard/ai-tutor',
    comingSoon: true 
  },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  { icon: LifeBuoy, label: 'Support', path: '/dashboard/support' },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className={`${isExpanded ? 'w-56' : 'w-16'} bg-gray-900 border-r border-gray-800 h-screen flex flex-col transition-all duration-300`}>
      <div className={`p-4 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded && (
          <h2 className="text-lg font-bold text-blue-400">
            Career Coaching
          </h2>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg hover:bg-gray-800"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-4">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.comingSoon ? '#' : item.path}
              className={`sidebar-link ${isActive ? 'active' : ''} ${!isExpanded ? 'justify-center' : ''} ${item.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => {
                if (item.comingSoon) {
                  e.preventDefault();
                }
              }}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="w-5 h-5" />
              {isExpanded && (
                <div className="flex items-center ml-3">
                  <span>{item.label}</span>
                  {item.comingSoon && (
                    <span className="ml-2 text-xs bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 py-4">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''} ${!isExpanded ? 'justify-center' : ''}`}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="w-5 h-5" />
              {isExpanded && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}