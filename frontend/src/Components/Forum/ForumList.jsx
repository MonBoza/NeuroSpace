import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForumDetail from './ForumDetail';

function ForumList() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const storedUserName = localStorage.getItem('username');

  const fetchUserProfile = (username) => {
    axios.get(`http://127.0.0.1:8000/userprofile/${username}/`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  };

  useEffect(() => {
    const fetchForumList = async () => {
      try {
        setLoading(true);
        fetchUserProfile(storedUserName);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/forum/', {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            ordering: '-created_at', 
          },
        });
        setForums(response.data);
      } catch (error) {
        console.error('Error fetching forum list:', error);
        setError('There was a problem fetching the forum list.');
      }
      setLoading(false);
    };

    fetchForumList();
  }, []);

  const handleForumClick = (forumId) => {
    setSelectedForumId(forumId); 
  };


  return (
    <>
      {selectedForumId ? (
        <ForumDetail forumId={selectedForumId} />
      ) : (
        <div className="flex flex-col top-3 items-center space-y-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            onClick={() => window.location.href = '/topicform'}
          >
            Create Your Own Thread
          </button>
          <div className="w-full max-w-3xl space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              forums.map(forum => (
                <div
                  key={forum.id}
                  className="bg-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleForumClick(forum.id)}
                >
                  <div className="flex items-center p-4">
                    <img
                      src={`http://127.0.0.1:8000${forum.userprofile}`}
                      alt="Profile Pic"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <h2 className="text-lg font-bold">{forum.title}</h2>
                  </div>
                  <p className="px-4 pb-4 text-gray-600">Posted by: {forum.user}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ForumList;

//  work on getting the profile pic to display in comments :) and in forum list. I accidentally made it show logged in users profile pic in all comments.