const updateUserDetails = async (
    userId,
    name,
    addressOne,
    addressTwo,
    telephone,
    facebook,
    twitter,
    instagram
  ) => {
    const response = await fetch(`/api/user/${userId}`, {
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
      throw new Error(json.error || "Failed to update user details");
    }
  
    return json;
};

const updateUserSkills = async (
    userId,
    intro,
    skillsList,
    skillsDescription
  ) => {
    const response = await fetch(`/api/user/${userId}`, {
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
      throw new Error(json.error || "Failed to update user details");
    }
  
    return json;
};

export  { updateUserDetails, updateUserSkills };