import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../mockAPI/api";
import { Link } from 'react-router-dom';
import "../styles/auth.css";


export default function Signup() {
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

    if (!email.endsWith("@admin.com") && !email.endsWith("@user.com")) {
      setError("Email must end with @admin.com or @user.com");
      setLoading(false);
      return;
    }

    
    const role = email.endsWith("@admin.com") ? "admin" : "user";

    try {
      
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        setError("Account already exists");
        setLoading(false);
        return;
      }

      
      await createUser({
        email,
        password,
        role,
      });

      alert("Account created successfully!");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      setError("Failed to create account. Try again.");
    } finally {
      setLoading(false);
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
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join SkillHub and start learning</p>
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
                <span className="spinner"></span> Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>  );
}