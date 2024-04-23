import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForumDetail from './ForumDetail';

function ForumList() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const storedUserName = localStorage.getItem('username');;

  const fetchUserProfile = (username) => {
    axios.get(`http://127.0.0.1:8000/userprofile/${storedUserName}/`)
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
        fetchUserProfile(userProfile?.user);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/forum/', {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            ordering: 'created_at', 
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
        ) : loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline mb-4"  onClick={() => window.location.href = '/topicform'}>Create Your own Thread</button>
            <div className="">
            {forums.map(forum => (
              <div className='bg-white text-amber-700 font-bold text-center rounded px-1/2 box' key={forum.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                <a href="#" onClick={() => handleForumClick(forum.id)}>{forum.title}</a>
                <p>Posted by: {forum.user}</p>             
                <img
                  src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`}
                    alt="Profile Pic"
                    style={{ width: '100px', height: '100px' }}
            />
  
              </div>
            ))}
            </div>
          </div>
        )}
      </>
    );
  }
  

export default ForumList;
