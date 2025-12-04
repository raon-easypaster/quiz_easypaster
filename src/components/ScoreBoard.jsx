import React from 'react';

function ScoreBoard({ teams, onUpdateScore }) {
    return (
        <div className="score-board">
            {teams.map((team) => (
                <div key={team.id} className="team-score">
                    <div className="team-name">{team.name}</div>
                    <div className="score-value">{team.score}</div>
                    <div className="score-controls">
                        <button onClick={() => onUpdateScore(team.id, 100)}>+100</button>
                        <button onClick={() => onUpdateScore(team.id, -100)}>-100</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ScoreBoard;
