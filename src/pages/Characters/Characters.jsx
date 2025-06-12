import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import "./Characters.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/characters?limit=100`);
        setCharacters(response.data.results || []);
      } catch (error) {
        setError(
          error.response?.data?.message || // reponse du back
          error.message || // reponse d'axios
        "An error occurred while loading characters." // reponse par defaut
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

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
        <div className="characters-grid">
          {characters.map((character) => (
            <div key={character._id} className="character-card">
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
      )}
    </div>
  );
}

export default Characters; 