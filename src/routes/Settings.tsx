import { useState } from 'react';
import { Moon, Sun, Bell } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      deadlineReminders: true
    }
  });

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    setSettings({ ...settings, theme: newTheme });
    document.documentElement.classList.toggle('light-theme');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-white">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              {settings.theme === 'dark' ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
              Theme
            </h3>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              {settings.theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </button>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h3>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: !value
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}