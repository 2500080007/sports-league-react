import { NavLink, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../utils/auth";

function Navbar() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const home = user?.role === "admin" ? "/admin" : "/user";

    const links = [
        { name: "Home", path: home },
        { name: "Teams", path: "/teams" },
        { name: "Players", path: "/players" },
        { name: "Matches", path: "/matches" },
        { name: "Results", path: "/results" },
        { name: "Standings", path: "/standings" }
    ];

    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Sports League</h2>

            <div className="navbar-links">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === home}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;