// API Configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  // Use local server for development, deployed API for production
  BASE_URL: isDevelopment 
    ? 'http://localhost:8080/api/movies'
    : 'https://movies-app-api-rs2u.onrender.com/api/movies',
  
  // Alternative: Force local development (uncomment to use local server)
  // BASE_URL: 'http://localhost:8080/api/movies',
  
  // Alternative: Force production (uncomment to use deployed API)
  // BASE_URL: 'https://movies-app-api-rs2u.onrender.com/api/movies',
};

export default API_CONFIG; 