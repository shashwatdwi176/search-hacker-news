// HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import news from '../assests/hacker1.png';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setSearchResults(response.data.hits);
    } catch (error) {
      setError('An error occurred while fetching the data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() !== '') {
        await handleSearch();
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="home-container">
    
    <h1 className="title">Hacker<br/> News <br/>Search</h1>
      
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Hacker News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          Search
        </button>
        {/* <img className="home-image" src={news} alt="Hacker News" /> */}
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className='result'>
      <ul className="results-list">
        {searchResults.map((result) => (
          <li key={result.objectID} className="result-item">
            <a href={`/post/${result.objectID}`}>{result.title}</a>
          </li>
       
        ))}
      </ul>
    </div>
    </div>
  );
};

export default HomeScreen;
