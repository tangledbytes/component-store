const express = require("express");
const cors = require("cors");

const app = express();
// Logger
app.use((req, _, next) => {
  console.log(req.headers);
  next();
});

// CORS
app.use(cors());

// Fake authorization
app.use((req, res, next) => {
    if (req.get('x-auth-token') !== "welcome123") res.sendStatus(403);
    next();
})

// Serve static assets
app.use(express.static("public"));

app.listen(8080, () => console.log("Server running on port: 8080"));
