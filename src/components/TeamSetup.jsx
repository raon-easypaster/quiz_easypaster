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
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {/* Left side - Instructions */}
            <div style={{
                flex: '1',
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                maxWidth: '500px'
            }}>
                <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem', fontSize: '1.8rem' }}>📖 사용 설명서</h2>

                <div style={{ lineHeight: '1.8', color: '#333' }}>
                    <h3 style={{ color: '#3b6ea5', fontSize: '1.3rem', marginTop: '1rem' }}>🎮 게임 진행 방법</h3>
                    <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>팀 이름을 입력하세요 (최소 2팀)</li>
                        <li style={{ marginBottom: '0.5rem' }}>원하는 점수를 클릭하여 문제를 확인하세요</li>
                        <li style={{ marginBottom: '0.5rem' }}>"정답 확인" 버튼으로 답을 공개하세요</li>
                        <li style={{ marginBottom: '0.5rem' }}>정답을 맞춘 팀을 선택하여 점수를 부여하세요</li>
                    </ol>

                    <h3 style={{ color: '#3b6ea5', fontSize: '1.3rem', marginTop: '1.5rem' }}>⚙️ 관리자 기능</h3>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Admin 버튼</strong>: 문제와 답 수정</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Host 모드</strong>: 진행자용 정답 미리보기</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>이미지/오디오</strong>: 미디어 파일 업로드 가능</li>
                    </ul>

                    <div style={{
                        backgroundColor: '#e3f2fd',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid #1e3a8a',
                        marginTop: '1.5rem'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>
                            💡 <strong>팁:</strong> 화면 우측 상단의 Admin과 Host 버튼을 활용하세요!
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Team Setup Form */}
            <div className="team-setup" style={{ flex: '1', minWidth: '400px' }}>
                <h1 style={{ color: '#1e3a8a', fontWeight: 'bold' }}>퀴즈 대회 팀 설정</h1>
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
        </div>
    );
}

export default TeamSetup;
