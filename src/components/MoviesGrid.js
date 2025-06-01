import React, { useState } from "react";
import '../styles.css'
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {

    // State variables for search input, genre and rating filters
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    // Handle changes in the search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle changes in the genre dropdown
    const handerGenreChange = (e) => {
        setGenre(e.target.value);
    };

    // Handle changes in the rating dropdown
    const handerRatingChange = (e) => {
        setRating(e.target.value);
    };

    // Check if movie matches the selected genre
    const matchGenre = (movie, genre) => {
        return (
            genre === "All Genres" ||
            movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    // Check if movie title includes the search term
    const matchSearch = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    // Check if movie rating matches the selected rating filter
    const matchRating = (movie, rating) => {
        switch (rating) {
            case "All":
                return true;  // show all ratings
            case "Good":
                return movie.rating >= 8;
            case "Ok":
                return movie.rating >= 5 && movie.rating < 8;
            case "Bad":
                return movie.rating < 5;
            default:
                return false; // unknown rating filter, exclude movie
        }
    };

    // Filter movies based on genre, rating, and search term
    const filteredMovies = movies.filter((movie) =>
        matchGenre(movie, genre) &&
        matchRating(movie, rating) &&
        matchSearch(movie, searchTerm)
    );

    return (
        <div>
            {/* Search input field */}
            <input
                type="text"
                className="search-input"
                placeholder="Search Movies..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {/* Filter bar for genre and rating */}
            <div className="filter-bar">

                {/* Genre filter dropdown */}
                <div className="filter-slot">
                    <label>Genres</label>
                    <select className="filter-dropdown" value={genre} onChange={handerGenreChange}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>

                {/* Rating filter dropdown */}
                <div className="filter-slot">
                    <label>Rating</label>
                    <select className="filter-dropdown" value={rating} onChange={handerRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            {/* Display filtered movies using the MovieCard component */}
            <div className="movies-grid">
                {
                    filteredMovies.map((movie) => (
                        <MovieCard movie={movie}
                            key={movie.id}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={watchlist.includes(movie.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
}
