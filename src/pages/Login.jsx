// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", form);
      const { token, user } = res.data;

      if (!token || !user) throw new Error("Invalid login response");

      login(token, user); // ✅ updates context and localStorage
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      console.error("Login error:", msg);
      alert(`❌ ${msg}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Login</h2>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    background: "linear-gradient(to right, #ff4b2b, #ff416c)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Login;
