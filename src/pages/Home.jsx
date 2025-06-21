import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from '../services/axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchMovies = async (pageNum = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      let url = search
        ? `/api/tmdb/search?query=${encodeURIComponent(search)}&page=${pageNum}`
        : `/api/tmdb/trending?page=${pageNum}`;

      const res = await axios.get(url);
      const newMovies = res.data || [];

      setHasMore(newMovies.length > 0);

      setMovies(prev => {
        const combined = search || pageNum === 1 ? newMovies : [...prev, ...newMovies];
        const uniqueMap = new Map();
        combined.forEach(m => uniqueMap.set(m.id, m));
        return Array.from(uniqueMap.values());
      });
      setSearchMode(!!search);
    } catch (err) {
      console.error('❌ Failed to load movies:', err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1, query);
  };

  const handleReset = () => {
    setQuery('');
    setPage(1);
    setSearchMode(false);
    setMovies([]);
    setHasMore(true);
    fetchMovies(1);
  };

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchMovies(nextPage, searchMode ? query : '');
            return nextPage;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searchMode, query]
  );

  return (
    <Wrapper>
      <Hero>
        <h1>🎬 Welcome to <span>MovieZone</span></h1>
        <p>Discover movies, save favorites, and get smart AI recommendations!</p>

        <ButtonGroup>
          <StyledLink to="/recommend">🎯 Get AI Recommendation</StyledLink>
          <StyledLink to="/favorites">❤️ View Favorites</StyledLink>
          <StyledLink to="/login">🔐 Login</StyledLink>
          <StyledLink to="/signup">📝 Sign Up</StyledLink>
        </ButtonGroup>

        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
          {searchMode && (
            <ResetButton type="button" onClick={handleReset}>
              Reset
            </ResetButton>
          )}
        </SearchForm>
      </Hero>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {!loading && movies.length === 0 && (
        <NoResults>No results found{searchMode && ` for "${query}"`}.</NoResults>
      )}

      <Grid>
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <MovieCard ref={lastMovieElementRef} key={movie.id} to={`/movie/${movie.id}`}>
                <Poster
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <ReleaseDate>{movie.release_date?.slice(0, 4)}</ReleaseDate>
              </MovieCard>
            );
          } else {
            return (
              <MovieCard key={movie.id} to={`/movie/${movie.id}`}>
                <Poster
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <ReleaseDate>{movie.release_date?.slice(0, 4)}</ReleaseDate>
              </MovieCard>
            );
          }
        })}
      </Grid>

      {loading && <Loading>Loading movies...</Loading>}
    </Wrapper>
  );
};

export default Home;

// Styled Components (added ResetButton and NoResults)
const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;

    span {
      color: #ff416c;
    }
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;

  &:hover {
    background: #ff416c;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.65rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 60%;
  max-width: 320px;
`;

const SearchButton = styled.button`
  background: #ff416c;
  color: white;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background: #444;
  color: white;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #222;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #222;
  font-size: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.4rem;
`;

const MovieCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  border-radius: 12px 12px 0 0;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 0.6rem 1rem 0 1rem;
  font-weight: 600;
  color: #333;
`;

const ReleaseDate = styled.p`
  margin: 0.25rem 1rem 1rem 1rem;
  color: #777;
  font-size: 0.85rem;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.3rem;
  color: #666;
  margin-top: 3rem;
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: red;
  margin-top: 3rem;
  font-size: 1.3rem;
`;

const NoResults = styled.div`
  text-align: center;
  color: #444;
  font-size: 1.5rem;
  margin-top: 4rem;
`;
