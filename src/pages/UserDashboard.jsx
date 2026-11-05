import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserDashboard() {

    const modules = [
        {
            title: "Teams",
            description: "Explore all participating teams.",
            icon: "🏆",
            path: "/teams"
        },
        {
            title: "Players",
            description: "View player information.",
            icon: "👥",
            path: "/players"
        },
        {
            title: "Upcoming Matches",
            description: "Check upcoming match schedules.",
            icon: "⚽",
            path: "/matches"
        },
        {
            title: "Match Results",
            description: "View completed match results.",
            icon: "📊",
            path: "/results"
        },
        {
            title: "League Standings",
            description: "Check team rankings and points.",
            icon: "🥇",
            path: "/standings"
        }
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f1f5f9",
            fontFamily: "Arial"
        }}>

            <Navbar />

            <main style={{ padding: "35px" }}>

                <h1>Welcome, User! 👋</h1>

                <p>
                    Explore teams, players, matches and league updates.
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "35px"
                }}>

                    {modules.map((module, index) => (

                        <div
                            key={index}
                            style={{
                                background: "white",
                                padding: "25px",
                                borderRadius: "12px",
                                boxShadow: "0 3px 10px #ddd"
                            }}
                        >

                            <h1>{module.icon}</h1>

                            <h2>{module.title}</h2>

                            <p>{module.description}</p>

                            <Link
                                to={module.path}
                                style={{
                                    display: "inline-block",
                                    background: "#14213d",
                                    color: "white",
                                    padding: "10px 18px",
                                    borderRadius: "6px",
                                    textDecoration: "none"
                                }}
                            >
                                View Details
                            </Link>

                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
}

export default UserDashboard;