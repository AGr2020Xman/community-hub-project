// Dependences
const express = require("express");
const messaging = require("./controllers/messaging/messagingServer");

// Express config
const app = express();
const PORT = process.env.PORT || 3001;

// Express data handler config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controllers/mypages/myPage")(app);
require("./controllers/testController")(app);

// Listener
const server = app.listen(PORT, () => {
  console.log(`Geoverse main server app listening on: ${PORT}`);
});

// Create Geoverse chat server
messaging(server);
