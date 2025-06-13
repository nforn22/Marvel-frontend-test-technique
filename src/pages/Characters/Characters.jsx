import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./Characters.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 100;

function Characters({ search }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
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

  const handleCardClick = (characterId) => {
    navigate(`/characters/${characterId}/comics`);
  };

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="characters-page">
      <h1>Marvel Characters</h1>
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
                onClick={() => handleCardClick(character._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-img"
                />
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