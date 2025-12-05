// Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import FormField from '../components/FormField';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Clear general error message
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save JWT token and login state in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.user.username);

        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/timetable'), 1000);
      } else {
        setErrorMessage(data.message || 'Invalid username/email or password');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Unable to connect to server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📅 Smart Timetable Generator</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            type="error"
            className="mb-4"
            onClose={() => setErrorMessage('')}
          />
        )}

        {successMessage && (
          <ErrorMessage
            message={successMessage}
            type="success"
            className="mb-4"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Username or Email"
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="Enter your username or email"
            error={errors.usernameOrEmail}
            required
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-150 ease-in-out"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="small" color="white" className="mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-gray-600 underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Sign up
          </Link>
        </div>

        <div className="mt-4">
          <p className="text-center text-gray-500">Or sign in with</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="border px-4 py-2 rounded">Google</button>
            <button className="border px-4 py-2 rounded">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
