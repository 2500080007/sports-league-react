import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const cards = [
        {
            title: "Manage Teams",
            description: "Add, update and delete teams.",
            path: "/teams",
            icon: "🏆"
        },
        {
            title: "Manage Players",
            description: "View and manage player details.",
            path: "/players",
            icon: "👥"
        },
        {
            title: "Schedule Matches",
            description: "Create and manage match schedules.",
            path: "/matches",
            icon: "⚽"
        },
        {
            title: "Manage Results",
            description: "Update match results.",
            path: "/results",
            icon: "📊"
        },
        {
            title: "League Standings",
            description: "View team rankings and points.",
            path: "/standings",
            icon: "🥇"
        }
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f1f5f9",
            fontFamily: "Arial"
        }}>

            <Navbar />

            <div style={{ padding: "35px" }}>

                <h1>Welcome, Admin! 👋</h1>

                <p>Manage your sports league from one place.</p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    marginTop: "30px"
                }}>

                    {[
                        ["Teams", "Manage Teams"],
                        ["Players", "Manage Players"],
                        ["Matches", "Schedule Matches"],
                        ["Results", "View Results"]
                    ].map((item, index) => (

                        <div key={index} style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px #ddd"
                        }}>
                            <h3>{item[0]}</h3>
                            <p>{item[1]}</p>
                        </div>

                    ))}

                </div>

                <h2 style={{ marginTop: "40px" }}>
                    Management Modules
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "20px",
                    marginTop: "20px"
                }}>

                    {cards.map((card, index) => (

                        <div key={index} style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px #ddd"
                        }}>

                            <h1>{card.icon}</h1>

                            <h3>{card.title}</h3>

                            <p>{card.description}</p>

                            <Link
                                to={card.path}
                                style={{
                                    display: "inline-block",
                                    background: "#14213d",
                                    color: "white",
                                    padding: "10px 18px",
                                    borderRadius: "6px",
                                    textDecoration: "none"
                                }}
                            >
                                Open Module
                            </Link>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;