import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";


const OrderSuccess = () => {
  const {user} = useAuthContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');
  const cancelled = searchParams.get('cancelled');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if success or cancelled parameters are missing
    if ((!success && !cancelled)) {
      navigate('/order-preview'); // Replace '/' with the desired redirect path
    } else {

        const emailConfirmation = async (req, res) => {

    }


    }
  }, [success, cancelled, navigate, user]);

  return (
    <div>
      {success === 'true' ? <div>Order success</div> : <div>Order cancelled</div>}
    </div>
  );
};

export default OrderSuccess;
