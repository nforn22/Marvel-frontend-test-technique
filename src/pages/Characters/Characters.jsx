import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import captainAmericaIcon from "../../assets/icons8-captain-america-64.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Characters.css";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 100;

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const skip = (page - 1) * PAGE_SIZE;
        let url = `${API_URL}/characters?limit=${PAGE_SIZE}&skip=${skip}`;
        if (search) {
          url += `&name=${encodeURIComponent(search)}`;
        }
        const response = await axios.get(url);
        setCharacters(response.data.results || []);
        setCount(response.data.count || 0);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while loading characters."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [page, search]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        setFavorites(response.data.favorites || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const handleCardClick = (characterId) => {
    navigate(`/characters/${characterId}/comics`);
  };

  const handleToggleFavorite = async (characterId) => {
    try {
      if (favorites.includes(characterId)) {
        await axios.delete(`${API_URL}/favorites/${characterId}`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        setFavorites(prev => prev.filter(id => id !== characterId));
      } else {
        await axios.post(`${API_URL}/favorites`, { characterId }, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        setFavorites(prev => [...prev, characterId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="characters-page">
      <h1>Marvel Characters</h1>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <SearchBar onSearch={handleSearch} placeholder="Search characters..." />
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="characters-grid">
            {characters.map((character) => (
              <div
                key={character._id}
                className="character-card"
                style={{ cursor: "pointer", position: "relative" }}
              >
                <img
                  src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-img"
                  onClick={() => handleCardClick(character._id)}
                />
                <button
                  className="favorite-btn"
                  onClick={event => { event.stopPropagation(); handleToggleFavorite(character._id); }}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    opacity: favorites.includes(character._id) ? 1 : 0.4,
                    transition: "opacity 0.2s"
                  }}
                  aria-label={favorites.includes(character._id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <img
                    src={captainAmericaIcon}
                    alt="Favorite"
                    width={32}
                    height={32}
                  />
                </button>
                <h2 className="character-name">{character.name}</h2>
                <p className="character-desc">
                  {character.description ? character.description : "No description."}
                </p>
              </div>
            ))}
          </div>
          <Stack spacing={2} alignItems="center" marginTop={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              shape="rounded"
              color="primary"
            />
          </Stack>
        </>
      )}
    </div>
  );
}

export default Characters; 