import axios from 'axios';
import { setGenres, setMovies } from '../slice/movieSlice';
import { API_CONFIG } from './config';

const BaseUrl = API_CONFIG.BASE_URL;


export const getMovies = () => async dispatch => {
    try {
        console.log('Fetching movies from:', BaseUrl);
        const {data} = await axios.get(BaseUrl);

        dispatch(setMovies(data));
        return data;
    }catch(err) {
        console.error('Error fetching movies:', err);
        console.error('Error details:', {
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            url: BaseUrl
        });
        return err;
    }
}


export const getMoviesBySearch = (value) => async dispatch => {
    const url = `${BaseUrl}?search=${value}`;
    try {
        const {data} = await axios.get(url);
        // console.log(data);
        dispatch(setMovies(data));
        return data;
    }catch(err) {
        console.error('Error fetching movies:', err);
        return err;
    }
}

export const getAllGenres = () => async dispatch => {
    try {
        // First try to get genres from the dedicated endpoint
        const url = `${BaseUrl.replace('/movies', '')}/genres`;
        console.log('Fetching genres from:', url);
        const { data } = await axios.get(url);

        dispatch(setGenres(data));
    }catch(err) {
        console.error('Error fetching genres from dedicated endpoint:', err);
        console.error('Error details:', {
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            url: `${BaseUrl.replace('/movies', '')}/genres`
        });
        // Fallback: extract genres from movies data
        try {
            console.log('Trying fallback: extracting genres from movies data');
            const { data: moviesData } = await axios.get(BaseUrl);
            console.log('Movies data for genre extraction:', moviesData.slice(0, 3));
            const uniqueGenres = [...new Set(moviesData.map(movie => movie.genre).filter(Boolean))];
            const genresData = uniqueGenres.map(genre => ({ genre }));

            dispatch(setGenres(genresData));
        } catch (fallbackErr) {
            console.error('Error in fallback genres extraction:', fallbackErr);
        }
    }
}

export const getMoviesByGenres = (genre) => async dispatch => {
    if (!genre) return;
    
    // Try different possible API endpoints for genre filtering
    const possibleUrls = [
        `${BaseUrl}?genre=${encodeURIComponent(genre)}`,
        `${BaseUrl.replace('/movies', '')}/genre?genre=${encodeURIComponent(genre)}`,
        `${BaseUrl.replace('/movies', '')}/movies?genre=${encodeURIComponent(genre)}`
    ];
    
    for (const url of possibleUrls) {
        try {
            console.log('Trying genre filter URL:', url);
            const {data} = await axios.get(url);

            dispatch(setMovies(data));
            return data;
        } catch (err) {
            console.error(`Error with URL ${url}:`, err);
            continue;
        }
    }
    
    // Fallback: filter movies locally if API doesn't support genre filtering
    try {

        const {data: allMovies} = await axios.get(BaseUrl);
        const filteredMovies = allMovies.filter(movie => 
            movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase())
        );

        dispatch(setMovies(filteredMovies));
        return filteredMovies;
    } catch (fallbackErr) {
        console.error('Error in fallback genre filtering:', fallbackErr);
    }
}
