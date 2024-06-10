import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { PORT, NODE_ENV, DEV_CLIENT_URL, PROD_CLIENT_URL } from './config';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: NODE_ENV === 'development' ? DEV_CLIENT_URL : PROD_CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
  });

  socket.on('user-toggle-audio', (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-toggle-audio', userId);
  });

  socket.on('user-toggle-video', (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-toggle-video', userId);
  });

  socket.on('user-leave', (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-leave', userId);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
