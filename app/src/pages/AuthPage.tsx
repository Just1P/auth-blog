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
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/images/login-img.jpg)' }}></div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">{isLogin ? "Welcome Back" : "Join Us"}</h1>
          <p className="text-center text-sm mb-8">{isLogin ? "Enter your name and password to access your account" : "Enter your name and password to create an account"}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black">{isLogin ? "Login" : "Signup"}</button>
            <button type="button" className="w-full py-3 mt-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">Sign In with Google</button>
          </form>
          <p className="text-center mt-6 text-sm">{isLogin ? "Don't have an account? " : "Already have an account? "} <a href="#" className="text-blue-500 hover:underline" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</a></p>
          {message && (
            <p className="text-center mt-6 text-sm text-red-500">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
