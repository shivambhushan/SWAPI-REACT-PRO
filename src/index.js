import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, MovieDetail, Movies, Starships, StarshipDetail } from "./App";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route exact path="/movies/:id" element={<MovieDetail />} />
          <Route path="/starships" element={<Starships />} />
          <Route exact path="/starships/:id" element={<StarshipDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
