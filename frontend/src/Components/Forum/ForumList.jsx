import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForumList({ userProfile }) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForumList = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/forum/', {
          headers: {
            Authorization: `Token ${token}`,
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

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Forum List</h2>
          {forums.map(forum => (
            <div key={forum.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
              <a href={`http://127.0.0.1:8000/forum/${forum.id}`}>{forum.title}</a>
              <p>Posted by: {forum.user}</p>               {/* <img
               src={`http://127.0.0.1:8000/${forum.user}`}
                  alt="Profile Pic"
                  style={{ width: '100px', height: '100px' }}
          /> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ForumList;
// figure out how to display the user profile pic

// update the backend to appropriately handle the  specific forum Id 