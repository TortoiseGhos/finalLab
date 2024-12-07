"use client"

import React, { useState } from 'react';
import './App.css';
import QuizData from './quizData.json';  // Your provided quiz data

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);  // Track correct answers

  const handleSignUp = () => {
    if (!email || !password) {
      setError('Please fill in both email and password');
    } else {
      setIsSignedUp(true);
      setError('');
    }
  };

  const handleQuizSelect = (quizIndex) => {
    console.log('Quiz Selected:', quizIndex);
    setSelectedQuiz(quizIndex);
    setIsAnswered(false);
    setSelectedAnswer(null); 
    setFeedback(""); 
    setQuestionIndex(0); 
    setCorrectAnswers(0);  
  };
  
  

  const handleReturnToMain = () => {
    setSelectedQuiz(null);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const quiz = QuizData[selectedQuiz];
    const question = quiz.questions[questionIndex];

    if (answer === question.correctAnswer) {
      setFeedback("Correct! Well done.");
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  const renderQuiz = () => {
    if (selectedQuiz === null) return null;  // Prevent errors if no quiz is selected
    const quiz = QuizData[selectedQuiz];  // Get the selected quiz based on index
    const question = quiz.questions[questionIndex];  // Get the current question
  
    return (
      <div className="quiz-container">
        <h3>{question.question}</h3>
        <div className="answer-options">
          {question.options.map((answer, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswerSelect(answer)}
              disabled={isAnswered}
            >
              {answer}
            </button>
          ))}
        </div>
        {isAnswered && <p className="feedback">{feedback}</p>}
        {isAnswered && (
          <button
            onClick={() => {
              if (questionIndex < quiz.questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
                setIsAnswered(false);
                setSelectedAnswer(null);
                setFeedback("");
              } else {
                setFeedback(`You've completed the quiz! Your score is ${Math.round((correctAnswers / quiz.questions.length) * 100)}%`);
              }
            }}
          >
            Next Question
          </button>
        )}
      </div>
    );
  };
  

  const renderProgress = () => {
    const quiz = QuizData[selectedQuiz];
    const totalQuestions = quiz.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}></div>
        <p>{Math.round(percentage)}% Correct</p>
      </div>
    );
  };

  return (
    <div className="App">
      {!isSignedUp ? (
        <div className="signup-container">
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
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
        <div>
          {renderQuiz()}
          {renderProgress()}  {/* Display the progress bar and score */}
          <button onClick={handleReturnToMain}>Return to Main</button>
        </div>
      )}
    </div>
  );
}

export default App;
