const socket = require("socket.io");

// Socket setup
const createServer = (server) => {
  const io = socket(server);

  const activeUsers = new Set();

  const createNamespace = (socket, namespace) => {
    console.log("Made socket connection", namespace);

    socket.on("new user", (data) => {
      socket.userId = data;
      activeUsers.add(data);
      io.of(namespace).emit("new user", [...activeUsers]);
    });

    socket.on("disconnect", () => {
      activeUsers.delete(socket.userId);
      io.of(namespace).emit("user disconnected", socket.userId);
    });

    socket.on("chat message", (data) => {
      io.of(namespace).emit("chat message", data);
      console.log(data);
    });

    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
    });
  };

  // import communities
  const communities = ["cars", "computers"];

  // Create a namespace for each community
  communities.forEach((communityNamespace) => {
    const namespace = io.of(`/${communityNamespace}`);
    namespace.on("connection", (socket) => {
      createNamespace(socket, communityNamespace);
    });
  });
};

module.exports = createServer;
