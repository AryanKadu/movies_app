import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
// import { getMovies } from "../../api/movies";
import { getMovies }  from "../../api/movies";
import MovieCard from "../../components/MovieCard";
import { Box, Grid, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { getMoviesBySearch } from "../../utils/getMoviesBySearch";
import MovieIcon from '@mui/icons-material/Movie';

export const Home = () => {

    const dispatch = useDispatch();

    const { movies, searchValue, selectedGenre } = useSelector(state => state.movies);



    // First filter by genre if selected, then by search
    let filteredMovies = movies;
    if (selectedGenre) {
        filteredMovies = movies?.filter(movie => 
            movie.genre && movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
        );
    }
    
    const filterMovieByName = getMoviesBySearch(filteredMovies, searchValue);

    // console.log(movies);

    useEffect(()=>{
        dispatch(getMovies());
    }, []);

    return(
        <>
            <Navbar/>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {filterMovieByName?.length === 0 && movies?.length > 0 && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        No movies found matching your search criteria. Try adjusting your filters.
                    </Alert>
                )}
                
                {filterMovieByName?.length > 0 ? (
                    <>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 600,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <MovieIcon sx={{ color: 'primary.main' }} />
                                {selectedGenre ? `${selectedGenre} Movies` : 'All Movies'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {filterMovieByName.length} movie{filterMovieByName.length !== 1 ? 's' : ''} found
                            </Typography>
                        </Box>
                        
                        <Grid container spacing={3}>
                            {filterMovieByName.map((movie, index) => (
                                <MovieCard key={movie.id || index} movie={movie} />
                            ))}
                        </Grid>
                    </>
                ) : movies?.length === 0 ? (
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        minHeight: '50vh',
                        textAlign: 'center'
                    }}>
                        <CircularProgress size={60} sx={{ mb: 3, color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                            Loading movies...
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Please wait while we fetch the latest movies for you.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        minHeight: '50vh',
                        textAlign: 'center'
                    }}>
                        <MovieIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                            No movies available
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Try refreshing the page or check your connection.
                        </Typography>
                    </Box>
                )}
            </Container>
        </>
    )
}