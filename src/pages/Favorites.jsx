import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getFavorites } from "../services/favoriteService";
import { AuthContext } from "../context/AuthContext";

const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("❌ Error fetching favorites:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchFavorites();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Message>You must be logged in to view favorites.</Message>;
  }

  if (loading) return <Message>Loading favorites...</Message>;

  if (favorites.length === 0) {
    return <Message>No favorite movies found.</Message>;
  }

  return (
    <Container>
      <Title>My Favorite Movies</Title>
      <Grid>
        {favorites.map((movie) => (
          <Card key={movie.movieId}>
            <Link to={`/movie/${movie.movieId}`}>
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.movieTitle}
              />
              <MovieTitle>{movie.movieTitle}</MovieTitle>
              <Date>{movie.release_date}</Date>
            </Link>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 0.5rem 0 0;
`;

const Date = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 0.75rem;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #555;
`;
