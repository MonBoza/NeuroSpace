import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ username }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // State to handle errors

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
        console.log(response.data);
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
    return <p>No profile data available.</p>; // Handle case where userProfile is null
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Username: {userProfile?.user?.username}</h2> {/* Use optional chaining to safely access nested objects */}
      <p>Email: {userProfile?.user?.email}</p>
      <p>Bio: {userProfile?.bio}</p>
      {userProfile.profile_pic && (
        <img src={userProfile.profile_pic} alt="profile pic" />
      )}
      {!username && <p>Please sign in to view your profile.</p>}
    </div>
  );
};

export default UserProfile;
