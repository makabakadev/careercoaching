import { Calendar as CalendarIcon } from 'lucide-react';

export default function Calendar() {
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-gray-900 rounded-lg shadow p-4 pt-16">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Calendar
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400 py-1">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`text-center py-1 text-sm ${
              day === currentDate.getDate()
                ? 'bg-blue-500 text-white rounded-full'
                : 'text-gray-300 hover:bg-gray-800 rounded-full cursor-pointer'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}