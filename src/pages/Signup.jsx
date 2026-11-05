import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = signup(name, email, password, role);

        if (!result.success) {
            setError(result.message);
            return;
        }

        alert("Account created successfully!");
        navigate("/login");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-heading">
                    <div className="sports-icon">🏆</div>
                    <h1>Sports League</h1>
                    <p>Management System</p>
                    <h2>Create Account</h2>
                    <span>Join our sports community</span>
                </div>

                <form onSubmit={handleSignup}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <label>Select Account Type</label>

                    <div className="role-selection">

                        <button
                            type="button"
                            className={role === "admin" ? "role-btn selected" : "role-btn"}
                            onClick={() => setRole("admin")}
                        >
                            🛡️ Admin
                        </button>

                        <button
                            type="button"
                            className={role === "user" ? "role-btn selected" : "role-btn"}
                            onClick={() => setRole("user")}
                        >
                            👤 User
                        </button>

                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-submit">
                        Create {role === "admin" ? "Admin" : "User"} Account
                    </button>

                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </div>

            </div>
        </div>
    );
}

export default Signup;