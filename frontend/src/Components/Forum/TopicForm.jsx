import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopicForm() {
  const [entry, setEntry] = useState({ title: '', description: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkTokenAndFetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('username');
        const response = await axios.get(`http://127.0.0.1:8000/userprofile/${userName}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('There was a problem fetching the user profile.');
      }
      setLoading(false);
    };

    checkTokenAndFetchProfile();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/forum/', {
        title: entry.title,
        description: entry.description,
        username: localStorage.getItem('username'),
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        setSubmittedData({
          title: entry.title,
          description: entry.description,
          username: localStorage.getItem('username'),
          timestamp: new Date().toLocaleString(),
        });
        setEntry({ title: '', description: '' });
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      // Handle error submission
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="" onSubmit={handleFormSubmission}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          />
          <textarea
            name='description'
            placeholder='Describe your description.'
            value={entry.description}
            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
          />
          <button type='submit'>Submit</button>
        </form>
      )}

      {submittedData && (
        <div>
          <p>Title: {submittedData.title}</p>
          <p>Description: {submittedData.description}</p>
          <p>Submitted by: {submittedData.username}</p>
          <p>Timestamp: {submittedData.timestamp}</p>
          {userProfile && <img src={`http://127.0.0.1:8000${userProfile.profile_pic}`} alt="User Profile" style={{ width: '100px', height: '100px' }} />}
        </div>
      )}
    </>
  );
}

export default TopicForm;
