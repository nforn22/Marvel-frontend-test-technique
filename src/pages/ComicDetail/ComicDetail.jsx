import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import "./ComicDetail.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ComicDetail() {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComic = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/comics/comic/${comicId}`);
        setComic(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "An error has occurred while loading the comic."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [comicId]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!comic) {
    return <div className="error-message">Comic not found</div>;
  }

  const thumbnailUrl = comic.thumbnail?.path && comic.thumbnail?.extension
    ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
    : null;

  return (
    <div className="comic-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className="comic-detail-container">
        {thumbnailUrl && (
          <div className="comic-image">
            <img
              src={thumbnailUrl}
              alt={comic.title || "Comic"}
            />
          </div>
        )}
        
        <div className="comic-info">
          <h1>{comic.title || "Untitled"}</h1>
          
          {comic.description && (
            <div className="comic-description">
              <h2>Description :</h2>
              <p>{comic.description}</p>
            </div>
          )}

          {comic.creators?.items && comic.creators.items.length > 0 && (
            <div className="comic-creators">
              <h2>Creators :</h2>
              <ul>
                {comic.creators.items.map((creator, index) => (
                  <li key={index}>
                    {creator.name} ({creator.role})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {comic.characters?.items && comic.characters.items.length > 0 && (
            <div className="comic-characters">
              <h2>Characters :</h2>
              <ul>
                {comic.characters.items.map((character, index) => (
                  <li key={index}>{character.name}</li>
                ))}
              </ul>
            </div>
          )}

          {comic.dates && comic.dates.length > 0 && (
            <div className="comic-dates">
              <h2>Dates :</h2>
              <ul>
                {comic.dates.map((date, index) => (
                  <li key={index}>
                    {date.type}: {new Date(date.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComicDetail; 