import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Chip, Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';



export default function MovieCard({movie}) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const { image_link, name, director_name, writer_name, imdb_rating, duration, genre } = movie;

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const fallbackImage = 'https://via.placeholder.com/300x450/6366f1/ffffff?text=No+Image';

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx={{ 
              height: 280,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            image={`https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg`}
            title={name}
            onError={handleImageError}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: '#ec4899' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: 'white' }} />
              )}
            </IconButton>
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <Chip
              label={genre}
              sx={{
                backgroundColor: 'rgba(99, 102, 241, 0.9)',
                color: 'white',
                fontWeight: 500,
                backdropFilter: 'blur(10px)',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {name}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                {director_name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EditIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                {writer_name}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ fontSize: 18, mr: 0.5, color: '#fbbf24' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {imdb_rating}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                {duration}m
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
