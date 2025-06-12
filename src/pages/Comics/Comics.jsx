import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import "./Comics.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Comics() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/comics?limit=100`);
        setComics(response.data.results || []);
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
  }, []);

  return (
    <div className="comics-page">
      <h1>Marvel Comics</h1>
      {isLoading ? (
        <div className="loader-container">
          <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="comics-grid">
          {comics.map((comic) => (
            <div key={comic._id} className="comic-card">
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="comic-img"
              />
              <h2 className="comic-title">{comic.title}</h2>
              <p className="comic-desc">
                {comic.description ? comic.description : "No description."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comics; 