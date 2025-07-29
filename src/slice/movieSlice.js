import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    genres: [],
    searchValue: '',
    selectedGenre: ''
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload; 
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
        }

    }
})

export const { setMovies, setSearchValue, setGenres, setSelectedGenre } = movieSlice.actions;

export default movieSlice.reducer;