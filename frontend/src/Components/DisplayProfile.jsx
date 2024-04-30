import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayProfile = ({ selectedUserName }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/userprofile/${selectedUserName}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [selectedUserName]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={`http://127.0.0.1:8000/${profile?.profile_pic}`}
                alt="Profile Pic"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-xl font-bold">{selectedUserName}</h1>
                <p className="text-gray-600">Member since {formatDate(profile?.date_created)}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{profile?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
