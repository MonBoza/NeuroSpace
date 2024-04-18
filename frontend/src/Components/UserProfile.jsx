import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ username }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("Username:", username);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) {
        setIsLoading(false);
        setError("No username provided."); // Change the error message to indicate no username
        
        return;
      }
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/userprofile/${username}/`);
        setUserProfile(response.data);
        console.log("userProfile:", user.userProfile.profile_pic);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);
  if (isLoading) {
    return <p>Loading...</p>; // Display loading text while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error if there is one
  }

  if (!userProfile) {
    return <p>No profile data available.</p>;
  }
  return (
    <div>
      <h1>{username}'s Profile</h1>
      <img src={userProfile?.profile_pic} alt="Profile" style={{ width: "100px", height: "100px" }} />
     
      <p>Bio: {userProfile?.bio}</p>
     
    
      {!username && <p>Please sign in to view your profile.</p>}
    </div>
  );
};

export default UserProfile;
