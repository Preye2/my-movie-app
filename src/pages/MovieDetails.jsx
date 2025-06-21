import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../services/axios';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movie/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('❌ Failed to load movie details:', err);
        setError('Movie not found or failed to load.');
      }
    };

    const checkFavorite = async () => {
      if (!token) return;
      try {
        const favorites = await getFavorites(token);
        const isFav = favorites.some((fav) => fav.movieId === parseInt(id));
        setIsFavorite(isFav);
      } catch (err) {
        console.error('❌ Failed to check favorite:', err);
      }
    };

    fetchMovie();
    checkFavorite();
  }, [id, token]);

  const handleFavorite = async () => {
    if (!token || !movie) return;
    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeFavorite(movie.id, token);
        setIsFavorite(false);
      } else {
        await addFavorite(
          {
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
          },
          token
        );
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('❌ Favorite toggle failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoadingFavorite(false);
    }
  };

  if (error) return <ErrorMsg>{error}</ErrorMsg>;
  if (!movie) return <Loading>Loading movie details...</Loading>;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Container>
      <Poster src={posterUrl} alt={movie.title} />
      <Details>
        <Title>
          {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
        </Title>
        {movie.tagline && <Tagline>"{movie.tagline}"</Tagline>}

        <InfoList>
          <li><strong>Release Date:</strong> {movie.release_date || 'N/A'}</li>
          <li><strong>Rating:</strong> {movie.vote_average ? `${movie.vote_average} / 10` : 'N/A'}</li>
          <li><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</li>
          <li><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}</li>
        </InfoList>

        <Overview>{movie.overview || 'No overview available.'}</Overview>

        {token && (
          <FavButton onClick={handleFavorite} disabled={loadingFavorite}>
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </FavButton>
        )}

        <StyledLink to="/">← Back to Home</StyledLink>
      </Details>
    </Container>
  );
};

export default MovieDetails;

// Styled Components

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 900px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Poster = styled.img`
  width: 320px;
  max-width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  @media (max-width: 768px) {
    width: 60vw;
    margin-bottom: 1.5rem;
  }
`;

const Details = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 0.3rem;
  color: #222;
  font-size: 2.2rem;
  font-weight: 700;
`;

const Tagline = styled.p`
  font-style: italic;
  color: #666;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.8rem;

  li {
    margin-bottom: 0.7rem;
    font-weight: 500;
    color: #444;
  }

  strong {
    color: #222;
  }
`;

const Overview = styled.p`
  line-height: 1.7;
  color: #555;
  font-size: 1.05rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.65rem 1.3rem;
  background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
  color: #fff;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 3px 8px rgba(255, 75, 43, 0.5);
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
  }
`;

const FavButton = styled.button`
  display: inline-block;
  background: #ff416c;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff4b2b;
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: red;
  margin-top: 4rem;
  font-size: 1.3rem;
`;

const Loading = styled.div`
  text-align: center;
  color: #777;
  margin-top: 4rem;
  font-size: 1.3rem;
`;
