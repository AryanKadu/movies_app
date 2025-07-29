import React, { useEffect } from 'react';
import axios from 'axios';

const GenresTest = () => {
  useEffect(() => {
    const testGenresAPI = async () => {
      try {
        const url = 'https://movies-app-api-rs2u.onrender.com/api/genres';
        console.log('Testing genres API:', url);
        const response = await axios.get(url);
        console.log('Genres API response:', response.data);
      } catch (error) {
        console.error('Genres API error:', error);
      }
    };

    testGenresAPI();
  }, []);

  return <div>Check console for genres API test</div>;
};

export default GenresTest; 