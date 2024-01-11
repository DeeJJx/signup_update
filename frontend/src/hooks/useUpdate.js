import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdate = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {user, dispatch} = useAuthContext();

    const update = async ({name, addressOne, addressTwo, telephone, facebook, twitter, instagram, siteType}) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/user/${user.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, addressOne, addressTwo, telephone, facebook, twitter, instagram, siteType})
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok){
            // save user to local storage
            // localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            // dispatch({type: 'UPDATE_USER', payload: json})
            console.log('updated in DB', json)

            setIsLoading(false);
        }
    }

    return { update, isLoading, error}
}