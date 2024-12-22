import { CheckCircle, Clock } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Complete Module 1 Quiz',
    course: 'Career Planning Fundamentals',
    dueDate: '2024-03-20',
  },
  {
    id: 2,
    title: 'Submit Network Analysis',
    course: 'Professional Networking Mastery',
    dueDate: '2024-03-22',
  },
  {
    id: 3,
    title: 'Practice Mock Interview',
    course: 'Interview Success Strategies',
    dueDate: '2024-03-25',
  },
];

export default function TaskList() {
  return (
    <div className="bg-gray-900 rounded-lg shadow p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Upcoming Tasks
        </h3>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-gray-400 mt-1 cursor-pointer hover:text-blue-400" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-200">{task.title}</h4>
              <p className="text-xs text-gray-400">{task.course}</p>
              <p className="text-xs text-red-400">Due: {task.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}