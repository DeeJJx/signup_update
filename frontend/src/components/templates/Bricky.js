import { useAuthContext } from '../../hooks/useAuthContext';
import { useProductSelectionContext } from '../../hooks/useProductSelectionContext';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bricky = () => {
  const { user } = useAuthContext();
  const { productState, productDispatch } = useProductSelectionContext();

  const [userDetails, setUserDetails] = useState({});

  const handleProductSelection = () => {
    productDispatch({type: "UPDATE", payload: "Brick-Layer"})
    const productSelection = {
      productId: "bricky_id",
      siteType: "Brick-Layer"
    }
    localStorage.setItem("productId", JSON.stringify(productSelection));
  }

  useEffect(() => {
    // const fetchUserDetails = async () => {
    //   const response = await fetch(`/api/user/${user.id}`, {
    //     headers: {
    //       'Authorization': `Bearer ${user.token}`
    //     }
    //   });

    //   const json = await response.json();
    //   console.log(json);

    //   if (response.ok) {
    //     setUserDetails(json);
    //   }
    // };

    if (user) {
      // fetchUserDetails();
      setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
    }
  }, [user]);

  return (
    <div className="bricky-container">
      <div className="bricky-background-image"></div>
      <div className="bricky-form-container">
        <textarea placeholder={user ? userDetails.user : 'Email'} className="bricky-input"></textarea>
        <textarea placeholder={user ? userDetails.name : 'Name'} className="bricky-input"></textarea>
        <textarea placeholder={user ? userDetails.addressOne : 'Address Line 1'} className="bricky-input"></textarea>
        <textarea placeholder={user ? userDetails.addressTwo : 'Address Line 2'} className="bricky-input"></textarea>
        <textarea placeholder={user ? userDetails.telephone : 'Telephone'} className="bricky-input"></textarea>

        {/* Testimonials section */}
        <div className="bricky-testimonials">
          <h3 className="testimonials-heading">Testimonials</h3>
          <div className="testimonial">
            <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="testimonial-author">- John Doe</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="testimonial-author">- Jane Smith</p>
          </div>
          {/* Add more testimonials as needed */}
        </div>

        {/* Buy Now button */}
        <Link to={{ 
          pathname: "/order-preview",
        }}
        className="buy-now-link"
        onClick={handleProductSelection}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default Bricky;
