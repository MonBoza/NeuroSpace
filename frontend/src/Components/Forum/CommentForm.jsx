import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ forumId }) {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('username');
    
    if (!token) {
      setErrorMessage('You need to sign in to submit a comment.');
      return;
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/comment/', {
        content: content,
        forum: forumId,
        user: userId,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        setContent('');
        setSuccessMessage('Comment added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after some time
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred while adding the comment.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8">
      <h2>Add a comment</h2>
      <form className="border border-gray-300 rounded-md px-4 py-2 mb-2"
onSubmit={handleSubmit}>
        <label htmlFor="comment">Enter your comment</label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your comment"
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
    </div>
  );
}

export default CommentForm;