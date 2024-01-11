import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../images/LogoMakr-8w9wRe.png'

const Footer = () => {

    const year = new Date().getFullYear();
    const [isActive, setisActive] = useState(Array(4).fill(false));
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setisActive(Array(4).fill(false));
        }
      };
  
      document.addEventListener('click', handleOutsideClick);
  
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);

    const handleClick = (index) => {
        setisActive((prevState) => {
          const updatedState = [...prevState];
          updatedState[index] = !prevState[index];
          return updatedState;
        });
      };

      return (
        <div className="footer">
          <div className="footer-links" ref={dropdownRef}>
            <div className="logo"><img src={logoImage} alt="logo" /></div>
            <div className="tos">
              <div className="title" onClick={() => handleClick(0)}>
                Terms and Policies
                {isActive[0] && (
                    <span className="mobile-icon">&times;</span> // Cross
                )}
                {!isActive[0] && (
                    <span className="mobile-icon">&#9660;</span> // Down Arrow
                )}
              </div>
              <div className={isActive[0] ? '' : 'hide'}>
                <Link to="/terms" className="terms">Terms of Service</Link>
                <Link to="/privacy" className="privacy">Privacy Policy</Link>
                <Link to="/cookies" className="cookies">Cookie Policy</Link>
              </div>
            </div>
            <div className="company">
              <div className="title" onClick={() => handleClick(1)}>
                Company
                {isActive[1] && (
                    <span className="mobile-icon">&times;</span>
                )}
                {!isActive[1] && (
                    <span className="mobile-icon">&#9660;</span>
                )}
              </div>
              <div className={isActive[1] ? '' : 'hide'}>
                <Link to="/" className="home">Home</Link>
                <Link to="/about" className="about">About Us</Link>
                <Link to="/contactus" className="contactus">Contact Us</Link>
              </div>
            </div>
            <div className="contact">
              <div className="title" onClick={() => handleClick(2)}>
                Contact
                {isActive[2] && (
                    <span className="mobile-icon">&times;</span> 
                )}
                {!isActive[2] && (
                    <span className="mobile-icon">&#9660;</span>
                )}
              </div>
              <div className={isActive[2] ? '' : 'hide'}>
                <p>(+44)749 645 4598</p>
                <p>twennyCommunications@gmail.com</p>
              </div>
            </div>
            <div className="location">
              <div className="title" onClick={() => handleClick(3)}>
                Location
                {isActive[3] && (
                    <span className="mobile-icon">&times;</span> 
                )}
                {!isActive[3] && (
                    <span className="mobile-icon">&#9660;</span>
                )}
              </div>
              <div className={isActive[3] ? '' : 'hide'}>
                <p>London | Edinburgh</p>
                <p>Streatham | Newhaven</p>
                <p>DL3 BDE</p>
                <p>team@twenny.org</p>
              </div>
            </div>
          </div>
            <div className="footer-bottom">
                <div className="icons">
                <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="mailto:twennyCommunications@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
              </div>
                <div className="line"></div>
                <div className="copyright">
                    <p>{`Copyright © ${year} Twenny Ltd. All Rights Reserved`}</p>
                </div>
            </div>
        </div>
    )
}
  
export default Footer;