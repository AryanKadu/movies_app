import React, { useEffect } from 'react';
import axios from 'axios';

const GenresTest = () => {
  useEffect(() => {
    const testGenresAPI = async () => {
      try {
        const url = 'https://movies-app-api-rs2u.onrender.com/api/genres';
        const response = await axios.get(url);
      } catch (error) {
        console.error('Genres API error:', error);
      }
    };

    testGenresAPI();
  }, []);

  return <div>Check console for genres API test</div>;
};

export default GenresTest; 