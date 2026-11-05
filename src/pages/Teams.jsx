import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";

function Teams() {
    const user = getCurrentUser();
    const isAdmin = user?.role === "admin";

    const [teams, setTeams] = useState(() => {
        return JSON.parse(localStorage.getItem("teams")) || [];
    });

    const [teamName, setTeamName] = useState("");
    const [coach, setCoach] = useState("");
    const [players, setPlayers] = useState("");
    const [editId, setEditId] = useState(null);

    const saveTeams = (updatedTeams) => {
        setTeams(updatedTeams);
        localStorage.setItem("teams", JSON.stringify(updatedTeams));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!teamName.trim() || !coach.trim() || !players.trim()) {
            alert("Please fill all fields");
            return;
        }

        if (editId !== null) {
            const updatedTeams = teams.map((team) =>
                team.id === editId
                    ? { ...team, teamName, coach, players }
                    : team
            );

            saveTeams(updatedTeams);
            setEditId(null);
        } else {
            const newTeam = {
                id: Date.now(),
                teamName,
                coach,
                players
            };

            saveTeams([...teams, newTeam]);
        }

        setTeamName("");
        setCoach("");
        setPlayers("");
    };

    const handleEdit = (team) => {
        setTeamName(team.teamName);
        setCoach(team.coach);
        setPlayers(team.players);
        setEditId(team.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            saveTeams(teams.filter((team) => team.id !== id));
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Teams Management</h1>
                <p>Manage and explore all participating teams.</p>

                {isAdmin && (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            background: "white",
                            padding: "25px",
                            marginTop: "25px",
                            borderRadius: "10px",
                            maxWidth: "500px"
                        }}
                    >
                        <h2>{editId !== null ? "Edit Team" : "Add New Team"}</h2>

                        <input
                            type="text"
                            placeholder="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Coach Name"
                            value={coach}
                            onChange={(e) => setCoach(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="number"
                            placeholder="Number of Players"
                            value={players}
                            onChange={(e) => setPlayers(e.target.value)}
                            style={inputStyle}
                        />

                        <button type="submit" style={buttonStyle}>
                            {editId !== null ? "Update Team" : "Add Team"}
                        </button>
                    </form>
                )}

                <h2 style={{ marginTop: "35px" }}>All Teams</h2>

                <div style={gridStyle}>
                    {teams.length === 0 ? (
                        <p>
                            No teams available.
                            {isAdmin && " Add your first team above."}
                        </p>
                    ) : (
                        teams.map((team) => (
                            <div key={team.id} style={cardStyle}>
                                <h2>{team.teamName}</h2>
                                <p>Coach: {team.coach}</p>
                                <p>Players: {team.players}</p>

                                {isAdmin && (
                                    <div style={{ marginTop: "15px" }}>
                                        <button
                                            onClick={() => handleEdit(team)}
                                            style={buttonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(team.id)}
                                            style={{
                                                ...buttonStyle,
                                                background: "#e63946",
                                                marginLeft: "10px"
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px"
};

const buttonStyle = {
    background: "#14213d",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px"
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
    marginTop: "20px"
};

const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px #ddd"
};

export default Teams;