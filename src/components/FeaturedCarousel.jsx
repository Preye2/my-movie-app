import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from "axios";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CarouselWrapper = styled.div`
  padding: 2rem;
`;

const MovieCard = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const Poster = styled.img`
  width: 180px;
  height: 270px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const MovieTitle = styled.h4`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const DetailsButton = styled(Link)`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.3rem 0.7rem;
  background: #ff416c;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.2s;

  &:hover {
    background: #ff4b2b;
  }
`;

const FeaturedCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/tmdb/trending')
      .then((res) => setMovies(res.data.results || []))
      .catch((err) => {
        console.error("Failed to fetch trending movies:", err);
        setMovies([]);
      });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <CarouselWrapper>
      <h2>🎬 Trending This Week</h2>
      <Slider {...settings}>
        {Array.isArray(movies) && movies.map((movie) => (
          <MovieCard key={movie.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
            <DetailsButton to={`/movie/${movie.id}`}>View Details</DetailsButton>
          </MovieCard>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default FeaturedCarousel;
