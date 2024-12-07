import React, { useState } from 'react';
import './App.css';
import QuizData from './QuizData.json';
import Page from './page.js';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate email and password format
  const handleSignUp = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
    } else {
      setIsSignedUp(true);
      setErrorMessage('');
    }
  };

  const handleQuizSelect = (quizIndex) => {
    setSelectedQuiz(quizIndex);
  };

  const handleReturnToMain = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="App">
      {!isSignedUp ? (
        <div>
          <h2>Sign Up</h2>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      ) : !selectedQuiz ? (
        <div>
          <h2>Select a Quiz</h2>
          {QuizData.map((quiz, index) => (
            <button key={index} onClick={() => handleQuizSelect(index)}>
              {quiz.quizTitle}
            </button>
          ))}
        </div>
      ) : (
        <Page
          quiz={QuizData[selectedQuiz]}
          onReturn={handleReturnToMain}
        />
      )}
    </div>
  );
}

export default App;
