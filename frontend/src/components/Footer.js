import { Link } from 'react-router-dom';

const Footer = () => {

    const year = new Date().getFullYear();
  
    return (
        <div className="footer">
            <div className="footer-left">
                <p>{`Copyright © Twenny ${year}`}</p>
            </div>
            <div className="footer-right">
                <h5>Privacy</h5>
                <h5>Terms</h5>
                <h5>Sitemap</h5>
                <h5>Contact Us</h5>
            </div>
        </div>
    )
}
  
export default Footer;