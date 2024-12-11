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
    <div className="auth-page">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <div className="tabs">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Signup
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AuthPage;
