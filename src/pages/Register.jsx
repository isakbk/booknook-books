import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, UserPlus, BookOpen } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = register(formData);
    
    if (result.success) {
      navigate("/account");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-icon">
              <UserPlus size={40} />
            </div>
            <h1>Create Account</h1>
            <p>Join BookNook and start your reading journey</p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  <User size={16} />
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div><br />

              <div className="form-group">
                <label htmlFor="lastName">
                  <User size={16} />
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={16} />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={16} />
                Confirm Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="password-requirements">
              <small>Password must be at least 6 characters</small>
            </div>

            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the <Link to="/terms" className="text-link">Terms of Service</Link> and <Link to="/privacy" className="text-link">Privacy Policy</Link></span>
            </label>

            <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: "20px" }}>
              <UserPlus size={18} />
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>or sign up with</span>
          </div>

          {/* <div className="social-login">
            <button className="btn btn-outline" style={{ width: "100%" }}>
              <span>🔵</span> Continue with Google
            </button>
          </div> */}

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login" className="text-link">Sign in</Link>
            </p>
          </div>

          <div className="auth-benefits">
            <div className="benefit-item">
              <BookOpen size={20} />
              <span>Access 10K+ books</span>
            </div>
            <div className="benefit-item">
              <span>🚚</span>
              <span>Free shipping over ₹999</span>
            </div>
            <div className="benefit-item">
              <span>💰</span>
              <span>Exclusive member deals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
