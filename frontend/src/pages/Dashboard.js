import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

//context & useUpdate not required? kept changing user context and logging user out essentially
// import { useUpdate } from "../hooks/useUpdate";


const Dashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const {user} = useAuthContext();

    //FORM STUFF
    const [name, setName] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [telephone, setTelephone] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [isLoading, setIsLoading] = useState("");
  
    // const {update, error, isLoading} = useUpdate();

    const resetForm = () => {
        setName("");
        setAddressOne("");
        setAddressTwo("");
        setTelephone("");
        setFacebook("");
        setTwitter("");
        setInstagram("");
      };

    const update = async (name, addressOne, addressTwo, telephone, facebook, twitter, instagram) => {
        setIsLoading(true);
        // setError(null);

        const response = await fetch(`/api/user/${user.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, addressOne, addressTwo, telephone, facebook, twitter, instagram})
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            // setError(json.error);
        }

        if(response.ok){
            //keep form state equal to details state
            setName(json.name);
            setAddressOne(json.addressOne);
            setAddressTwo(json.addressTwo);
            setTelephone(json.telephone);
            setFacebook(json.facebook);
            setTwitter(json.twitter);
            setInstagram(json.instagram);

            //set details state
            const userDetailsArray = Object.values(json);
            setUserDetails(userDetailsArray);

            setIsLoading(false);
            resetForm();
        }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await update(name, addressOne, addressTwo, telephone, facebook, twitter, instagram);
    };

    useEffect(() => {
        const fetchUserDetails = async() => {
            const response = await fetch(`/api/user/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json();

            if(response.ok){
                const userDetailsArray = Object.values(json); // Convert JSON object to an array
                setUserDetails(userDetailsArray);    
            }
        }

        if(user){
            fetchUserDetails();
        }        
    }, [user])

    return (
        <div>
            <h3>Dashboard</h3>
            {userDetails.length > 0 && userDetails.map((detail, index) => (
                <p key={index}>{detail}</p>
            ))}
            <div className="form-container">
                <form className="signup" onSubmit={handleSubmit}>
                    <h3>Update</h3>

                    <div className="form-group">
                        <label>Name:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address Line One:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setAddressOne(e.target.value)}
                        value={addressOne}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address Line Two:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setAddressTwo(e.target.value)}
                        value={addressTwo}
                        />
                    </div>

                    <div className="form-group">
                        <label>Telephone:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setTelephone(e.target.value)}
                        value={telephone}
                        />
                    </div>

                    <div className="form-group">
                        <label>Facebook URL:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setFacebook(e.target.value)}
                        value={facebook}
                        />
                    </div>

                    <div className="form-group">
                        <label>Twitter URL:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setTwitter(e.target.value)}
                        value={twitter}
                        />
                    </div>

                    <div className="form-group">
                        <label>Instagram URL:</label>
                        <input
                        className="form-input"
                        type="text"
                        onChange={(e) => setInstagram(e.target.value)}
                        value={instagram}
                        />
                    </div>

                    <button className="submit-button" disabled={isLoading} type="submit">
                        Update details
                    </button>
                    {/* {error && <div>{error}</div>} */}
                    </form>
            </div>
        </div>
    )
}

export default Dashboard;