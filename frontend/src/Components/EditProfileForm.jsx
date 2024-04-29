import React, { useState } from 'react';

const EditProfileForm = ({ userProfile, onSubmit }) => {
  const [formData, setFormData] = useState({
    bio: userProfile.bio,

   profile_pic: userProfile.profile_pic
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-semibold mb-1">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          rows="4"
        />
      </div>
      <div>
        <img></img>
      </div>
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
