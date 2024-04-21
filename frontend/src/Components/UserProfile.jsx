import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "./EditProfile";
import Home from "./Home";
import TopicForm from "./Forum/TopicForm";

const UserProfile = ({ signInUser, userName, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const storedToken = localStorage.getItem('token');
  console.log(storedToken);

  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenAndFetchProfile = async () => {
      try {
        // Check if the token is valid by making a request to the test_token endpoint
        const tokenResponse = await axios.get(
          "http://127.0.0.1:8000/test_token",
          {
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );
        console.log(tokenResponse);

        if (tokenResponse.status === 200) {
          // Token is valid, fetch the user profile data
          const profileResponse = await axios.get(
            `http://127.0.0.1:8000/userprofile/${userName}`,
            {}
          );
          setUserProfile(profileResponse.data);
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
          Authorization: `Token ${storedToken}`,
        },
      });

      // Check if the sign-out request was successful
      if (response.status === 200) {
        ("Sign out successful!");
        // Redirect the user to the homepage or login page
        navigate("/");
      } else {
        console.error("Sign out failed. Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
console.log(userProfile);

return (
  <div className=" float-left max-w-screen-md mx-auto">
    <div className="w-1/2 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{userName}'s Profile</h1>
        <div className="flex justify-left items-center mb-4">
          <img
            src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`}
            alt="Profile Pic"
            className="w-25 display-flex h-25 rounded-full mr-4 float-left"
          />
          </div>
          <p className=" text-size-lg text-stone-900">About Me: {userProfile?.bio}</p>
      
        <div className="flex justify-between">
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
        {!userName && (
          <p className="text-gray-600 mt-2">
            Please sign in to view your profile.
          </p>
        )}
      </div>
    </div>
    <div>
      <TopicForm userName={userName} token={token} userProfile={userProfile}/>
    </div>
  </div>
);
};

export default UserProfile;
