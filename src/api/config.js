const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:8080/api/movies'
    : 'https://movies-app-api-rs2u.onrender.com/api/movies',
};

export default API_CONFIG;
