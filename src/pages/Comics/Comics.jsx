import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import captainAmericaIcon from "../../assets/icons8-captain-america-64.png";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Comics.css";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 100;

function Comics() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const userToken = Cookies.get("token");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const skip = (page - 1) * PAGE_SIZE;
        let url = `${API_URL}/comics?limit=${PAGE_SIZE}&skip=${skip}`;
        if (search) {
          url += `&title=${encodeURIComponent(search)}`;
        }
        const response = await axios.get(url);
        setComics(response.data.results || []);
        setCount(response.data.count || 0);
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
  }, [page, search]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        setFavorites(response.data.comics || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (comicId) => {
    if (!userToken) {
      alert("You must be logged in to add favorites.");
      return;
    }
    try {
      if (favorites.includes(comicId)) {
        await axios.delete(`${API_URL}/favorites/comics/${comicId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setFavorites(prev => prev.filter(id => id !== comicId));
      } else {
        await axios.post(`${API_URL}/favorites/comics/${comicId}`, {}, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setFavorites(prev => [...prev, comicId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleCardClick = (comicId) => {
    navigate(`/comics/comic/${comicId}`);
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
    <div className="comics-page">
      <h1>Marvel Comics</h1>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <SearchBar onSearch={handleSearch} placeholder="Search comics..." />
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Circles height={60} width={60} color="#e62429" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="comics-grid">
            {comics.map((comic) => (
              <div key={comic._id} className="comic-card" style={{ position: "relative" }}>
                <img
                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="comic-img"
                  onClick={() => handleCardClick(comic._id)}
                  style={{ cursor: "pointer" }}
                />
                {userToken ? (
                  <button
                    className="favorite-btn"
                    onClick={event => { event.stopPropagation(); handleToggleFavorite(comic._id); }}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      opacity: favorites.includes(comic._id) ? 1 : 0.4,
                      transition: "opacity 0.2s"
                    }}
                    aria-label={favorites.includes(comic._id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <img
                      src={captainAmericaIcon}
                      alt="Favorite"
                      width={32}
                      height={32}
                    />
                  </button>
                ) : (
                  <Link to="#" onClick={event => { event.stopPropagation(); alert("You need to be logged in to add favorites."); }}>
                    <img
                      src={captainAmericaIcon}
                      alt="Login to add favorite"
                      width={32}
                      height={32}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0.4,
                        transition: "opacity 0.2s"
                      }}
                    />
                  </Link>
                )}
                <h2 className="comic-title">{comic.title}</h2>
                <p className="comic-desc">
                  {comic.description ? comic.description : "No description."}
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

export default Comics; 