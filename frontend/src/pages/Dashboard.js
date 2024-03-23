import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import SkillMenu from "../components/SkillMenu";
// import { useProductSelectionContext } from "../hooks/useProductSelectionContext";

//context & useUpdate not required? kept changing user context and logging user out essentially
// import { useUpdate } from "../hooks/useUpdate";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userSkills, setUserSkills] = useState({});
  const { user } = useAuthContext();

  // const {product} = useProductSelectionContext();

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

  const updateUserDetails = async (
    name,
    addressOne,
    addressTwo,
    telephone,
    facebook,
    twitter,
    instagram
  ) => {
    setIsLoading(true);
    // setError(null);

    const response = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        addressOne,
        addressTwo,
        telephone,
        facebook,
        twitter,
        instagram,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      // setError(json.error);
    }

    if (response.ok) {
      //keep form state equal to details state
      setName(json.name);
      setAddressOne(json.addressOne);
      setAddressTwo(json.addressTwo);
      setTelephone(json.telephone);
      setFacebook(json.facebook);
      setTwitter(json.twitter);
      setInstagram(json.instagram);

      //set details state
      const userDetailsObj = {
        user: json["user"],
        name: json["name"],
        addressOne: json["addressOne"],
        addressTwo: json["addressTwo"],
        facebook: json["facebook"],
        twitter: json["twitter"],
        instagram: json["instagram"],
        siteType: json["siteType"],
        subscriptionId: json["subscriptionId"]
      }
      setUserDetails(userDetailsObj);

      setIsLoading(false);
      resetForm();
    }
  };

  const updateUserSkills = async (
    intro,
    skillsList,
    skillsDescription
  ) => {
    setIsLoading(true);
    // setError(null);

    const response = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intro,
        skillsList,
        skillsDescription
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      // setError(json.error);
    }

    if (response.ok) {
      //keep form state equal to skills state
      console.log(json)

      //set skills state
      const userSkillsObj = {
        intro: json["intro"],
        skillsList: json["skillsList"],
        skillsDescription: json["skillsDescription"]
      }
      setUserSkills(userSkillsObj);

      setIsLoading(false);
      //not reset form but update form fields to reflect options - prefill
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(
      name,
      addressOne,
      addressTwo,
      telephone,
      facebook,
      twitter,
      instagram
    );
  };

  const handleSkillSubmit = async (formData) => {
    console.log("form data", formData);
    //create new update function which only passes formData
    const intro = formData["introText"];
    const skillsList = formData["selectedSkills"];
    const skillsDescription = formData["skillText"];
    // formData.preventDefault();
    await updateUserSkills(intro, skillsList, skillsDescription);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const response = await fetch(`/api/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (response.ok) {
          const userDetailsObj = {
            user: json["user"],
            name: json["name"],
            addressOne: json["addressOne"],
            addressTwo: json["addressTwo"],
            facebook: json["facebook"],
            twitter: json["twitter"],
            instagram: json["instagram"],
            siteType: json["siteType"],
            subscriptionId: json["subscriptionId"]
          }

          setUserDetails(userDetailsObj);
          localStorage.setItem("userDetails", JSON.stringify(json));

          const userSkillsObj = {
            intro: json["intro"],
            skillsList: json["skillsList"],
            skillsDescription: json["skillsDescription"]
          }
          setUserSkills(userSkillsObj);

        }
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div className="dashboard-page">
      <section className="user-details">
        <div className="user-details-container">
          <h3>Dashboard - Template {userDetails["siteType"]}</h3>
          <ul className="user-details-list">
          {Object.keys(userDetails).map(detail => {
            if(detail === "subscriptionId"){
              return;
            } else {
              return <div key={detail}>
                      {userDetails[detail]}
                     </div>
            }
          })}
            <a
              href="https://billing.stripe.com/p/login/test_14k5lH1ot4kxaT68ww"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stripe Portal
            </a>
          </ul>
        </div>
        <div className="form-container">
          <form className="signup" onSubmit={handleDetailsSubmit}>
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

            <button
              className="submit-button"
              disabled={isLoading}
              type="submit"
            >
              Update details
            </button>
            {/* {error && <div>{error}</div>} */}
          </form>
        </div>
      </section>
        <SkillMenu
          onSkillSubmit={handleSkillSubmit}
        />
        <section className="skills-section">
          {Object.keys(userSkills).map(skill => {
            //if not string then will be array
            if(typeof userSkills[skill] !== "string"){
              return (
                <div key={skill} className={`${skill}-container`}>
                {userSkills[skill].map((skillItem, index) => (
                    <div key={index} className={`${skill}-item`}>
                        {skillItem}{index}
                    </div>
                ))}
            </div>
              )
            } else {
              return <div key={skill} className='skill-text'>
              {userSkills[skill]}
            </div>
            }
          })}
        </section>
    </div>
  );
};

export default Dashboard;