import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { React } from "react";



const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    // Perform login logic here
  };

  return (
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button disabled={isLoading} className="submit-button" type="submit">
          Log In
        </button>
        {error && <div>{error}</div>}
      </form>
  );
};

export default LoginComponent;