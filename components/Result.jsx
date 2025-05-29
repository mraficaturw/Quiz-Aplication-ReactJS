import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const Result = () => {
  const { 
    user, 
    questions, 
    answers, 
    logout, 
    resetQuiz,
    timeLeft
  } = useContext(QuizContext);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((ans, index) => {
      if (ans.answer === questions[index].correct_answer) {
        correct++;
      }
    });
    return {
      correct,
      incorrect: answers.length - correct,
      unanswered: questions.length - answers.length
    };
  };

  const { correct, incorrect, unanswered } = calculateScore();
  
  // Format waktu yang tersisa
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="result-container">
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
      
      <div className="result-header">
        <h1>Hasil Kuis</h1>
        <h2>Peserta: {user}</h2>
      </div>
      
      <div className="summary">
        <div className="summary-card correct">
          <h3>Benar</h3>
          <p>{correct}</p>
        </div>
        
        <div className="summary-card incorrect">
          <h3>Salah</h3>
          <p>{incorrect}</p>
        </div>
        
        <div className="summary-card unanswered">
          <h3>Tidak Dijawab</h3>
          <p>{unanswered}</p>
        </div>
        
        <div className="summary-card time">
          <h3>Waktu Tersisa</h3>
          <p>{formatTime(timeLeft)}</p>
        </div>
      </div>
      
      <div className="answers-summary">
        <h3>Detail Jawaban:</h3>
        
        <div className="answers-list">
          {questions.map((q, index) => {
            const userAnswer = answers[index]?.answer || 'Tidak dijawab';
            const isCorrect = userAnswer === q.correct_answer;
            
            return (
              <div 
                key={index} 
                className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="question-number">Pertanyaan {index + 1}</div>
                <div className="question-text">{q.question}</div>
                <div className="user-answer">
                  <strong>Jawaban Anda:</strong> {userAnswer}
                </div>
                {!isCorrect && (
                  <div className="correct-answer">
                    <strong>Jawaban Benar:</strong> {q.correct_answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <button className="finish-button" onClick={resetQuiz}>
        Selesai
      </button>
    </div>
  );
};

export default Result;