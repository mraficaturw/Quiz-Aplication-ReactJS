import { useContext } from 'react';
import { QuizContext } from './context/QuizContext';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const { isAuthenticated, quizStarted, quizFinished } = useContext(QuizContext);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (quizStarted && !quizFinished) {
    return <Quiz />;
  }

  if (quizFinished) {
    return <Result />;
  }

  return <HomePage />;
}

export default App;