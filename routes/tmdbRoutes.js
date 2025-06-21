import express from 'express';
import {
  getTrendingMovies,
  getMovieDetails,
  searchMovies
} from '../controllers/tmdbController.js';

const router = express.Router();

// Trending movies (supports pagination via ?page=)
router.get('/trending', getTrendingMovies);

// Search movies by query
router.get('/search', searchMovies);

// Get single movie details
router.get('/movie/:id', getMovieDetails);

export default router;
