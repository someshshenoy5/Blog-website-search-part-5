import React, { useEffect, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import axios from "axios";

const LongArticle = () => {
  const { id } = useParams();
  const { getBlogById, selectedBlog, isError } = useContext(AppContext);
  const prevIdRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (prevIdRef.current !== id) {
      getBlogById(id);
      prevIdRef.current = id;
    }
  }, [id, getBlogById]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/blogs/${id}`);
        alert("Blog deleted successfully!");
        navigate("/");
        window.location.reload();
      } catch (error) {
        alert("Failed to delete the blog. Please try again.");
        console.error(error);
      }
    }
  };

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }
  if (!selectedBlog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="long-article">
      <div className="Article-Heading">
        <h1 className="poppin-Heading">{selectedBlog.blogTitle} </h1>
        <h4 className="category"> {selectedBlog.category}</h4>
      </div>
      <p className="playwrite-mx-para">{selectedBlog.content}</p>
      <p className="article-author poppin-text">By {selectedBlog.authorName}</p>
      <div className="updatedeletesection">
        <Link to={`/updateBlog/${id}`}>
          <button className="updatebutton"> EDIT</button>
        </Link>
        <button className="deletebutton" onClick={handleDelete}>
          DELETE{" "}
        </button>
      </div>
    </div>
  );
};

export default LongArticle;
