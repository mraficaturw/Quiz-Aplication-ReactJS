import { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(QuizContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password) {
      setError('Username dan password harus diisi');
      return;
    }
    
    const success = login(username, password);
    
    if (!success) {
      setError('Username atau password salah');
      return;
    }
    
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login Quiz App</h1>
        <p>Gunakan username: <strong>admin</strong> dan password: <strong>1234</strong></p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              autoComplete="off"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;