export const getMoviesBySearch = (movies, value) => {
    const filteredMovies = value?.length > 0 ? (movies?.length > 0 && movies.filter(movie => movie.name.toLowerCase().includes(value.toLowerCase()) || movie.writer_name.toLowerCase().includes(value.toLowerCase()) || movie.director_name.toLowerCase().includes(value.toLowerCase()))) : movies
    return filteredMovies;
}