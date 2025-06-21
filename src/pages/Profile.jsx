import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFavorites } from "../services/favoriteService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };

    fetchFavs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <h2>👋 Welcome, {user?.username || user?.email}</h2>

      <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>

      <h3>Your Favorite Movies:</h3>
      {favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <FavoritesGrid>
          {favorites.map((fav) => (
            <FavoriteCard key={fav._id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
                alt={fav.movieTitle}
              />
              <p>{fav.movieTitle}</p>
              <small>{fav.release_date}</small>
            </FavoriteCard>
          ))}
        </FavoritesGrid>
      )}
    </Container>
  );
};

export default Profile;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const LogoutButton = styled.button`
  background: #ff4b2b;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background: #ff1b00;
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
`;

const FavoriteCard = styled.div`
  background: #fff;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 8px;
  }

  p {
    font-weight: bold;
    margin: 0.5rem 0 0.2rem;
  }
`;
