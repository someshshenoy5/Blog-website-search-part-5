import React, { useState, useEffect } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedBlog, setUpdatedBlog] = useState({
    blogTitle: "",
    category: "",
    content: "",
    authorName: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchBlogById = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the blog');
        }
        const blog = await response.json();
        setUpdatedBlog({
          blogTitle: blog.blogTitle,
          category: blog.category,
          content: blog.content,
          authorName: blog.authorName
        });
        setIsLoading(false);
      } catch (error) {
        setIsError(error);
        setIsLoading(false);
      }
    };

    fetchBlogById(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/blogs/${id}`, updatedBlog);
      console.log("Blog updated successfully:", updatedBlog);
      alert("Blog updated successfully!");
      navigate(`/`);
      window.location.reload()
    } catch (error) {
      setIsError(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <div className="addblog">
      <form className="row g-1 addblogform" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="titleinput" className="form-label">
            Title :
          </label>
          <input
            type="text"
            className="form-control addbloggap poppin-text"
            id="titleinput"
            name="blogTitle"
            placeholder="Write article title"
            value={updatedBlog.blogTitle}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="categoryinput" className="form-label">
            Category :
          </label>
          <input
            type="text"
            className="form-control addbloggap poppin-text"
            id="categoryinput"
            name="category"
            placeholder="Category"
            value={updatedBlog.category}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="contentinput" className="form-label">
            Your Blog :
          </label>
          <textarea
            className="form-control addbloggap poppin-text"
            id="contentinput"
            placeholder="Start Typing..."
            rows="8"
            name="content"
            value={updatedBlog.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-md-2">
          <label htmlFor="authornameinput" className="form-label">
            Author Name :
          </label>
          <input
            type="text"
            className="form-control addbloggap poppin-text"
            id="authornameinput"
            name="authorName"
            placeholder="Enter Your Name"
            value={updatedBlog.authorName}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="postbtn poppin-text">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
