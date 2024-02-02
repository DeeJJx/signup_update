import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useProductSelectionContext } from '../hooks/useProductSelectionContext';
import { useUpdate } from '../hooks/useUpdate';

const OrderSuccess = () => {
  const {user} = useAuthContext();
  const {product, productDispatch} = useProductSelectionContext();
//   console.log(product)
  const {update} = useUpdate();

  
  const [userDetails, setUserDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');
  const cancelled = searchParams.get('cancelled');
  const navigate = useNavigate();
  const productObj = JSON.parse(localStorage.getItem('productId'));
  

    useEffect(() => {
        // Redirect if success or cancelled parameters are missing
        if (!success && !cancelled) {
        navigate('/order-preview'); // Replace '/' with the desired redirect path
        } 
    }, [success, cancelled, navigate]);

    useEffect(() => {
        const createNextApp = async (productName, userId) => {
            const response = await fetch(`/api/gen/next-gen`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    //needs to be dynamic & based on the site type purchased
                    // "appName": `${user.token}-siteType`,
                    "appName": `${productName}-site-${userId}`,
                    "uniqueId": userId
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

        productDispatch({type: 'UPDATE', payload: productObj.siteType})

        if(user && product){
            //SET user detail array to send confirmation
            const userDetailsArray = Object.values(JSON.parse(localStorage.getItem('userDetails')));
            setUserDetails(userDetailsArray);
            // return;
            //update DB with product siteType
            update({siteType: product})
            createNextApp(product.toLowerCase(), user.id);
            // localStorage.removeItem('productId');
            // productDispatch({ type: 'DELETE' });
        }     
        // missing dependencies causing infinite loop (product, update, userDetails)
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [user, product])

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
            // console.log(userDetails)
            // emailConfirmation(userDetails);
        }
    }, [userDetails]);


  return (
    <div>
      {success === 'true' ? <div>Order success</div> : <div>Order cancelled</div>}
    </div>
  );
};

export default OrderSuccess;
