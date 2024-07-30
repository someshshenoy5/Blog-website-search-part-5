import React, { useState, useEffect } from "react";
import "./Navbar.css";
import searchButton from "../../assets/searching.png";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs/search?text=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
        setSearchSubmitted(true);
        setShowSearchResults(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1>TELUSKO</h1>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/addBlog">Add Article</a>
          </li>
          <li>
            <a href="/Login ">Login</a>
          </li>
          <li>
            <div className="search-form">
              <input
                className="form-control"
                style={{ outline: "none" }}
                type="search"
                placeholder="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            {showSearchResults && (
              <ul className="list-group">
                {searchResults.length > 0
                  ? searchResults.map((result) => (
                      <li key={result.blogId} className="list-group-item">
                        <a
                          href={`/article/${result.blogId}`}
                          className="search-result-link"
                        >
                          <span>{result.blogTitle}</span>
                        </a>
                      </li>
                    ))
                  : noResults && (
                      <p className="no-results-message">
                        No Article with such title
                      </p>
                    )}
              </ul>
            )}
          </li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? "hamburger-active" : ""}`}
          onClick={toggleNav}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
      <div className={`menubar ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/addBlog">Add Article</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <div className="search-form">
              <input
                className="form-control"
                style={{ outline: "none" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            {showSearchResults && (
              <ul className="list-group">
                {searchResults.length > 0
                  ? searchResults.map((result) => (
                      <li key={result.blogId} className="list-group-item">
                        <a
                          href={`/article/${result.blogId}`}
                          className="search-result-link"
                        >
                          <span>{result.blogTitle}</span>
                        </a>
                      </li>
                    ))
                  : noResults && (
                      <p className="no-results-message">
                        No Article with such title
                      </p>
                    )}
              </ul>
            )}
            {/* </div> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
