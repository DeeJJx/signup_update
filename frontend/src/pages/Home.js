import React, { useState } from 'react';
import buildersImage from '../images/builders.jpg';

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
    <div className="hero">
      <div className="hero-content">
        <h1>Websites that work as hard as you do</h1>
        <p>Are you a skilled tradesperson looking to enhance your online presence and expand your business reach?</p>
        <p>Twenny is here to revolutionize the way trade professionals showcase their expertise and attract new clients.</p>
        <div className="hero-actions">
          <img src={buildersImage} alt="builders" />
          <button className="hero-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
