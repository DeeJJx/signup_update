import React from 'react';
import builderLaptopImage from '../images/builder-laptop.jpg'
import usImage from '../images/us.png'
import codingImage from '../images/coding.jpg'
import cementImage from '../images/cement.jpg'

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-header">
                <h2>Welcome to Twenny</h2>
                <p>Where we believe that every skilled tradesperson deserves an exceptional online presence.</p>
            </div>
            <div className="about-us-content">
                <div className="mission">
                    <div className="mission-image"><img src={builderLaptopImage} alt="builder-laptop" /></div>
                    <div className="mission-text">
                        <h3>Our Mission</h3>
                        <p>
                            At Twenny, our mission is simple yet powerful: to provide tradespeople with an effortless and cost-effective way to set up their own professional websites.
                            We understand that in today's digital age, having a strong online presence is crucial for reaching new clients and growing your business.
                            That's why we've created a user-friendly platform tailored specifically to the needs of skilled tradespeople like you.
                        </p>
                    </div>
                </div>
                <div className="meet-founders">
                    <div className="meet-text">
                        <h3>Meet the Founders</h3>
                        <p>
                            Let us introduce the faces behind Twenny: James, 27, and Daniel, 28. Hailing from the town of Darlington in the UK, these two web development wizards have been inseparable since their secondary school days.
                            With a shared dream of empowering tradespeople to showcase their expertise, they combined their technical prowess and entrepreneurial spirit to create Twenny.
                        </p>
                    </div>
                    <div className="meet-image"><img src={usImage} alt="us" /></div>
                </div>
                <div className="core-values">
                    <div className="core-image"><img src={codingImage} alt="coding" /></div>
                    <div className="core-text">
                        <h3>Our Core Values</h3>
                        <p>
                            At Twenny, we believe in transparency, simplicity, and unwavering support for our users. We're committed to providing you with a seamless website creation experience, personalized feedback, and easy accessibility.
                            Your success is our success, and we're dedicated to being there for you every step of the way.
                        </p>
                    </div>
                </div>
                <div className="why-choose">
                    <div className="why-choose-text">
                        <h3>Why Choose Twenny?</h3>
                        <p>
                            Our platform stands out for one simple reason: it's designed by tradespeople, for tradespeople.
                            We understand the challenges you face, which is why we've made setting up your website as easy as using your favorite tools.
                            No coding skills? No problem! Twenny's intuitive interface empowers you to craft a stunning website that highlights your skills and attracts potential clients.
                        </p>
                    </div>
                    <div className="why-choose-image"><img src={cementImage} alt="cement" /></div>
                </div>
                <div className="testimonials">
                    <h3>Testimonials (Coming Soon)</h3>
                    <p>
                        We're excited to share the success stories of tradespeople who have already embraced Twenny to transform their online presence.
                        Keep an eye on this space as we launch and gather feedback from our valued users.
                    </p>
                </div>
                <div className="social-impact">
                    <h3>Our Social Impact (Coming Soon)</h3>
                    <p>
                        At Twenny, we're driven not only by business goals but also by the desire to make a positive impact on the community.
                        We're actively exploring opportunities to give back and support causes that matter.
                    </p>
                </div>
            </div>
            <div className="contact-us">
                <h2>Thank you for joining us on this journey to revolutionize the way trade professionals showcase their expertise. We can't wait to see your business thrive with Twenny.</h2>
                <p>For any inquiries or feedback, don't hesitate to reach out. We're here to help you shine online.</p>
                <p><em>Stay tuned for the launch of Twenny, your go-to platform for creating exceptional websites that work as hard as you do.</em></p>
                <button>Contact us</button>
            </div>
        </div>
    )
}

export default AboutUs;
