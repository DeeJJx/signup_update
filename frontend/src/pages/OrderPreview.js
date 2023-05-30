import image from '../images/bricky.jpg';
import axios from "axios";


const OrderPreview = () => {
  const productId = localStorage.getItem("productId") || "empty product ID";

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
    <section>
      <div className="product">
        <img
          src={image}
          alt="The brick covered background"
          className='order-preview-image'
        />
        <div className="description">
        <h3>Brick Layer Site</h3>
        <h5>$19.99</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Checkout
        </button>
      </form>
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