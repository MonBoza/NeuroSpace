import React, { useState } from 'react';
import axios from 'axios';
import ForumList from './ForumList';

function TopicForm({userProfile}) {
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
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmission}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text'
            name='title'
            placeholder='Title'
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name='description'
            placeholder='Describe your description.'
            value={entry.description}
            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
            Submit
          </button>
        </div>
      </form>

      {submittedData && (
        <div>
          <p>Title: {submittedData.title}</p>
          <p>Description: {submittedData.description}</p>
          <p>Timestamp: {submittedData.timestamp}</p>
          <p>UserName: {submittedData.user}</p>
          <img
            src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`}
            alt="Profile Pic"
            className="w-16 h-16 rounded-full mr-4"
          />
          <ForumList userProfile={userProfile} />
        </div>
      )}
    </>
  );
}

export default TopicForm;
