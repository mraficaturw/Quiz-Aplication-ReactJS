import { useContext, useEffect } from 'react'; // Tambahkan useEffect di sini
import { QuizContext } from '../context/QuizContext.jsx';

const HomePage = () => {
  const { user, logout, startQuiz, resetQuiz } = useContext(QuizContext);

  // Reset state kuis setiap kali masuk ke homepage
  useEffect(() => {
    resetQuiz();
  }, [resetQuiz]); // Tambahkan resetQuiz ke dependency array

  return (
    <div className="home-page">
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
      
      <div className="welcome-container">
        <h1>Selamat Datang, {user}!</h1>
        <p>Siap untuk menguji pengetahuan Anda?</p>
        
        <button className="start-button" onClick={startQuiz}>
          Mulai Kuis
        </button>
      </div>
    </div>
  );
};

export default HomePage;