import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./Comics.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 100;

function Comics({ search }) {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

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

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleChange = (event, value) => {
    setPage(value);
  };

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
        <>
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