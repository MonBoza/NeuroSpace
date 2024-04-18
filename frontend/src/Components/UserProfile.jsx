import { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./SignIn";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 const userId = SignIn.user.Id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/userprofile/${userId}`);
        setUserProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      // If userId is null or undefined, set isLoading to false
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <div>
        <div>
         <h1>User Profile</h1>  
        </div>
        <div>
          <h2>Username: {userProfile?.username}</h2>
          <p>Email: {userProfile?.email}</p>
          <p>Bio: {userProfile?.bio}</p>
          <img src={userProfile?.profile_pic} alt="profile pic" />
        <p>please sign in</p>
    </div>
    </div>
  );
};

export default UserProfile;
