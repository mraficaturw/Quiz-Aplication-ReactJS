import { createContext, useState, useEffect } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setUser(state.user || null);
      setIsAuthenticated(!!state.user);
      setQuestions(state.questions || []);
      setCurrentQuestion(state.currentQuestion || 0);
      setAnswers(state.answers || []);
      setTimeLeft(state.timeLeft || 300);
      setQuizStarted(state.quizStarted || false);
      setQuizFinished(state.quizFinished || false);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const state = { 
      user, 
      isAuthenticated,
      questions, 
      currentQuestion, 
      answers, 
      timeLeft, 
      quizStarted,
      quizFinished
    };
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [user, isAuthenticated, questions, currentQuestion, answers, timeLeft, quizStarted, quizFinished]);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setUser(username);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(300);
    setQuizStarted(false);
    setQuizFinished(false);
    localStorage.removeItem('quizState');
  };

  const startQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(300);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const finishQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(300);
    setQuizStarted(false);
    setQuizFinished(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    timeLeft,
    setTimeLeft,
    quizStarted,
    setQuizStarted,
    quizFinished,
    setQuizFinished,
    startQuiz,
    finishQuiz,
    resetQuiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };