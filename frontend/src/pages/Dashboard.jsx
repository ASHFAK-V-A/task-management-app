import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
        <div className="text-center bg-white p-12 rounded-xl shadow-lg max-w-2x1 w-full">
            <h1 className="text-5xl font-bold mb-6">Welcome to TodoApp</h1>
            <p className="text-gray-600 mb-8 text-lg">
            Manage your daily tasks easily and stay productive!
            </p>
            <div className="space-x-6">
            <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg"
            >
                Get Started
            </Link>
            </div>
        </div>
    </div>
  );
}
