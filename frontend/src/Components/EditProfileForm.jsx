import React, { useState } from 'react';

const EditProfileForm = ({ userProfile, onSubmit }) => {
  const [formData, setFormData] = useState({
    bio: userProfile.bio,
    email: userProfile.email,
    phone: userProfile.phone,
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSubmit prop with updated form data
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
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
      </div>
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
