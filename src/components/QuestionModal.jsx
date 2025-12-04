import React, { useState, useEffect } from 'react';

function QuestionModal({ question, teams, isHostMode, onClose, onAwardPoints }) {
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        setShowAnswer(false);
    }, [question]);

    if (!question) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Host Mode Peek */}
                {isHostMode && !showAnswer && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: '#ffeb3b',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#333',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        <strong>Host Peek:</strong> {question.answer}
                    </div>
                )}

                <div className="question-content" style={{ marginBottom: '2rem' }}>
                    <div className="question-text">{question.question}</div>

                    {question.type === 'image' && question.media && (
                        <img
                            src={question.media}
                            alt="Question Media"
                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.5rem', margin: '1rem 0' }}
                        />
                    )}

                    {question.type === 'audio' && question.media && (
                        <audio controls style={{ marginTop: '1rem', width: '100%' }}>
                            <source src={question.media} />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>

                {showAnswer && (
                    <div className="answer-text">{question.answer}</div>
                )}

                <div className="modal-actions">
                    {!showAnswer ? (
                        <button className="btn-answer" onClick={() => setShowAnswer(true)}>
                            정답 확인
                        </button>
                    ) : (
                        <button className="btn-close" onClick={onClose}>
                            닫기 (점수 없음)
                        </button>
                    )}
                </div>

                {showAnswer && (
                    <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '1.2rem' }}>정답 맞춘 팀 선택 (+{question.points}점):</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {teams.map(team => (
                                <button
                                    key={team.id}
                                    className="btn-team"
                                    onClick={() => onAwardPoints(team.id, question.points)}
                                >
                                    {team.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionModal;
