const socket = require('socket.io');

// Setup Firebase
const db = require('../../config/initFirebase');

// Socket setup
const createServer = (server) => {
  const io = socket(server);

  const activeUsers = new Set();

  const createNamespace = (socket, namespace) => {
    socket.on('direct', (room) => {
      socket.join(room);
    });

    socket.on('new user', (data) => {
      socket.userId = data;
      activeUsers.add(data);
      io.of(namespace).emit('new user', [...activeUsers]);
    });

    socket.on('disconnect', () => {
      activeUsers.delete(socket.userId);
      io.of(namespace).emit('user disconnected', socket.userId);
    });

    socket.on('wall post', async (data) => {
      io.of(namespace).emit('wall post', data);
      const postData = {
        namespace,
        user: data.nick,
        timestamp: data.timestamp,
        message: data.message,
      };
      await db.collection('posts').add(postData);
    });

    socket.on('direct message', async (data) => {
      io.of(namespace).to(data.id).emit('direct message', data);
      const messsageObj = {
        conversationId: data.id,
        from: data.nick,
        timestamp: data.timestamp,
        text: data.message,
      };
      await db.collection('conversations').doc(data.id).collection('messages').add(messsageObj);
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
    });
  };

  // Create direct message namespace
  const directNamespace = io.of('/direct');
  directNamespace.on('connection', (socket) => {
    createNamespace(socket, 'direct');
  });

  // import communities
  const communities = ['vancouver-test'];

  // Create a namespace for each community
  communities.forEach((communityNamespace) => {
    const namespace = io.of(`/${communityNamespace}`);
    namespace.on('connection', (socket) => {
      createNamespace(socket, communityNamespace);
    });
  });
};

module.exports = createServer;
