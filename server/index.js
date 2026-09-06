import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import reelsRouter from './routes/reels.js';
import aiRouter from './routes/ai.js';
import creatorRouter from './routes/creator.js';
import userRouter from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded media
app.use('/uploads', express.static(path.resolve(process.cwd(), 'server/uploads')));
// Serve public videos
app.use('/videos', express.static(path.resolve(process.cwd(), 'public/videos')));

// API Routes
app.use('/api/reels', reelsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/creator', creatorRouter);
app.use('/api/user', userRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Zynqo Social - Next-Gen AI Reels & Entertainment Platform',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend production build if available
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io') || req.path.startsWith('/uploads') || req.path.startsWith('/videos')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Watch Together Rooms in-memory state
const rooms = {
  'room-global-ai': {
    id: 'room-global-ai',
    name: '🤖 AI & Neural Pioneers Lounge',
    currentReelId: 'reel-1',
    currentTime: 0,
    isPlaying: true,
    members: [
      { id: 'bot-1', name: 'Sophia (AI Room Assistant)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isAI: true },
      { id: 'user-sam', name: 'Sam Altman Fan', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      { id: 'user-elena', name: 'Elena Vance', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }
    ],
    messages: [
      { id: 'm-init-1', user: 'Sophia (AI Room Assistant)', isAI: true, text: 'Welcome everyone! We are watching 60-second neural network breakdowns. Feel free to ask questions anytime!', timestamp: 'Just now' },
      { id: 'm-init-2', user: 'Sam Altman Fan', text: 'This explanation of gradient descent is so clean!', timestamp: '1m ago' }
    ]
  }
};

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  socket.on('join_room', ({ roomId, userName, avatar }) => {
    const targetRoomId = roomId || 'room-global-ai';
    socket.join(targetRoomId);

    if (!rooms[targetRoomId]) {
      rooms[targetRoomId] = {
        id: targetRoomId,
        name: `Room: ${targetRoomId}`,
        currentReelId: 'reel-1',
        currentTime: 0,
        isPlaying: true,
        members: [
          { id: 'bot-room', name: 'Nova (AI Room Assistant)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isAI: true }
        ],
        messages: [
          { id: `m-${Date.now()}`, user: 'Nova (AI Room Assistant)', isAI: true, text: 'Welcome to this private Watch Together lounge! Video playback is synchronized across all viewers.', timestamp: 'Just now' }
        ]
      };
    }

    const member = {
      id: socket.id,
      name: userName || 'Viewer',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    };

    rooms[targetRoomId].members.push(member);

    // Send room state to newly joined user
    socket.emit('room_state', rooms[targetRoomId]);

    // Notify room of new member
    io.to(targetRoomId).emit('member_joined', {
      members: rooms[targetRoomId].members,
      joinedUser: member
    });
  });

  socket.on('sync_playback', ({ roomId, reelId, currentTime, isPlaying }) => {
    const room = rooms[roomId];
    if (room) {
      room.currentReelId = reelId;
      room.currentTime = currentTime;
      room.isPlaying = isPlaying;
      socket.to(roomId).emit('playback_synced', { reelId, currentTime, isPlaying });
    }
  });

  socket.on('send_message', ({ roomId, text, userName, avatar }) => {
    const room = rooms[roomId];
    if (room) {
      const msg = {
        id: `msg-${Date.now()}`,
        user: userName || 'Viewer',
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        text,
        timestamp: 'Just now'
      };
      room.messages.push(msg);
      io.to(roomId).emit('new_message', msg);

      // Trigger AI Room Assistant automated smart interaction
      setTimeout(() => {
        const aiPrompts = [
          `💡 AI Insight: In this segment, notice how error gradients reduce over epochs. Who has tried tuning learning rates manually?`,
          `🤔 Discussion Question: Would you rely on this heuristic for real-world deployment?`,
          `✨ Quick fact: You earn +25 XP just for active watch party participation!`,
          `🎯 Tap 'Make This Useful' if you want a 3-question quiz generated from this current clip!`
        ];
        const randomPrompt = aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
        const aiMsg = {
          id: `ai-msg-${Date.now()}`,
          user: 'Nova (AI Room Assistant)',
          isAI: true,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          text: randomPrompt,
          timestamp: 'Just now'
        };
        room.messages.push(aiMsg);
        io.to(roomId).emit('new_message', aiMsg);
      }, 2500);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
    for (const rId in rooms) {
      rooms[rId].members = rooms[rId].members.filter(m => m.id !== socket.id);
      io.to(rId).emit('member_left', { members: rooms[rId].members });
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Zynqo Social Server running at http://localhost:${PORT}`);
  console.log(`📡 WebSocket / Socket.IO ready for Watch Together sync`);
});
