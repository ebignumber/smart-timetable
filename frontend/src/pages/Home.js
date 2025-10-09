// Home.js
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg">
        {/* Logo / Title */}
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
          📅 Smart Timetable Generator
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-200 mb-8">
          Easily create, manage, and customize your school or college timetable.<br />
          Save time, avoid conflicts, and stay organized effortlessly.
        </p>

        {/* Call to Action */}
        <Link
          to="/timetable"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
        >
          🚀 Get Started
        </Link>

        {/* Quote */}
        <p className="text-sm text-gray-300 mt-6 italic">
          “Good scheduling is the backbone of smart learning.”
        </p>
      </div>
    </div>
  );
}

export default Home;
