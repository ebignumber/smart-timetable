// About.js
function About() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">About Smart Timetable</h1>
        <p className="text-lg text-gray-700 mb-8">
          Smart Timetable Generator helps schools and colleges create and manage timetables efficiently. Avoid conflicts, save time, and ensure smooth scheduling.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="text-left list-disc list-inside mb-8 text-gray-700">
          <li>Manage classrooms, teachers, subjects, and periods easily</li>
          <li>Conflict detection for teachers and classes</li>
          <li>Export timetables to CSV</li>
          <li>User login and registration with protected access</li>
          <li>Responsive and clean UI using React & Tailwind CSS</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <p className="text-gray-700 mb-8">
          Built with <strong>React</strong> for the frontend and <strong>Tailwind CSS</strong> for styling. Uses local storage for demo purposes; can be integrated with backend (Node.js / MongoDB) for full functionality.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Project Vision</h2>
        <p className="text-gray-700 mb-8">
          Our goal is to simplify timetable management for educational institutions, making scheduling transparent, efficient, and conflict-free.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Credits</h2>
        <p className="text-gray-700">
          Developed by Smart Timetable Team. Designed to be a learning and demo project.
        </p>
      </div>
    </div>
  );
}

export default About;
