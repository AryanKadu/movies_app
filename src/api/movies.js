import axios from 'axios';
import { setGenres, setMovies } from '../slice/movieSlice';
import { API_CONFIG } from './config';

const BaseUrl = API_CONFIG.BASE_URL;

export const getMovies = () => async dispatch => {
  try {
    const { data } = await axios.get(BaseUrl);
    // Defensive: only dispatch arrays
    dispatch(setMovies(Array.isArray(data) ? data : []));
    return data;
  } catch (err) {
    dispatch(setMovies([]));
    return err;
  }
};

export const getMoviesBySearch = (value) => async dispatch => {
  const url = `${BaseUrl}?search=${value}`;
  try {
    const { data } = await axios.get(url);
    dispatch(setMovies(Array.isArray(data) ? data : []));
    return data;
  } catch (err) {
    dispatch(setMovies([]));
    return err;
  }
};

export const getAllGenres = () => async dispatch => {
  try {
    const url = `${BaseUrl.replace('/movies', '')}/genres`;
    const { data } = await axios.get(url);
    dispatch(setGenres(Array.isArray(data) ? data : []));
  } catch (err) {
    try {
      const { data: moviesData } = await axios.get(BaseUrl);
      const uniqueGenres = Array.isArray(moviesData)
        ? [...new Set(moviesData.map(movie => movie.genre).filter(Boolean))]
        : [];
      const genresData = uniqueGenres.map(genre => ({ genre }));
      dispatch(setGenres(genresData));
    } catch (fallbackErr) {
      dispatch(setGenres([]));
    }
  }
};

export const getMoviesByGenres = (genre) => async dispatch => {
  if (!genre) return;
  const possibleUrls = [
    `${BaseUrl}?genre=${encodeURIComponent(genre)}`,
    `${BaseUrl.replace('/movies', '')}/genre?genre=${encodeURIComponent(genre)}`,
    `${BaseUrl.replace('/movies', '')}/movies?genre=${encodeURIComponent(genre)}`
  ];

  for (const url of possibleUrls) {
    try {
      const { data } = await axios.get(url);
      if (Array.isArray(data)) {
        dispatch(setMovies(data));
        return data;
      }
    } catch (err) {
      continue;
    }
  }

  try {
    const { data: allMovies } = await axios.get(BaseUrl);
    const filteredMovies = Array.isArray(allMovies)
      ? allMovies.filter(movie =>
          movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase()))
      : [];
    dispatch(setMovies(filteredMovies));
    return filteredMovies;
  } catch (fallbackErr) {
    dispatch(setMovies([]));
  }
};
