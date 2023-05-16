import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [telephone, setTelephone] = useState("");

  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name, addressOne, addressTwo, telephone);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

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

      <div className="form-group">
        <label>Name:</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Address Line One:</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => setAddressOne(e.target.value)}
          value={addressOne}
        />
      </div>

      <div className="form-group">
        <label>Address Line Two:</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => setAddressTwo(e.target.value)}
          value={addressTwo}
        />
      </div>

      <div className="form-group">
        <label>Telephone:</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => setTelephone(e.target.value)}
          value={telephone}
        />
      </div>

      <button className="submit-button" disabled={isLoading} type="submit">
        Sign Up
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
