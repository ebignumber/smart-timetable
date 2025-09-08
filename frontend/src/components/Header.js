import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 mb-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart School Timetable Generator</h1>

        {/* Navigation links */}
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
