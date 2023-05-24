import image from '../images/bricky.jpg';
import { useLocation } from "react-router-dom";

const OrderPreview = () => {
  const location = useLocation();
  const productId = location.state?.productId || 'emptyProductId';

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = { productId }; // Replace 'productId' with the actual value or variable that holds the product ID
  
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Request sent successfully');
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