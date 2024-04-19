import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ userName, userProfile }) => {
  const [bio, setBio] = useState(userProfile.bio);
  const [profilePic, setProfilePic] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("profile_pic", profilePic);

      const response = await axios.put(
        `http://127.0.0.1:8000/userprofile/${userName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully.");
        setIsUpdating(false);
        setBio("");
        setProfilePic(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("There was a problem updating the profile.");
    }
  };

  return (
    <div onSubmit={handleProfileUpdate}>
      <form>
        <textarea
          placeholder="Bio"
          value={userProfile.bio}
          onChange={(e) =>
            setUserProfile({ ...userProfile, bio: e.target.value })
          }
        />
        <br />
        <input
          type="file"
          onChange={(e) =>
            setUserProfile({ ...userProfile, profile_pic: e.target.files[0] })
          }
        />
        <br />
        <button type="button" onClick={handleRegister}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
