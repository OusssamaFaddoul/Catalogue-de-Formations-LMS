import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../mockAPI/api";
import { Link } from "react-router-dom";
import "../styles/auth.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    if (email.endsWith("@admin.com")) {
      window.location.href = "/admin";
    } else if (email.endsWith("@user.com")) {
      navigate("/user");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="gradient-blob blob1"></div>
        <div className="gradient-blob blob2"></div>
      </div>

      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-header">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue to SkillHub</p>
          </div>

          {error && (
            <div className="auth-alert alert-error">
              <span className="alert-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">Create one</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;