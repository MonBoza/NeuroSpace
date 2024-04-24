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
  const userProfile = JSON.parse(localStorage.getItem('userProfile')); // Fetch user profile from localStorage

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
    <>
      <div className='bg-white text-bold justify-self-center w-96 p-4 rounded-lg'>
        <h2 className='font-extrabold text-center'>{forum.title}</h2>
        <div className="description-box bg-gray-100 p-2 rounded-md mb-4">
          <p>{forum.description}</p>
        </div>
        <p>{forum.user}</p>
        <p className='text-left'>Posted: {formatDate(forum.date)}</p>
        <div className='bg-white text-bold justify-self-center w-1/2 p-4 rounded-lg'>
          <h1 className='font-extrabold '>Replies</h1>
          <ul className='bg-white text bold justify-self-auto'>
            {comments.map(comment => {
              if (comment.forum === forumId) {
                return (
                  <li className="border border-gray-300 rounded-md px-4 py-2 mb-2" key={comment.id}>
                    <div><Linkify componentDecorator={(href, text, key) => (
                      <a href={href.startsWith('http') ? href : ''} key={key}>
                        {text}
                      </a>
                    )}>{comment.content}</Linkify></div>
                    <a>User: {storedUserName}</a>
                    <p>Posted: {formatDate(comment.date)}</p>
                    <hr />
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <CommentForm forumId={forumId} userProfile={userProfile} />
      </div>
    </>
  );
};

export default ForumDetail;
