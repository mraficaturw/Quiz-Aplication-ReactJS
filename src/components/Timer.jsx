import { useEffect, useContext } from 'react';
import { QuizContext } from '../context/QuizContext.jsx';

const Timer = () => {
  const { 
    timeLeft, 
    setTimeLeft, 
    setQuizStarted,
    setQuizFinished,
    questions, 
    currentQuestion
  } = useContext(QuizContext);

  useEffect(() => {
    if (timeLeft <= 0 || currentQuestion >= questions.length) {
      setQuizStarted(false);
      setQuizFinished(true);
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, currentQuestion, questions.length, setTimeLeft, setQuizStarted, setQuizFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        <span>Waktu Tersisa:</span>
        <span className="time">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;