import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";

function Results() {
    const user = getCurrentUser();
    const isAdmin = user?.role === "admin";

    const [matches] = useState(() => {
        return JSON.parse(localStorage.getItem("matches")) || [];
    });

    const [results, setResults] = useState(() => {
        return JSON.parse(localStorage.getItem("results")) || [];
    });

    const [matchId, setMatchId] = useState("");
    const [score1, setScore1] = useState("");
    const [score2, setScore2] = useState("");
    const [editId, setEditId] = useState(null);

    const saveResults = (updatedResults) => {
        setResults(updatedResults);
        localStorage.setItem("results", JSON.stringify(updatedResults));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (matchId === "" || score1 === "" || score2 === "") {
            alert("Please fill all fields");
            return;
        }

        const selectedMatch = matches.find(
            (match) => match.id === Number(matchId)
        );

        if (!selectedMatch) {
            alert("Please select a valid match");
            return;
        }

        const result = {
            id: editId !== null ? editId : Date.now(),
            matchId: Number(matchId),
            team1: selectedMatch.team1,
            team2: selectedMatch.team2,
            score1: Number(score1),
            score2: Number(score2),
            winner:
                Number(score1) > Number(score2)
                    ? selectedMatch.team1
                    : Number(score2) > Number(score1)
                    ? selectedMatch.team2
                    : "Draw"
        };

        if (editId !== null) {
            const updatedResults = results.map((item) =>
                item.id === editId ? result : item
            );

            saveResults(updatedResults);
        } else {
            saveResults([...results, result]);
        }

        setMatchId("");
        setScore1("");
        setScore2("");
        setEditId(null);
    };

    const handleEdit = (result) => {
        setMatchId(String(result.matchId));
        setScore1(String(result.score1));
        setScore2(String(result.score2));
        setEditId(result.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this result?")) {
            saveResults(results.filter((result) => result.id !== id));
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Results Management</h1>
                <p>View and manage sports match results.</p>

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
                            {editId !== null ? "Edit Result" : "Add Match Result"}
                        </h2>

                        <select
                            value={matchId}
                            onChange={(e) => setMatchId(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="">Select Match</option>

                            {matches.map((match) => (
                                <option key={match.id} value={match.id}>
                                    {match.team1} vs {match.team2}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            min="0"
                            placeholder="First Team Score"
                            value={score1}
                            onChange={(e) => setScore1(e.target.value)}
                            style={inputStyle}
                        />

                        <input
                            type="number"
                            min="0"
                            placeholder="Second Team Score"
                            value={score2}
                            onChange={(e) => setScore2(e.target.value)}
                            style={inputStyle}
                        />

                        <button type="submit" style={buttonStyle}>
                            {editId !== null ? "Update Result" : "Save Result"}
                        </button>

                        {editId !== null && (
                            <button
                                type="button"
                                onClick={() => {
                                    setMatchId("");
                                    setScore1("");
                                    setScore2("");
                                    setEditId(null);
                                }}
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

                <h2 style={{ marginTop: "35px" }}>Match Results</h2>

                <div style={gridStyle}>
                    {results.length === 0 ? (
                        <p>No results available yet.</p>
                    ) : (
                        results.map((result) => (
                            <div key={result.id} style={cardStyle}>
                                <h2>
                                    {result.team1} vs {result.team2}
                                </h2>

                                <h3>
                                    {result.score1} - {result.score2}
                                </h3>

                                <p>
                                    Winner: {result.winner}
                                </p>

                                {isAdmin && (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(result)}
                                            style={buttonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(result.id)}
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

export default Results;