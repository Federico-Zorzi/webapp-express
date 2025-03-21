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
    let movies = results.map((movie) => {
      return { ...movie, image: createImgPath(movie.image) };
    });
    res.json(movies);
  });
}

// INDEX REVIEWS
function indexReviews(req, res) {
  const id = parseInt(req.params.id);
  const reviewsSql = `
                    SELECT * 
                    FROM reviews
                    WHERE movie_id = ?
                    ORDER BY reviews.updated_at DESC;
                    `;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  connection.query(reviewsSql, [id], (err, reviewsResult) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (reviewsResult.length === 0)
      return res.status(404).json({ error: "Id required not found" });
    return res.json(reviewsResult);
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
                    WHERE movies.id = ?
                    ORDER BY reviews.updated_at DESC;
                    `;

  connection.query(moviesSql, [id], (err, moviesResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (moviesResults.length === 0)
      return res.status(404).json({ error: "Id required not found" });

    const movie = moviesResults[0];
    movie.image = createImgPath(movie.image);

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
}

// STORE
function store(req, res) {
  const { title, director, genre, release_year, abstract, image } = req.body;

  if (!title || !director) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const moviesSql = `
              INSERT INTO movies (title, director, genre, release_year, abstract, image) 
              VALUES (?, ?, ?, ?, ?, ?);
              `;

  connection.query(
    moviesSql,
    [title, director, genre, release_year, abstract, image],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json({ title, director, genre, release_year, abstract, image });
    }
  );
}

// STORE REVIEWS
function storeReviews(req, res) {
  const movieId = parseInt(req.params.id);
  const { name, text, vote } = req.body;

  if (!name || !text || !vote) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const reviewsSql = `
              INSERT INTO reviews (name, text, vote, movie_id) 
              VALUES (?, ?, ?, ?);
              `;

  connection.query(reviewsSql, [name, text, vote, movieId], (err) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ name, text, vote, movieId });
  });
}

// UPDATE
function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, director, genre, release_year, abstract, image } = req.body;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  if (!title || !director) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const moviesSql = `UPDATE movies 
              SET title = ?, director = ?, genre = ?, release_year = ?, abstract = ?, image = ?
              WHERE (id = ?);
              `;

  connection.query(
    moviesSql,
    [title, director, genre, release_year, abstract, image, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json({ id, title, director, genre, release_year, abstract, image });
    }
  );
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

  const moviesSql = ` DELETE FROM movies WHERE id = ?`;

  connection.query(moviesSql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.sendStatus(204);
  });
}

const createImgPath = (imgPath) => {
  return `${SERVER_DOMAIN}:${SERVER_PORT}/img/${imgPath}`;
};

module.exports = {
  index,
  indexReviews,
  show,
  store,
  storeReviews,
  update,
  modify,
  destroy,
};
