import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/auth.service";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = await signin(username, password);
      if (token) {
        localStorage.setItem("access_token", token);
        setMessage("Login successful!");
        navigate("/create-post");
      } else {
        setMessage("Login failed!");
      }
    } catch (err) {
      const error = err as Error;
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition">
      <div className="w-full max-w-md p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 ${
              isLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 ${
              !isLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm font-medium text-red-600 dark:text-red-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
