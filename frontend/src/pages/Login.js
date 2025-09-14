// Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save JWT token and login state in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.user.username);

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/timetable"), 1000);
      } else {
        setError(data.message || "Invalid username/email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-center">📅 Smart Timetable Generator</h1>
        <h2 className="mb-4 text-xl font-semibold text-center">Login</h2>

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-2 text-sm text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Username or Email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <Link to="/forgot-password" className="text-gray-600 underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Sign up
          </Link>
        </div>

        <div className="mt-4">
          <p className="text-center text-gray-500">Or sign in with</p>
          <div className="flex justify-center mt-2 gap-4">
            <button className="px-4 py-2 border rounded hover:bg-black hover:text-white">Google</button>
            <button className="px-4 py-2 border rounded hover:bg-black hover:text-white">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
