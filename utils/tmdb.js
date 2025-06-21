import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  try {
    // ✅ Log to verify .env is loading
    console.log('🔑 Loaded TMDB API Key:', process.env.TMDB_API_KEY);

    const response = await tmdb.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('❌ TMDB fetchTrendingMovies error:', error.message);
    throw new Error('Failed to fetch trending movies from TMDB');
  }
};

export default tmdb;
