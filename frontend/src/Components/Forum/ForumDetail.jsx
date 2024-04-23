import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForumDetail = ({ forumId }) => {
  const [forum, setForum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForumDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/forum_detail/${forumId}`);
        setForum(response.data);
      } catch (error) {
        console.error('Error fetching forum detail:', error);
        setError('There was a problem fetching the forum detail.');
      }
      setLoading(false);
    };

    if (forumId) {
      fetchForumDetail();
    }
  }, [forumId]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : forum ? (
        <div>
          <h2>{forum.title}</h2>
          <p>Description: {forum.description}</p>
          <p>User: {forum.user}</p>
        </div>
      ) : (
        <p>No forum selected.</p>
      )}
    </>
  );
};

export default ForumDetail;
