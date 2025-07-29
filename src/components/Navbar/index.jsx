import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Box, Toolbar, Typography, InputBase, Button, Container} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import SelectorComponent from '../SelectorComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSelectedGenre } from '../../slice/movieSlice';
import {debounce} from 'lodash';
import { useEffect } from 'react';
import { getAllGenres, getMovies } from '../../api/movies';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.12),
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.9rem',
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.6),
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));

export default function Navbar() {

  const dispatch = useDispatch();

  // const { searchValue } = useSelector(state => state.movies);

  // const onSearchChange = (e) => {
  //   dispatch(setSearchValue(e.target.value));
  // }

    useEffect(() => {
      dispatch(getAllGenres());
    }, [dispatch])

    const onSearchChange = debounce((e) => {
    dispatch(setSearchValue(e.target.value));
  }, 500)

    const { genres } = useSelector(state => state.movies);



  // console.log(searchValue);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <MovieIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h5"
                component="div"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                MovieHub
              </Typography>
            </Box>
            
            <Search onChange={onSearchChange}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search movies, directors, writers..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <SelectorComponent name='Genres' value={genres} />
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(setSearchValue(''));
                  dispatch(setSelectedGenre(''));
                  dispatch(getMovies());
                }}
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  }
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
