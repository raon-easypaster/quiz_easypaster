import React, { useState, useEffect } from 'react';
import './App.css';
import { categories as initialCategories } from './data/quizData';
import TeamSetup from './components/TeamSetup';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import QuestionModal from './components/QuestionModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const [view, setView] = useState('setup'); // setup, game, admin
  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('quizCategories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isHostMode, setIsHostMode] = useState(false);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quizCategories', JSON.stringify(categories));
  }, [categories]);

  const handleStartGame = (teamNames) => {
    const newTeams = teamNames.map((name, index) => ({
      id: index,
      name: name,
      score: 0
    }));
    setTeams(newTeams);
    setView('game');
  };

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
  };

  const handleCloseModal = () => {
    if (currentQuestion) {
      const newCompleted = new Set(completedQuestions);
      newCompleted.add(currentQuestion.id);
      setCompletedQuestions(newCompleted);
      setCurrentQuestion(null);
    }
  };

  const handleAwardPoints = (teamId, points) => {
    const newTeams = teams.map(team => {
      if (team.id === teamId) {
        return { ...team, score: team.score + points };
      }
      return team;
    });
    setTeams(newTeams);
    handleCloseModal();
  };

  const handleUpdateScore = (teamId, delta) => {
    const newTeams = teams.map(team => {
      if (team.id === teamId) {
        return { ...team, score: team.score + delta };
      }
      return team;
    });
    setTeams(newTeams);
  };

  const handleSaveCategories = (newCategories) => {
    setCategories(newCategories);
    setView('setup'); // Return to setup after saving
  };

  const handleResetCategories = () => {
    if (confirm('모든 문제와 설정이 초기화됩니다. 계속하시겠습니까?')) {
      setCategories(initialCategories);
      localStorage.removeItem('quizCategories');
      setView('setup');
    }
  };

  return (
    <div className="main-card">
      {/* Host Controls (Top Right) */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 100 }}>
        <button
          onClick={() => setIsHostMode(!isHostMode)}
          style={{ fontSize: '0.8rem', padding: '0.5rem', background: isHostMode ? '#f6bb42' : '#eee', color: '#333', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isHostMode ? 'Host ON' : 'Host OFF'}
        </button>
        {view !== 'admin' && (
          <button
            onClick={() => setView('admin')}
            style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#333', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Admin
          </button>
        )}
        {view === 'admin' && (
          <button
            onClick={() => setView('setup')}
            style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#333', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Close Admin
          </button>
        )}
      </div>

      <div className="inner-content">
        <header className="app-header">
          <h1 className="app-title">모두가 즐거운 라온 퀴즈대회</h1>
        </header>

        {view === 'setup' && (
          <TeamSetup onStartGame={handleStartGame} />
        )}

        {view === 'admin' && (
          <AdminPanel
            categories={categories}
            onSave={handleSaveCategories}
            onReset={handleResetCategories}
          />
        )}

        {view === 'game' && (
          <>
            <GameBoard
              categories={categories}
              completedQuestions={completedQuestions}
              onQuestionClick={handleQuestionClick}
            />
            <ScoreBoard teams={teams} onUpdateScore={handleUpdateScore} />
          </>
        )}

        <footer className="app-footer">
          by Easy Paster
        </footer>
      </div>

      {currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          teams={teams}
          isHostMode={isHostMode}
          onClose={handleCloseModal}
          onAwardPoints={handleAwardPoints}
        />
      )}
    </div>
  );
}

export default App;
