import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CourseGrid from '../components/CourseGrid';
import Calendar from '../components/Calendar';
import TaskList from '../components/TaskList';
import Profile from './Profile';
import Settings from './Settings';
import Support from './Support';
import Inbox from './Inbox';
import Course from './Course';
import { updatedCourses } from '../data/courseContent';

export default function Dashboard() {
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="flex h-screen bg-dark-blue">
      <div className="fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col pl-[224px]">
        <div className="fixed top-0 right-0 left-[224px] z-20 bg-dark-blue">
          <Header />
        </div>
        <div className="flex-1 flex overflow-hidden pt-20">
          <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
            showRightPanel ? 'mr-72' : 'mr-0'
          }`}>
            <Routes>
              <Route path="/" element={<CourseGrid courses={updatedCourses} />} />
              <Route path="/course/:courseId/*" element={<Course />} />
              <Route path="/course/:courseId/:moduleId/:lessonId" element={<Course />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
              <Route path="/inbox" element={<Inbox />} />
            </Routes>
          </main>
          
          <aside className={`fixed right-0 top-0 h-full transition-transform duration-300 z-10 ${
            showRightPanel ? 'translate-x-0' : 'translate-x-full'
          }`} style={{ width: '18rem', marginTop: '4rem' }}>
            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="absolute -left-4 top-4 bg-gray-800 p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${showRightPanel ? 'rotate-180' : ''}`} />
            </button>
            <div className="w-72 h-full bg-gray-900 border-l border-gray-800 overflow-y-auto">
              <Calendar />
              <TaskList />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}