import React, { useState } from 'react';

function TeamSetup({ onStartGame }) {
    const [teamNames, setTeamNames] = useState(['', '']);

    const handleNameChange = (index, value) => {
        const newNames = [...teamNames];
        newNames[index] = value;
        setTeamNames(newNames);
    };

    const addTeam = () => {
        if (teamNames.length < 4) {
            setTeamNames([...teamNames, '']);
        }
    };

    const removeTeam = (index) => {
        if (teamNames.length > 2) {
            const newNames = teamNames.filter((_, i) => i !== index);
            setTeamNames(newNames);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validTeams = teamNames.filter(name => name.trim() !== '');
        if (validTeams.length >= 2) {
            onStartGame(validTeams);
        } else {
            alert('최소 2팀 이상의 이름을 입력해주세요.');
        }
    };

    return (
        <div className="team-setup">
            <h1 style={{ color: '#2c3e50', fontWeight: 'bold' }}>팀 설정</h1>
            <form onSubmit={handleSubmit}>
                {teamNames.map((name, index) => (
                    <div key={index} className="team-input-group">
                        <input
                            type="text"
                            placeholder={`팀 ${index + 1} 이름`}
                            value={name}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                            required
                        />
                        {teamNames.length > 2 && (
                            <button type="button" onClick={() => removeTeam(index)} style={{ background: '#d9534f', color: 'white', borderRadius: '5px' }}>
                                X
                            </button>
                        )}
                    </div>
                ))}
                {teamNames.length < 4 && (
                    <button type="button" onClick={addTeam} style={{ marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }}>
                        + 팀 추가
                    </button>
                )}
                <button type="submit" className="btn-primary">
                    게임 시작
                </button>
            </form>
        </div>
    );
}

export default TeamSetup;
