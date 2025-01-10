const connection = require("../data/db");

// * INDEX
function index(req, res) {
  const sql = `SELECT * FROM movies;`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// * SHOW
function show(req, res) {
  const id = parseInt(req.params.id);
}

// * STORE
function store(req, res) {
  const { title, content, image } = req.body;
}

// * UPDATE
function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;
}

// * MODIFY
function modify(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;
}

// * DESTROY
function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
