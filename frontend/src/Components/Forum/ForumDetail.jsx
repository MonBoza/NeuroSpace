import React, { useState } from 'react';

const ForumDetail = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>Forum Topic Title</h2>
      <p>Forum topic content goes here...</p>

      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default ForumDetail;