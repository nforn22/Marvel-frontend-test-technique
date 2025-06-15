import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import "./CharacterComics.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function CharacterComics() {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/comics/${characterId}`);
        setComics(response.data.comics || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while loading comics."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchComics();
  }, [characterId]);

  return (
    <div className="character-comics-page">
      <h1>Comics for Character</h1>
      {isLoading ? (
        <div className="loader-container">
          <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="comics-grid">
          {comics.length === 0 ? (
            <p>No comics found for this character.</p>
          ) : (
            comics.map((comic) => (
              <div key={comic._id} className="comic-card">
                <img
                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="comic-img comic-img-pointer"
                />
                <h2 className="comic-title">{comic.title}</h2>
                <p className="comic-desc">
                  {comic.description ? comic.description : "No description."}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterComics; 