import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>
        Have questions or need assistance? We're here to help! Whether you're a skilled tradesperson looking to enhance your online presence or you have inquiries about our website creation platform, our team is ready to assist you.
      </p>
      <p>
        Reach out to us using the contact form below or simply drop us an email. We value your feedback and are committed to providing a seamless experience for all our users.
      </p>
      <p>
        Let's build a strong online presence for your trade and attract new clients together!
      </p>

      <div className="email-us-box">
        <h3>Email Us</h3>
        <p>Send us an email at <a href="mailto:twenny@gmail.com">twenny@gmail.com</a> and our team will get back to you promptly.</p>
      </div>

      {/* You can add the contact form component here */}
      {/* Add the necessary form fields and logic to handle form submissions */}
    </div>
  );
};

export default ContactUs;