import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Outlet />
      </div>
    </div>
  );
}