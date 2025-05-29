import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext.jsx';
import Timer from './Timer';
import Question from './Question';

const Quiz = () => {
  const { 
    questions, 
    setQuestions, 
    quizStarted,
    resetQuiz
  } = useContext(QuizContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const timestamp = new Date().getTime();
        const apiUrl = `https://opentdb.com/api.php?amount=10&timestamp=${timestamp}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.response_code === 0 && data.results && data.results.length > 0) {
          setQuestions(data.results);
        } else {
          let errorMessage = "Gagal memuat soal. Silakan coba lagi.";
          
          if (data.response_code) {
            switch(data.response_code) {
              case 1: 
                errorMessage = "Tidak cukup soal untuk kuis (Code 1).";
                break;
              case 2: 
                errorMessage = "Parameter tidak valid (Code 2).";
                break;
              case 3: 
                errorMessage = "Token session tidak ditemukan (Code 3).";
                break;
              case 4: 
                errorMessage = "Token session habis (Code 4).";
                break;
              default:
                errorMessage = `Error code: ${data.response_code}`;
            }
          }
          
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setError(`Mencoba ulang (${retryCount + 1}/3): ${err.message}`);
          
          setTimeout(() => {
            fetchQuestions();
          }, 1500);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (quizStarted && questions.length === 0) {
      fetchQuestions();
    }
  }, [quizStarted, questions.length, setQuestions, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    resetQuiz();
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <p>Memuat soal...</p>
          {retryCount > 0 && <p>Percobaan ke {retryCount}</p>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-container">
          <p>{error}</p>
          <div className="button-group">
            <button onClick={handleRetry}>Coba Lagi</button>
            <button onClick={() => window.location.reload()}>Muat Ulang Halaman</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Timer />
      <Question />
    </div>
  );
};

export default Quiz;