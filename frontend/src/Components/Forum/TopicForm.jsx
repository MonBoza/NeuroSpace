import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopicForm() {
  const [entry, setEntry] = useState({ Topic: '', issue: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); 

//   useEffect(() => {
//     const checkTokenAndFetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const userName = localStorage.getItem('username');
//         const response = await axios.get(`http://127.0.0.1:8000/userprofile/${userName}`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//   } catch (error) { 
//     console.error('Error fetching user profile:', error);
//     setError('There was a problem fetching the user profile.');
//   }
//   setLoading(false);
// });


function TopicForm() {
  const [entry, setEntry] = useState({ Topic: '', issue: '' });
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmission = async (event) => {
    event.preventDefault(); 
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/forum/', {
        topic: entry.Topic,
        issue: entry.issue,
        username: localStorage.getItem('username'), 
      });
      if (response.status === 201) {
        setSubmittedData({
          topic: entry.Topic,
          issue: entry.issue,
          username: localStorage.getItem('username'),
          timestamp: new Date().toLocaleString(), 
        });
        setEntry({ Topic: '', issue: '' });
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      // Handle error submission
    }
  };

  return (
    <>
      <form className="" onSubmit={handleFormSubmission}>
        <input
          type='text'
          name='Topic'
          placeholder='Topic'
          value={entry.Topic}
          onChange={(e) => setEntry({ ...entry, Topic: e.target.value })}
        />
        <textarea
          name='issue'
          placeholder='Describe your issue.'
          value={entry.issue}
          onChange={(e) => setEntry({ ...entry, issue: e.target.value })}
        />
        <button type='submit'>Submit</button>
      </form>
      
      {submittedData && (
        <div>
          <p>Topic: {submittedData.topic}</p>
          <p>Issue: {submittedData.issue}</p>
          <p>Submitted by: {submittedData.username}</p>
          <p>Timestamp: {submittedData.timestamp}</p>
          {userProfile && <img src={`http://127.0.0.1:8000${userProfile?.profile_pic}`} alt="User Profile" style={{ width: '100px', height: '100px' }} />}
        </div>
      )}
    </>
  );
}
}

export default TopicForm;
