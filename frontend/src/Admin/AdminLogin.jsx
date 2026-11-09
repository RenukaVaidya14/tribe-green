
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff, Leaf, LoaderCircle } from "lucide-react";
import api from "../services/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await api.post("/admin/login", {
        username,
        password,
      });

      const token =
        response.data.token ||
        response.data.data?.token ||
        response.data.accessToken;

      if (!token) {
        throw new Error("Login succeeded but no authentication token was received.");
      }

      sessionStorage.setItem("tribe_admin_token", token);

      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-brand">
          <Leaf size={30} />
          <span>TRIBE GREEN</span>
        </div>

        <div className="admin-login-heading">
          <div className="admin-lock-icon">
            <LockKeyhole size={23} />
          </div>

          <h1>Admin Login</h1>
          <p>Sign in to manage corporate gifting enquiries.</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
            />
          </label>

          <label>
            Password
            <div className="admin-password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </label>

          {error && <p className="admin-login-error">{error}</p>}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="loading-icon" size={18} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          Secure Admin Access · Tribe Green
        </p>

      </div>
    </main>
  );
}
