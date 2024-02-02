import image from '../images/bricky.jpg';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from "react";
import DomainSearchBar from '../components/DomainSearchBar';
import { useProductSelectionContext } from '../hooks/useProductSelectionContext';



const OrderPreview = () => {
  const productId = JSON.parse(localStorage.getItem("productId")).productId || "empty product ID";
  const {product} = useProductSelectionContext();
  console.log(product)
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState({});


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

    if (user && product) {
      // fetchUserDetails();
      setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
      // localStorage.setItem('tempProduct', product)
    }
  }, [user, product]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/stripe/create-checkout-session', {
        method: 'POST',
        // mode: "no-cors", // no-cors, *cors, same-origin
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productId}),
      });
  
      if (response.ok) {
        console.log('Request sent successfully');
        const { url } = await response.json();

          // Redirect the user to the Stripe Checkout page
          console.log('about to send to url')
          window.location.href = url;

      } else {
        console.log('Request failed');
      }
    } catch (error) {
      console.log('Error occurred during the request', error);
    }
  }

  return (
    <section className='order-preview-page'>
      <div className="product">
        <img
          src={image}
          alt="The brick covered background"
          className='order-preview-image'
        />
        <div className="description">
        <h3>{product} Site Template</h3>
        <h5>£19.98</h5>
        <div className='price-breakdown'>
            <p>Domain: 15.99 ||</p>
            <p>Monthly: 3.99</p>
        </div>
        <h3>Find your perfect site name using our tool below</h3>
        <DomainSearchBar />
        </div>
      </div>
      {user && (
        <div>
          <h2>See below details that will be displayed on site!</h2>
          <p>Name: {userDetails.name}</p>
          <p>Address Line One: {userDetails.addressOne}</p>
          <p>Address Line Two: {userDetails.addressTwo}</p>
          <p>Telephone: {userDetails.telephone}</p>
        </div>
      )}
      {user ? (
          <form onSubmit={handleSubmit}>
          <button type="submit">
            Checkout
          </button>
        </form>
      ) : (
        <div>
          To make this purchase please sign up for an account.
        </div>
      )}

    </section>
  )  
};

export default OrderPreview;


// const OrderPreview = () => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="api/stripe/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// export default OrderPreview; 