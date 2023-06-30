import { Link } from 'react-router-dom';

const Footer = () => {

    const year = new Date().getFullYear();
  
    return (
        <div className="footer">
            <div className="footer-links">
                <div className="logo">Twenny</div>
                <div className="tos">
                    <div className="title">Terms and Policies</div>
                    <Link to="/terms" className="terms">Terms of Service</Link>
                    <Link to="/privacy" classNamer="privacy">Privacy Policy</Link>
                </div>
                <div className="company">
                    <div className="title">Company</div>
                    <Link to="/home" className="home">Home</Link>
                    <Link to="/aboutus" className="about">About Us</Link>
                    <Link to="/contactus" className="contactus">Contact Us</Link>
                </div>
                <div className="contact">
                    <div className="title">Contact</div>
                    <p>(+44)749 645 4598</p>
                    <p>twenny@gmail.com</p>
                </div>
                <div class Name="location">
                    <div className="title">Location</div>
                    <p>London | Edinburgh</p>
                    <p>Streatham | Newhaven</p>
                    <p>DL3 BDE</p>
                    <p>team@twenny.org</p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="icons">
                    FB IG IN MAIL TWITTER 
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