import Navbar from "../components/Navbar";

function Standings() {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const results = JSON.parse(localStorage.getItem("results")) || [];

    const standings = teams.map((team) => {
        const teamResults = results.filter(
            (result) =>
                result.team1 === team.teamName ||
                result.team2 === team.teamName
        );

        let played = 0;
        let wins = 0;
        let losses = 0;
        let draws = 0;
        let goalsFor = 0;
        let goalsAgainst = 0;
        let points = 0;

        teamResults.forEach((result) => {
            played++;

            if (result.team1 === team.teamName) {
                goalsFor += result.score1;
                goalsAgainst += result.score2;
            } else {
                goalsFor += result.score2;
                goalsAgainst += result.score1;
            }

            if (result.winner === team.teamName) {
                wins++;
                points += 3;
            } else if (result.winner === "Draw") {
                draws++;
                points += 1;
            } else {
                losses++;
            }
        });

        return {
            teamName: team.teamName,
            played,
            wins,
            losses,
            draws,
            goalsFor,
            goalsAgainst,
            goalDifference: goalsFor - goalsAgainst,
            points
        };
    });

    standings.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        return b.goalDifference - a.goalDifference;
    });

    return (
        <div style={pageStyle}>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>League Standings</h1>
                <p>Current team rankings based on match results.</p>

                <div style={tableContainer}>
                    {standings.length === 0 ? (
                        <h3>No teams available. Add teams first.</h3>
                    ) : (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Team</th>
                                    <th>Played</th>
                                    <th>Won</th>
                                    <th>Lost</th>
                                    <th>Draw</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            <tbody>
                                {standings.map((team, index) => (
                                    <tr key={team.teamName}>
                                        <td>{index + 1}</td>
                                        <td>{team.teamName}</td>
                                        <td>{team.played}</td>
                                        <td>{team.wins}</td>
                                        <td>{team.losses}</td>
                                        <td>{team.draws}</td>
                                        <td>{team.goalsFor}</td>
                                        <td>{team.goalsAgainst}</td>
                                        <td>{team.goalDifference}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div style={infoStyle}>
                    <h3>Points System</h3>
                    <p>Win = 3 Points</p>
                    <p>Draw = 1 Point</p>
                    <p>Loss = 0 Points</p>
                </div>
            </main>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    background: "#f1f5f9"
};

const tableContainer = {
    overflowX: "auto",
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px #ddd"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center"
};

const infoStyle = {
    background: "white",
    padding: "20px",
    marginTop: "25px",
    borderRadius: "10px",
    maxWidth: "300px"
};

export default Standings;