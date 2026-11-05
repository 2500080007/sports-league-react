import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";

function Matches() {
    const user = getCurrentUser();
    const isAdmin = user?.role === "admin";

    const [matches, setMatches] = useState(() => {
        return JSON.parse(localStorage.getItem("matches")) || [];
    });

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [editId, setEditId] = useState(null);

    const saveMatches = (updatedMatches) => {
        setMatches(updatedMatches);
        localStorage.setItem("matches", JSON.stringify(updatedMatches));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!team1.trim() || !team2.trim() || !date || !time || !venue.trim()) {
            alert("Please fill all fields");
            return;
        }

        if (team1.trim().toLowerCase() === team2.trim().toLowerCase()) {
            alert("Please select two different teams");
            return;
        }

        if (editId !== null) {
            const updatedMatches = matches.map((match) =>
                match.id === editId
                    ? { ...match, team1, team2, date, time, venue }
                    : match
            );

            saveMatches(updatedMatches);
            setEditId(null);
        } else {
            const newMatch = {
                id: Date.now(),
                team1,
                team2,
                date,
                time,
                venue,
                status: "Upcoming"
            };

            saveMatches([...matches, newMatch]);
        }

        clearForm();
    };

    const clearForm = () => {
        setTeam1("");
        setTeam2("");
        setDate("");
        setTime("");
        setVenue("");
        setEditId(null);
    };

    const handleEdit = (match) => {
        setTeam1(match.team1);
        setTeam2(match.team2);
        setDate(match.date);
        setTime(match.time);
        setVenue(match.venue);
        setEditId(match.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this match?")) {
            saveMatches(matches.filter((match) => match.id !== id));
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Matches Management</h1>
                <p>Schedule and manage sports league matches.</p>

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
                            {editId !== null ? "Edit Match" : "Schedule New Match"}
                        </h2>

                        <input
                            type="text"
                            placeholder="First Team"
                            value={team1}
                            onChange={(e) => setTeam1(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Second Team"
                            value={team2}
                            onChange={(e) => setTeam2(e.target.value)}
                            style={inputStyle}
                        />

                        <label style={labelStyle}>Match Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={inputStyle}
                        />

                        <label style={labelStyle}>Match Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Match Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            style={inputStyle}
                        />

                        <button type="submit" style={buttonStyle}>
                            {editId !== null ? "Update Match" : "Schedule Match"}
                        </button>

                        {editId !== null && (
                            <button
                                type="button"
                                onClick={clearForm}
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

                <h2 style={{ marginTop: "35px" }}>All Matches</h2>

                <div style={gridStyle}>
                    {matches.length === 0 ? (
                        <p>No matches scheduled yet.</p>
                    ) : (
                        matches.map((match) => (
                            <div key={match.id} style={cardStyle}>
                                <h2>
                                    {match.team1} vs {match.team2}
                                </h2>

                                <p>Date: {match.date}</p>
                                <p>Time: {match.time}</p>
                                <p>Venue: {match.venue}</p>
                                <p>Status: {match.status}</p>

                                {isAdmin && (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(match)}
                                            style={buttonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(match.id)}
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
    marginTop: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px"
};

const labelStyle = {
    display: "block",
    marginTop: "10px"
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
};

const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px #ddd"
};

export default Matches;