import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext.jsx';

const Question = () => {
  const {
    questions,
    currentQuestion,
    answers,
    setAnswers,
    setCurrentQuestion,
    setTimeLeft
  } = useContext(QuizContext);

  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  const question = questions[currentQuestion];
  const userAnswer = answers[currentQuestion]?.answer;

  // Fungsi untuk mendekode HTML entities dan URL encoding
  const decodeContent = (html) => {
    // Buat elemen textarea untuk decode HTML entities
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    
    // Decode URL encoding
    const decoded = decodeURIComponent(txt.value);
    
    return decoded;
  };

  // Acak opsi hanya sekali saat pertanyaan dimuat
  useEffect(() => {
    if (!question) return;
    
    let options = [];
    
    if (question.type === 'boolean') {
      options = ['True', 'False'];
    } else {
      options = [...question.incorrect_answers, question.correct_answer];
      
      // Acak opsi menggunakan Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
    }
    
    setShuffledOptions(options);
  }, [question]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: question.question,
      answer,
      correctAnswer: question.correct_answer
    };
    setAnswers(newAnswers);

    // Pindah ke pertanyaan berikutnya
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setTimeLeft(0); // Selesaikan kuis jika sudah di pertanyaan terakhir
      }
    }, 300);
  };

  if (!question) {
    return <div>Memuat pertanyaan...</div>;
  }

  return (
    <div className="question-container">
      <div className="progress">
        Pertanyaan {currentQuestion + 1} dari {questions.length}
      </div>
      
      <h2>{decodeContent(question.question)}</h2>
      
      <div className="options">
        {shuffledOptions.map((option, index) => {
          const decodedOption = decodeContent(option);
          return (
            <button
              key={index}
              className={`option ${userAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswer(option)}
            >
              {decodedOption}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;