
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ForumDetail from './Forum/ForumDetail';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/forum/search/?q=${query}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="bg-white rounded-lg shadow-md p-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Forum"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-4 mr-5"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline mb-4" onClick={handleSearch}>Search</button>
                <ul>
                    {results.map(forum => (
                        <li key={forum.id}>
                            <a href={`/forum/${forum.id}`}>{forum.title}</a>
                            <ForumDetail forumId={forum.id} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
