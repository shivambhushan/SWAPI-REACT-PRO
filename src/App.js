import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export const Home = () => {
  return (
    <div className="p-5">
      <div className="row p-5 bg-light bg-gradient">
        <div className="col-12 text-center mb-4">
          <h1>Star Wars</h1>
        </div>
        <div
          className="col-12 mb-4 col-md-6 pb-5 text-center"
          style={{ height: "250px" }}
        >
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <div className="card">
              <img
                alt=""
                style={{ height: "220px", width: "180px" }}
                src="https://resizing.flixster.com/Idj7Ub2LQUiqvUaSkt-j0wPQ3s4=/206x305/v2/https://resizing.flixster.com/nyQEEUdokTK91hsyvk18xi7tGTE=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2RhMGM0OTk2LTRiZDktNDg1ZC05NzQ5LTUzMzQwZjA1OWFlMy53ZWJw"
              />
              <h6 className="pt-2 text-black">Movies</h6>
            </div>
          </Link>
        </div>
        <div
          className="col-12 mb-4 col-md-6 pb-5 text-center"
          style={{ height: "250px" }}
        >
          <Link to="/starships" style={{ textDecoration: "none" }}>
            <div className="card">
              <img
                alt=""
                style={{ height: "220px", width: "180px" }}
                src="https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg"
              />
              <h6 className="pt-2 text-black">Starships</h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const getMovies = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://swapi.dev/api/films/")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    async function moviesRes() {
      const res = await getMovies();
      const result = res.results || [];
      const newRes = result.map((item, index) => {
        const date = moment(item.release_date, "YYYY-MM-DD");
        const parts = item.url.split("/");
        const newParts = parts.filter((item) => item !== "");
        const id = newParts[newParts.length - 1];
        return {
          ...item,
          id,
          releaseDate: date.format("YYYY-MM-DDTHH:mm:ss")
        };
      });
      const movies =
        newRes.sort(
          (a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
        ) || [];
      setMoviesList(movies);
    }
    moviesRes();
  }, []);

  return (
    <div className="p-5">
      <div className="row p-3 bg-light bg-gradient">
        <div className="col-12 text-left mb-4">
          <div className="row">
            <div className="col-1">
              <Link className="deco-none" to="/">
                <span>&#8592;</span>
              </Link>
            </div>
            <div className="col-11">
              <h5>Movies</h5>
            </div>
          </div>
        </div>
        {moviesList.length < 1 ? (
          <div className="col-12 text-center" style={{ height: "200px" }}>
            Loading...
          </div>
        ) : (
          <table className="col-12">
            <thead>
              <tr className="w-100">
                <th style={{ width: "80px" }}>S. No.</th>
                <th>Movie</th>
                <th>Release Date</th>
              </tr>
            </thead>
            {moviesList.map((item, index) => {
              return (
                <tr>
                  <Link
                    style={{ display: "contents" }}
                    className="deco-none w-100"
                    to={`/movies/${item.id}`}
                  >
                    <td style={{ width: "80px" }}>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      {moment(item.release_date, "YYYY-MM-DD").format(
                        "MMM DD, YYYY"
                      )}
                    </td>
                  </Link>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export const MovieDetail = () => {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const getMovieDetail = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://swapi.dev/api/films/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  const movieId = params.id;
  useEffect(() => {
    async function moviesRes(id) {
      const res = (await getMovieDetail(id)) || {};
      setMovieDetail(res);
    }
    moviesRes(movieId);
  }, [movieId]);

  return (
    <div className="p-5">
      <div className="row p-3 bg-light bg-gradient">
        {Object.keys(movieDetail).length < 1 ? (
          <div className="col-12 text-center" style={{ height: "200px" }}>
            Loading...
          </div>
        ) : (
          <div className="col-12 text-left" style={{ minHeight: "200px" }}>
            <div className="row">
              <div className="col-1">
                <Link className="deco-none" to="/movies">
                  <span role="img">&#8592;</span>
                </Link>
              </div>
              <div className="col-11">
                <h5>{movieDetail.title}</h5>
              </div>
              <div className="col-12 mt-3">
                <h6>Release Date</h6>
              </div>
              <div className="col-12 mt-1">
                <span>
                  {moment(movieDetail.release_date, "YYYY-MM-DD").format(
                    "MMM DD, YYYY"
                  )}
                </span>
              </div>
              <div className="col-12 mt-3">
                <h6>Director(s)</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{movieDetail.director}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Producer(s)</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{movieDetail.producer}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>About</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{movieDetail.opening_crawl}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Starships = () => {
  const [shipsList, setShipsList] = useState([]);
  const getStarships = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://swapi.dev/api/starships/")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    async function shipsRes() {
      const res = await getStarships();
      const result = res.results || [];
      const newRes = result.map((item) => {
        const parts = item.url.split("/");
        const newParts = parts.filter((item) => item !== "");
        const id = newParts[newParts.length - 1];
        return { ...item, id };
      });
      const ships =
        newRes.sort((a, b) => {
          console.log(a, a.length, b, b.length);
          return a.length.split(",").join("") * 1 >
            b.length.split(",").join("") * 1
            ? 1
            : -1;
        }) || [];
      setShipsList(ships);
    }
    shipsRes();
  }, []);

  return (
    <div className="p-5">
      <div className="row p-3 bg-light bg-gradient">
        <div className="col-12 text-left mb-4">
          <div className="row">
            <div className="col-1">
              <Link className="deco-none" to="/">
                <span>&#8592;</span>
              </Link>
            </div>
            <div className="col-11">
              <h5>Starships</h5>
            </div>
          </div>
        </div>
        {shipsList.length < 1 ? (
          <div className="col-12 text-center" style={{ height: "200px" }}>
            Loading...
          </div>
        ) : (
          <table className="col-12">
            <tr className="w-100">
              <th>S. No.</th>
              <th>Starships</th>
              <th>Length</th>
            </tr>
            {shipsList.map((item, index) => {
              return (
                <tr>
                  <Link
                    style={{ display: "contents" }}
                    className="deco-none"
                    to={`/starships/${item.id}`}
                  >
                    <td style={{ width: "80px" }}>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.length}</td>
                  </Link>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export const StarshipDetail = () => {
  const params = useParams();
  const [shipDetail, setShipDetail] = useState([]);
  const getShipDetail = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://swapi.dev/api/starships/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  const shipId = params.id;
  useEffect(() => {
    async function shipsRes(id) {
      const res = (await getShipDetail(id)) || {};
      setShipDetail(res);
    }
    shipsRes(shipId);
  }, [shipId]);

  return (
    <div className="p-5">
      <div className="row p-3 bg-light bg-gradient">
        {Object.keys(shipDetail).length < 1 ? (
          <div
            className="col-12 text-center m-auto"
            style={{ height: "200px" }}
          >
            Loading...
          </div>
        ) : (
          <div className="col-12 text-left" style={{ minHeight: "200px" }}>
            <div className="row">
              <div className="col-1">
                <Link className="deco-none" to="/starships">
                  <span role="img">&#8592;</span>
                </Link>
              </div>
              <div className="col-11">
                <h5>{shipDetail.name}</h5>
              </div>
              <div className="col-12 mt-3">
                <h6>Length</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.length}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Model</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.model}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Manufacturer</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.manufacturer}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Crew</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.crew}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Passengers</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.passengers}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Cargo Capacity</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.cargo_capacity}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Starship Class</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.starship_class}</span>
              </div>
              <div className="col-12 mt-3">
                <h6>Hyperdrive Rating</h6>
              </div>
              <div className="col-12 mt-1">
                <span>{shipDetail.hyperdrive_rating}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
