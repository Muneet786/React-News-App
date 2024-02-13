import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsApp = () => {
  const [news, setNews] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetchNews(city);
    }
  }, [city]);

  const fetchNews = async (city) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=c7450689e523469db258928e1cd8ff21`);
      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Error fetching news. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      fetchNews(city);
    }
  };

  return (
    <div>
      <h1>City News</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <img src={article.urlToImage} alt={article.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;