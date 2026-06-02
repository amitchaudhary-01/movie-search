import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies from OMDB API
  const fetchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=4a3b711b&s=${query}`
      );

      if (response.data.Response === "False") {
        setMovies([]);
        setError(response.data.Error);
        return;
      }

      setMovies(response.data.Search);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Enter key triggers search
  const handleKey = (e) => {
    if (e.key === "Enter") fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎬 Movie Search App
      </h1>

      {/* Input Section */}
      <div className="max-w-xl mx-auto flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />
        <button
          onClick={fetchMovies}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center mt-6">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-8">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="mt-3 font-semibold">{movie.Title}</h2>
            <p className="text-gray-400">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;