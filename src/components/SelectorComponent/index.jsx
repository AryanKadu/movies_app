import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getMoviesByGenres, getMovies } from '../../api/movies';
import { useDispatch } from 'react-redux';
import { setSelectedGenre } from '../../slice/movieSlice';

export default function SelectorComponent({name, value}) {

  const dispatch = useDispatch();

  const [SelectedValue, setSelectedValue] = React.useState('');



  const handleChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedValue(selectedGenre);
    
    if (selectedGenre === 'All' || selectedGenre === '') {
      dispatch(setSelectedGenre(''));
      dispatch(getMovies());
    } else {
      dispatch(setSelectedGenre(selectedGenre));
      dispatch(getMoviesByGenres(selectedGenre));
    }
  };

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth size="small">
        <InputLabel 
          id="demo-simple-select-label"
          sx={{ 
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main'
            }
          }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={SelectedValue}
          label={name}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '& .MuiSelect-icon': {
              color: 'text.secondary',
            },
          }}
        >

        {
          name.toLowerCase().includes('genres') && (
            <MenuItem key="all" value="All">
              All Genres
            </MenuItem>
          )
        }
        {
          value?.length > 0 ? value.map((item, index) => {
            let displayValue;
            
            if (name.toLowerCase().includes('genres')) {
              // Handle different possible genre data structures
              displayValue = item.genre || item.name || item.value || item;
            } else {
              displayValue = item.ratings || item.rating || item.value || item;
            }
            
            return (
              <MenuItem key={index} value={displayValue}>
                {displayValue}
              </MenuItem>
            );
          }) : <MenuItem disabled>No options available</MenuItem>
        }
        </Select>
      </FormControl>
    </Box>
  );
}
