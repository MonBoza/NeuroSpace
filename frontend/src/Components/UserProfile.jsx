import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ signInUser, userName, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(userName);
  console.log(token);
  const navigate = useNavigate();
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
  const handleSignOut = async () => {
    try {
    
      const response = await axios.post("http://127.0.0.1:8000/logout", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      // Check if the sign-out request was successful
      if (response.status === 200) {
        console.log("Sign out successful!");
        // Redirect the user to the homepage or login page
        navigate("/home");
      } else {
        console.error("Sign out failed. Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>{userName}'s Profile</h1>
      <img src={userProfile?.profile_pic} alt="Profile_pic" style={{ width: "100px", height: "100px" }} />
      <p>Bio: {userProfile?.bio}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      {!userName && <p>Please sign in to view your profile.</p>}
      
    </div>
  );
};

export default UserProfile;
