import React, { useState } from 'react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const signup = async (email) => {
    setIsLoading(true);
    // setError(null);

    const response = await fetch('/api/early-access/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    })
    const json = await response.json();

    if(!response.ok){
        setIsLoading(false);
        setError(json.error);
    }

    if(response.ok){
      setError('Email submitted successfully')
      setIsLoading(false);
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email)
    // TODO: Implement email signup functionality
    // Send the email to the registered users
    // Provide access to the SaaS when the MVP is ready
    console.log(`Email: ${email}`);
  };

  return (
    <div className="home-container">
      <div className="info-container">
        <h1>Welcome to the Twenny</h1>
        <p>
          Twenny is a powerful SaaS product designed specifically for professionals in trade jobs such as plumbers, bricklayers, and landscapers. Our platform enables you to establish an online presence effortlessly.
        </p>
        <p>
          With Twenny, you can purchase a web domain for just 19.99 and easily host your own personalized landing page. Showcase your skills and services to potential clients by providing them with your relevant contact information, including your name, address, email, telephone number, and social media handles.
        </p>
        <p>
          Join Twenny today and unlock the potential to expand your business online. Sign up here to receive updates and gain early access to our platform when it is ready.
        </p>
      </div>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" disabled={isLoading}>Sign Up</button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Home;
