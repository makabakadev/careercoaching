import { Bell } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useUserProfile } from '../hooks/useUserProfile';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useUserProfile();

  const notifications = [
    { id: 1, text: 'New course available: "Advanced Interview Techniques"', time: '5m ago' },
    { id: 2, text: 'Assignment due tomorrow: "Career Goals Essay"', time: '1h ago' },
    { id: 3, text: 'Feedback received on your resume', time: '2h ago' },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Your Courses';
      case '/dashboard/inbox':
        return 'Inbox';
      case '/dashboard/ai-tutor':
        return 'AI Tutor';
      case '/dashboard/settings':
        return 'Settings';
      case '/dashboard/support':
        return 'Support';
      default:
        return 'Your Courses';
    }
  };

  return (
    <header className="bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b border-gray-800 px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">{getPageTitle()}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-800 rounded-lg relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setIsProfileOpen(false);
              }}
            >
              <Bell className="w-6 h-6 text-gray-400" />
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-800 z-50">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-800">
                    <p className="text-sm text-gray-300">{notification.text}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-3 hover:bg-gray-800 rounded-lg p-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">
                  {profile?.full_name?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-1 border border-gray-800 z-50">
                <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                  Edit Profile
                </a>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}