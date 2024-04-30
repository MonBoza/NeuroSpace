import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

const UserProfile = ({ signInUser, userName, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const storedToken = localStorage.getItem('token');
  const storedUserName = localStorage.getItem('username');
  const storedUserId = localStorage.getItem('userId');



  const navigate = useNavigate();


  useEffect(() => {
    const checkTokenAndFetchProfile = async () => {
      try {
        const tokenResponse = await axios.get(
          "http://127.0.0.1:8000/test_token",
          {
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        if (tokenResponse.status === 200) {
          const profileResponse = await axios.get(
            `http://127.0.0.1:8000/userprofile/${storedUserName}/`,
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
    checkTokenAndFetchProfile();
  }, [userName, token]);

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() ;
  }

  return (
    <div className="container mx-auto mt-16">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`}
                alt="Profile Pic"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-xl font-bold">{storedUserName}</h1>
                <p className="text-gray-600">Member since {formatDate(userProfile?.date_created)}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={handleEditProfile}
            >
              <FaUserEdit className="mr-1 text-sm" /> Edit Profile
            </button>
          </div>
          <hr className="my-4" />
          <div>
            <h2 className="text-lg font-semibold">About Me</h2>
            <p className="text-gray-600">{userProfile?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;