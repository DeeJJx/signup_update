import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); //Checks for valid email address
  const [isEmailTouched, setIsEmailTouched] = useState(false); //Checks to see if email input has been interacted with, invalid email message won't display unless email inputted

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('api/email/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      //console log to test email functionality working correctly

      if (response.ok) {
        setIsEmailSent(true);
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      await sendEmail();
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }  
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => setIsEmailTouched(true)}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        />
        {!isEmailValid && isEmailTouched && (
          <p className="validation-error">Please enter a valid email address</p>
        )}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send Message</button>
      {isSubmitted && isEmailSent && (<p className="submission-confirmation">Thank you for your message. We will get back to you soon.</p>)}
      {isSubmitted && !isEmailSent &&(<p className="submission-error">Something went wrong. Please try again later or email us at: twennyCommunications@gmail.com</p>)}
    </form>
  );
};

export default ContactForm;
