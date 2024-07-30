import React from "react";
import "./App.css";
import { AppProvider } from "./AppContext";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LongArticle from "./Components/LongArticle";
import AddBlog from "./Components/AddBlog";
import UpdateBlog from "./Components/UpdateBlog";
import Login from "./Components/Login";

function App() {
  return (
    <AppProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<LongArticle />} />
          <Route path="/addBlog" element={<AddBlog/>}/>
          <Route path="/updateBlog/:id" element ={<UpdateBlog/>}/>
          <Route path="/login" element ={<Login/>}/>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
