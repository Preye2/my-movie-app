// frontend/services/favoriteService.js
import axios from './axios';

// ✅ Add to favorites
export const addFavorite = async (movie, token) => {
  const payload = {
    movieId: movie.id,
    title: movie.title, // maps to `movieTitle` in backend model
    poster_path: movie.poster_path,
    release_date: movie.release_date,
  };

  const res = await axios.post('/api/favorites', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ✅ Remove from favorites
export const removeFavorite = async (movieId, token) => {
  const res = await axios.delete(`/api/favorites/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Get user favorites
export const getFavorites = async (token) => {
  const res = await axios.get('/api/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
