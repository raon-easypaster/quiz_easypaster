import React from 'react';

function GameBoard({ categories, completedQuestions, onQuestionClick }) {
    return (
        <div className="game-board">
            {categories.map((category) => (
                <div key={category.id} className="category-column">
                    <div className="category-header">
                        <div className="category-oval">
                            {category.name}
                        </div>
                    </div>
                    <div className="questions-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {category.questions.map((q) => {
                            const isCompleted = completedQuestions.has(q.id);
                            const rowClass = `row-${q.points}`;

                            return (
                                <button
                                    key={q.id}
                                    className={`point-card ${rowClass} ${isCompleted ? 'completed' : ''}`}
                                    onClick={() => !isCompleted && onQuestionClick(q)}
                                    disabled={isCompleted}
                                >
                                    {q.points}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GameBoard;
