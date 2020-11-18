// Dependences
const express = require("express");

// Express config
const app = express();
const PORT = process.env.PORT || 3001;

// Express data handler config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./routes/testRoutes")(app);

// Listener
app.listen(PORT, () => {
  console.log(`Geoverse main server app listening on: ${PORT}`);
});
