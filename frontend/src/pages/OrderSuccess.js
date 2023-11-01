import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useProductSelectionContext } from '../hooks/useProductSelectionContext';

const OrderSuccess = () => {
  const {user} = useAuthContext();

  const {product} = useProductSelectionContext();
  console.log(product)
  
  const [userDetails, setUserDetails] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');
  const cancelled = searchParams.get('cancelled');
  const navigate = useNavigate();

    useEffect(() => {
        // Redirect if success or cancelled parameters are missing
        if (!success && !cancelled) {
        navigate('/order-preview'); // Replace '/' with the desired redirect path
        } 
    }, [success, cancelled, navigate]);

    useEffect(() => {
        const fetchUserDetails = async() => {
            const response = await fetch(`/api/user/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json();

            if(response.ok){
                console.log(json);
                const userDetailsArray = Object.values(json); // Convert JSON object to an array
                setUserDetails(userDetailsArray);    
                console.log(userDetails);
            }
        }

        const createNextApp = async () => {
            const response = await fetch(`/api/gen/next-gen`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    //needs to be dynamic & based on the site type purchased
                    // "appName": `${user.token}-siteType`,
                    "appName": `${product}-site-${user.id}`,
                    "uniqueId": user.id
                })
            })

            const json = await response.json();

            if(!response.ok){
                 console.log(json.error);
            }
    
            if(response.ok){
                console.log('site created')
            }
        }

        if(user){
            fetchUserDetails();
            createNextApp();
        }        
    }, [user])

    const emailConfirmation = async (userDetails) => {
        const response = await fetch(`/api/email/send-confirmation`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userDetails})
        })
        const json = await response.json();

        if(!response.ok){
             console.log(json.error);
        }

        if(response.ok){
            console.log('email sent')
        }
    }

    useEffect(() => {
        if (userDetails && userDetails.length > 0) {
            emailConfirmation(userDetails);
        }
    }, [userDetails]);


  return (
    <div>
      {success === 'true' ? <div>Order success</div> : <div>Order cancelled</div>}
    </div>
  );
};

export default OrderSuccess;
