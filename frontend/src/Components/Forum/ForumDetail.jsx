import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import Linkify from 'react-linkify';

const ForumDetail = ({ forumId }) => {
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const storedUserName = localStorage.getItem('username');
  const userProfile = JSON.parse(localStorage.getItem('userProfile')); 

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated.');
        }
        const forumResponse = await axios.get(`http://127.0.0.1:8000/forum_detail/${forumId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setForum(forumResponse.data);

        const commentsResponse = await axios.get(`http://127.0.0.1:8000/comment/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching forum details or comments:', error);
        setError('Error fetching forum details or comments');
      } finally {
        setLoading(false);
      }
    };

    fetchForumDetails();
  }, [forumId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!forum) return <p>No forum selected.</p>;


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">{forum.title}</h2>
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <p className="bg-gray-100">{forum.description}</p>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <p>{forum.user}</p>
          <p>Posted: {formatDate(forum.date)}</p>
        </div>
      </div>
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6">
           
        <ul className="space-y-4">
          {comments.map((comment) => {
            if (comment.forum === forumId) {
              return (
                <li className="bg-gray-200 rounded-lg p-4" key={comment.id}>
                  <div className="flex items-center mb-2">
                    <img
                      src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`}
                      alt="Profile Pic"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <Linkify componentDecorator={(href, text, key) => (
                        <a href={href.startsWith('http') ? href : ''} key={key} className="text-blue-500">
                          {text}
                        </a>
                      )}>{comment.content}</Linkify>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <p>User: {comment.user.username}</p>
                    <p>Posted: {formatDate(comment.date)}</p>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6">
        <CommentForm forumId={forumId} userProfile={userProfile} />
      </div>
    </div>
  );
};

export default ForumDetail;