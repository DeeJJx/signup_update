import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import buildersImage from '../images/builders.jpg';
import usImage from '../images/us.png'
import electricianImage from '../images/electrician.png'
import plumberImage from '../images/plumber.png'
import landscaperImage from '../images/landscaper.png'
import card1Image from '../images/card-1.png'
import card2Image from '../images/card-2.png'
import card3Image from '../images/card-3.png'
import laptopImage from '../images/laptop.png'
import drillImage from '../images/drill.png'

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
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Websites that work as hard as you do</h1>
          <p>Are you a skilled tradesperson looking to enhance your online presence and expand your business reach?</p>
          <p>Twenny is here to revolutionize the way trade professionals showcase their expertise and attract new clients.</p>
          <div className="hero-actions">
            <button className="hero-button">Get Started</button>
            <img src={buildersImage} alt="builders" />
          </div>
        </div>
      </div>
      <div className="about">
        <div className="about-header">
          <h5>About Us</h5>
          <h2>Our Team</h2>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src={usImage} alt="us" />
          </div>
          <div className="about-text">
            <p>Our founders, James and Dan, come from working-class backgrounds and understand the value of having big ol muscles. They also understand that working in trades leaves little time for messing around with websites, which is why they founded Twenny.</p>
            <p>With Twenny, you'll enjoy a hassle-free experience from start to finish. Our easy-to-use website creation platform is specifically designed for tradespeople like you. No coding skills? No problem! We've simplified the process so you can focus on what you do best—providing exceptional services</p>
            <div className="about-buttons">
              <Link to="/about"><button className="about-button">About Us</button></Link>
              <Link to="/about"><button className="story-button">Our Story</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio">
        <div className="port-header">
          <h5>Our Portfolio</h5>
          <h2>What do we do</h2>
          <p>Choose from our custom website templates tailored to your trade - set up and ready to go the same day</p>
        </div>
        <div className="port-images">
          <div className="port-item">
            <img src={electricianImage} alt="electrician" />
            <h3 className="item-title">Electrician</h3>
          </div>
          <div className="port-item">
            <img src={plumberImage} alt="plumber" />
            <h3 className="item-title">Plumber</h3>
          </div>
          <div className="port-item">
            <img src={landscaperImage} alt="landscaper" />
            <h3 className="item-title">Landscaper</h3>
          </div>
        </div>
        <Link to="/templates"><button className="template-button">See All Templates</button></Link>
      </div>
      <div className="testimonials">
        <div className="test-header">
          <h5>Testimonials</h5>
          <h2>People talk about us</h2>
        </div>
        <div className="test-cards">
          <img src={card1Image} alt="card-1" />
          <img src={card2Image} alt="card-2" />
          <img src={card3Image} alt="card-3" />
        </div>
      </div>
      <div className="getting-started">
        <div className="start-text">
          <h2>Interested in getting started?</h2>
          <p>Professionally Designed Templates: Choose from a wide range of stunning, industry-specific website templates tailored to trade professionals. Each template is meticulously crafted to highlight your skills, showcase your previous projects, and captivate potential clients.</p>
          <button className="create-button">Create Website</button>
        </div>
        <div className="start-images">
          <img src={laptopImage} alt="laptop" />
          <img src={drillImage} alt="drill" />
        </div>
      </div>
    </div>  
  );
};

export default Home;
