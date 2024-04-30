import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ userProfile, onSubmit }) => {
  const userName = localStorage.getItem('username');
  const [formData, setFormData] = useState({
    bio: userProfile?.bio || '',
    profile_pic: userProfile?.profile_pic || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`http://127.0.0.1:8000/userprofile/${userName}/`, formData, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`, // Add authorization token
      },
    });
    // Call the onSubmit callback function with the updated profile data
    onSubmit(response.data); // Make sure this is being called correctly
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8">
    <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="bio" className="block text-sm font-semibold mb-1">Bio</label>
        <textarea
          name="bio"
           className="border border-gray-300 rounded-md px-4 py-2 mb-2"
           placeholder="Bio" 
          value={formData.bio}
          onChange={handleChange}
          
          rows="4"
        />
      </div>
      <div className="mb-4">
        <br/>
        <input 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          type="file" 
          onChange={(e) => setFormData({ ...formData, profile_pic: e.target.files[0] })}
        />
        <br/>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
    </div>
    </div>

  );
};

export default EditProfileForm;
