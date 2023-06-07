import { Link } from 'react-router-dom';

const Footer = () => {

    const year = new Date().getFullYear();
  
    return (
        <div className="footer">
            <div className="footer-left">
                <p>{`Copyright © Twenny ${year}`}</p>
            </div>
            <div className="footer-right">
                <div className="footer-links">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/sitemap">Sitemap</Link>
                    <Link to="/contactus">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}
  
export default Footer;