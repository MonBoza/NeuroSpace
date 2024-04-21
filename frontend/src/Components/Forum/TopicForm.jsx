import React, { useState } from 'react';
import axios from 'axios';

function TopicForm() {
  const [entry, setEntry] = useState({ title: '', description: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/forum/', {
        title: entry.title,
        description: entry.description,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        setSubmittedData({
          title: entry.title,
          description: entry.description,
          timestamp: new Date().toLocaleString(),
        });
        setEntry({ title: '', description: '' });
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      setError('There was a problem with the form submission.');
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
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

      {submittedData && (
        <div>
          <p>Title: {submittedData.title}</p>
          <p>Description: {submittedData.description}</p>
          <p>Timestamp: {submittedData.timestamp}</p>
        </div>
      )}
    </>
  );
}

export default TopicForm;
