import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";

function getSavedTeams() {
    try {
        return JSON.parse(localStorage.getItem("teams")) || [];
    } catch {
        return [];
    }
}

function Teams() {
    const user = getCurrentUser();
    const isAdmin = user?.role === "admin";

    const [teams, setTeams] = useState(getSavedTeams);
    const [teamName, setTeamName] = useState("");
    const [coach, setCoach] = useState("");
    const [players, setPlayers] = useState("");
    const [editId, setEditId] = useState(null);

    const saveTeams = (updatedTeams) => {
        localStorage.setItem("teams", JSON.stringify(updatedTeams));
        setTeams(updatedTeams);
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
                teamName: teamName.trim(),
                coach: coach.trim(),
                players: Number(players)
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
        setPlayers(String(team.players));
        setEditId(team.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            saveTeams(teams.filter((team) => team.id !== id));
        }
    };

    const cancelEdit = () => {
        setTeamName("");
        setCoach("");
        setPlayers("");
        setEditId(null);
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Teams Management</h1>
                <p>Manage and explore all participating teams.</p>

                {isAdmin && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <h2>
                            {editId !== null ? "Edit Team" : "Add New Team"}
                        </h2>

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
                            min="1"
                            placeholder="Number of Players"
                            value={players}
                            onChange={(e) => setPlayers(e.target.value)}
                            style={inputStyle}
                        />

                        <button type="submit" style={buttonStyle}>
                            {editId !== null ? "Update Team" : "Add Team"}
                        </button>

                        {editId !== null && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                style={{
                                    ...buttonStyle,
                                    background: "#64748b",
                                    marginLeft: "10px"
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                )}

                <h2 style={{ marginTop: "35px" }}>All Teams</h2>

                <div style={gridStyle}>
                    {teams.length === 0 ? (
                        <p>No teams available.</p>
                    ) : (
                        teams.map((team) => (
                            <div key={team.id} style={cardStyle}>
                                <h2>{team.teamName}</h2>
                                <p>Coach: {team.coach}</p>
                                <p>Players: {team.players}</p>

                                {isAdmin && (
                                    <div>
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

const pageStyle = {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "Arial"
};

const formStyle = {
    background: "white",
    padding: "25px",
    marginTop: "25px",
    borderRadius: "10px",
    maxWidth: "500px"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box"
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