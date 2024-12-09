"use client";

import React, { useState } from 'react';
import './App.css';
import QuizData from './quizData.json'; 
import { auth } from './_utils/firebase'; 
import { useUserAuth } from "./_utils/auth-context";

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();




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
      setCorrectAnswers(correctAnswers + 1); 
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  const renderQuiz = () => {
    const quiz = QuizData[selectedQuiz]; 
    const question = quiz.questions[questionIndex];
  
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
      <h1>QuizMore</h1>
      <img width={"50%"} src='https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY='></img>
      {!user ? (
            <button className="signin-button" onClick={gitHubSignIn}>Sign In/Sign Up</button>
      ) : !selectedQuiz ? (
        <div>
          <h2>Select a Quiz</h2>
          <h3>Test your knowledge on coding languages</h3>
          {QuizData.map((quiz, index) => (
              <button key={index} onClick={() => handleQuizSelect(index)}>
                {quiz.quizTitle}
              </button>
            ))}
          <button className="signout-button" onClick={firebaseSignOut}>Sign Out</button>

        </div>
      ) : (
        <div>
          {renderQuiz()}
          {renderProgress()}
          <button onClick={handleReturnToMain}>Return to Main</button>
        </div>
      )}
    </div>
  );
}

export default App;
