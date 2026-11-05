import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

function Login() {
    const navigate = useNavigate();

    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const result = login(email, password, role);

        if (!result.success) {
            setError(result.message);
            return;
        }

        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-heading">
                    <div className="sports-icon">🏆</div>
                    <h1>Sports League</h1>
                    <p>Management System</p>
                    <h2>Welcome Back!</h2>
                    <span>Login to continue</span>
                </div>

                <div className="role-selection">
                    <button
                        type="button"
                        className={role === "admin" ? "role-btn selected" : "role-btn"}
                        onClick={() => {
                            setRole("admin");
                            setError("");
                        }}
                    >
                        🛡️ Admin
                    </button>

                    <button
                        type="button"
                        className={role === "user" ? "role-btn selected" : "role-btn"}
                        onClick={() => {
                            setRole("user");
                            setError("");
                        }}
                    >
                        👤 User
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-submit">
                        Login as {role === "admin" ? "Admin" : "User"}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account?
                    <Link to="/signup"> Create Account</Link>
                </div>

            </div>
        </div>
    );
}

export default Login;