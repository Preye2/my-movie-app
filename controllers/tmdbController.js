// backend/controllers/tmdbController.js
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// backend/controllers/tmdbController.js
export const getTrendingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page
      },
    });
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error fetching trending movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch trending movies' });
  }
};


export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching movie details:', error.message);
    res.status(500).json({ message: 'Failed to fetch movie details' });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ message: 'Missing search query' });

    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        query,
      },
    });
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error searching movies:', error.message);
    res.status(500).json({ message: 'Search failed' });
  }
};

