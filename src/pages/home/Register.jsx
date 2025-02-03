import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #f0f4ff, #e0e7ff)",
  },
  formContainer: {
    width: "400px",
    padding: "32px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
  },
  message: {
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    textAlign: "center",
    fontSize: "14px",
  },
  successMessage: {
    backgroundColor: "#def7ec",
    color: "#03543f",
  },
  errorMessage: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  backToLogin: {
    display: "block",
    textAlign: "center",
    marginTop: "16px",
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
};

const Register = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/register-account",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email, role: "USER" }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setIsError(true);
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setIsError(true);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create an account</h2>
          <p style={styles.subtitle}>
            Join us today! Fill in your details below
          </p>
        </div>

        {message && (
          <div
            style={{
              ...styles.message,
              ...(isError ? styles.errorMessage : styles.successMessage),
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              style={{
                ...styles.input,
              }}
              placeholder="Enter your username"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              style={{
                ...styles.input,
              }}
              placeholder="Create a strong password"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              style={{
                ...styles.input,
              }}
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
            }}
          >
            Create Account
          </button>
        </form>

        <div style={styles.backToLogin} onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </div>
      </div>
    </div>
  );
};

export default Register;
