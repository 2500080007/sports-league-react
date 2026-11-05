import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";

function Players() {
    const user = getCurrentUser();
    const isAdmin = user?.role === "admin";

    const [players, setPlayers] = useState(() => {
        return JSON.parse(localStorage.getItem("players")) || [];
    });

    const [playerName, setPlayerName] = useState("");
    const [age, setAge] = useState("");
    const [team, setTeam] = useState("");
    const [position, setPosition] = useState("");
    const [editId, setEditId] = useState(null);

    const savePlayers = (updatedPlayers) => {
        setPlayers(updatedPlayers);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !playerName.trim() ||
            !age ||
            !team.trim() ||
            !position.trim()
        ) {
            alert("Please fill all fields");
            return;
        }

        if (Number(age) <= 0) {
            alert("Enter a valid age");
            return;
        }

        if (editId !== null) {
            const updatedPlayers = players.map((player) =>
                player.id === editId
                    ? { ...player, playerName, age, team, position }
                    : player
            );

            savePlayers(updatedPlayers);
            setEditId(null);
        } else {
            const newPlayer = {
                id: Date.now(),
                playerName,
                age,
                team,
                position
            };

            savePlayers([...players, newPlayer]);
        }

        setPlayerName("");
        setAge("");
        setTeam("");
        setPosition("");
    };

    const handleEdit = (player) => {
        setPlayerName(player.playerName);
        setAge(player.age);
        setTeam(player.team);
        setPosition(player.position);
        setEditId(player.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this player?")) {
            savePlayers(players.filter((player) => player.id !== id));
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Players Management</h1>
                <p>Manage and explore all registered players.</p>

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
                        <h2>
                            {editId !== null ? "Edit Player" : "Add New Player"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Player Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Team Name"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Playing Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            style={inputStyle}
                        />

                        <button type="submit" style={buttonStyle}>
                            {editId !== null ? "Update Player" : "Add Player"}
                        </button>
                    </form>
                )}

                <h2 style={{ marginTop: "35px" }}>All Players</h2>

                <div style={gridStyle}>
                    {players.length === 0 ? (
                        <p>
                            No players available.
                            {isAdmin && " Add your first player above."}
                        </p>
                    ) : (
                        players.map((player) => (
                            <div key={player.id} style={cardStyle}>
                                <h2>{player.playerName}</h2>
                                <p>Age: {player.age}</p>
                                <p>Team: {player.team}</p>
                                <p>Position: {player.position}</p>

                                {isAdmin && (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(player)}
                                            style={buttonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(player.id)}
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

export default Players;