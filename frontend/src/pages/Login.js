import { useState } from "react";
import api from "../services/api";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Hook must be inside component
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to Home
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="auth-footer">
          New user? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
