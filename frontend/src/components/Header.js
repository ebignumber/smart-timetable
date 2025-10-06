import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Project Name / Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Smart Timetable Generator
      </h1>

      {/* Navigation */}
      <nav className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        {isLoggedIn && <Link to="/timetable" className="hover:underline">Timetable</Link>}
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <span className="mx-2">or</span>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:underline hover:text-blue-200 bg-transparent border-none cursor-pointer transition duration-150 ease-in-out"
          >
            Logout
          </button>
        )}
        <Link to="/contact" className="hover:underline">Contact Us</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </nav>
    </header>
  );
};

export default Header;
