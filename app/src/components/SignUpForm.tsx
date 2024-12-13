import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth.service";
import SigninForm from "./SigninForm";

const SignupForm = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signup(username, password);
      if (!result) {
        setError("Signup failed. Please try again.");
        return;
      }

      navigate("/create-post");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  if (showSignin) {
    return <SigninForm />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-12 rounded-lg bg-gray-50 shadow-lg">
        <h1 className="text-3xl font-serif font-bold text-center mb-4">
          Create an account
        </h1>
        <p className="text-md text-center text-gray-500 mb-8">
          Start your journey with us! Please fill in your details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <button
            onClick={() => setShowSignin(true)}
            className="text-black hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
