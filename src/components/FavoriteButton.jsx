// src/components/FavoriteButton.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const FavoriteButton = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFavorite = async () => {
    try {
      const res = await api.get('/favorites');
      const found = res.data.find((fav) => fav.movieId === movie.id.toString());
      setIsFavorite(!!found);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  const handleFavorite = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${movie.id}`);
        setIsFavorite(false);
      } else {
        await api.post('/favorites', {
          movieId: movie.id.toString(),
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Failed to update favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [movie.id]);

  return (
    <button onClick={handleFavorite} disabled={loading}>
      {isFavorite ? '💔 Remove Favorite' : '❤️ Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
