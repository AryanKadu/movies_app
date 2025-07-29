import React from 'react';
import { useSelector } from 'react-redux';

const DebugInfo = () => {
  const { movies, genres, searchValue, selectedGenre } = useSelector(state => state.movies);

  return (
    <div >
      
    </div>
  );
};

export default DebugInfo; 