import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CommentForm({ forumId }) {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
 

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
        navigate('/ForumList')
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred while adding the comment.');
    }
  };
 
  return (
    <div className="flex justify-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add a Comment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your comment"
            className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows={4}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}

export default CommentForm;