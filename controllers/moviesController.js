// DOTENV CONFIGURATION
require("dotenv").config();

const connection = require("../data/movies_db");
const { SERVER_DOMAIN, SERVER_PORT } = process.env;

// INDEX
function index(req, res) {
  const moviesSql = `
                    SELECT * 
                    FROM movies;
                    `;

  connection.query(moviesSql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// SHOW
function show(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const moviesSql = `
                    SELECT * 
                    FROM movies
                    WHERE id = ?;
                    `;

  const reviewsSql = `
                    SELECT reviews.name AS reviews_author_name,
                    reviews.vote,
                    reviews.text

                    FROM reviews
                    JOIN movies
                    ON movies.id = reviews.movie_id
                    WHERE movies.id = ?;
                    `;

  connection.query(moviesSql, [id], (err, moviesResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (moviesResults.length === 0)
      return res.status(404).json({ error: "Id required not found" });

    const movie = moviesResults[0];
    console.log(movie);

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
}

// STORE
function store(req, res) {
  const { title, content, image } = req.body;
}

// UPDATE
function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }
}

// MODIFY
function modify(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }
}

// DESTROY
function destroy(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }
}

const createImgPath = (imgPath) => {
  return;
};

module.exports = { index, show, store, update, modify, destroy };
