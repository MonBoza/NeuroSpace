import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ signInUser, userName, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(userName);
  console.log(token);

  useEffect(() => {
    console.log(userName);
    const checkTokenAndFetchProfile = async () => {
    
      try {
        // Check if the token is valid by making a request to the test_token endpoint
        const tokenResponse = await axios.get("http://127.0.0.1:8000/test_token", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
          console.log(tokenResponse);
        if (tokenResponse.status === 200) {
          // Token is valid, fetch the user profile data
          const profileResponse = await axios.get(`http://127.0.0.1:8000/userprofile/${userName}`, {
    
          });
          setUserProfile(profileResponse.data);
          console.log(userProfile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("There was a problem fetching the user profile.");
      }
      setIsLoading(false);
    };

    if (token && userName) {
      checkTokenAndFetchProfile();
    }
  }, [userName, token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userProfile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div>
      <h1>{userName}'s Profile</h1>
      <img src={userProfile?.profile_pic} alt="Profilepic" style={{ width: "100px", height: "100px" }} />
      <p>Bio: {userProfile?.bio}</p>
      {!userName && <p>Please sign in to view your profile.</p>}
      
    </div>
  );
};

export default UserProfile;
