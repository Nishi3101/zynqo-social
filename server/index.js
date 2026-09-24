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

// Rooms REST API
app.get('/api/rooms', (req, res) => {
  const roomList = Object.values(rooms).map(r => ({
    id: r.id,
    name: r.name,
    currentReelId: r.currentReelId,
    memberCount: r.members.length,
    isPlaying: r.isPlaying
  }));
  res.json({ rooms: roomList });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];
  if (room) {
    res.json({
      exists: true,
      room: {
        id: room.id,
        name: room.name,
        currentReelId: room.currentReelId,
        memberCount: room.members.length,
        isPlaying: room.isPlaying
      }
    });
  } else {
    res.status(404).json({ exists: false, message: 'Room not found' });
  }
});

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  socket.on('join_room', ({ roomId, userName, avatar, roomName, reelId }) => {
    const targetRoomId = (roomId || 'room-global-ai').trim();
    socket.join(targetRoomId);

    if (!rooms[targetRoomId]) {
      rooms[targetRoomId] = {
        id: targetRoomId,
        name: roomName || `Room: ${targetRoomId}`,
        currentReelId: reelId || 'reel-1',
        currentTime: 0,
        isPlaying: true,
        members: [
          { id: 'bot-room', name: 'Nova (AI Room Assistant)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isAI: true }
        ],
        messages: [
          { id: `m-${Date.now()}`, user: 'Nova (AI Room Assistant)', isAI: true, text: `Welcome to room ${targetRoomId}! Video playback and chat are synchronized across all participants in real time.`, timestamp: 'Just now' }
        ]
      };
    }

    const member = {
      id: socket.id,
      name: userName || 'Viewer',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    };

    // Prevent duplicate members with the same socket id
    const existingIdx = rooms[targetRoomId].members.findIndex(m => m.id === socket.id);
    if (existingIdx >= 0) {
      rooms[targetRoomId].members[existingIdx] = member;
    } else {
      rooms[targetRoomId].members.push(member);
    }

    // Send full room state to newly joined user
    socket.emit('room_state', rooms[targetRoomId]);

    // Broadcast member joined
    io.to(targetRoomId).emit('member_joined', {
      members: rooms[targetRoomId].members,
      joinedUser: member
    });

    // Add system notification message
    const sysMsg = {
      id: `sys-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user: 'System',
      isSystem: true,
      text: `${member.name} joined the room`,
      timestamp: 'Just now'
    };
    rooms[targetRoomId].messages.push(sysMsg);
    io.to(targetRoomId).emit('new_message', sysMsg);
  });

  socket.on('leave_room', ({ roomId, userName }) => {
    const targetRoomId = (roomId || '').trim();
    if (targetRoomId && rooms[targetRoomId]) {
      socket.leave(targetRoomId);
      rooms[targetRoomId].members = rooms[targetRoomId].members.filter(m => m.id !== socket.id);
      
      const sysLeaveMsg = {
        id: `sys-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        user: 'System',
        isSystem: true,
        text: `${userName || 'A member'} left the room`,
        timestamp: 'Just now'
      };
      rooms[targetRoomId].messages.push(sysLeaveMsg);

      io.to(targetRoomId).emit('member_left', {
        members: rooms[targetRoomId].members,
        leftUser: userName
      });
      io.to(targetRoomId).emit('new_message', sysLeaveMsg);
    }
  });

  socket.on('sync_playback', ({ roomId, reelId, currentTime, isPlaying }) => {
    const targetRoomId = (roomId || '').trim();
    const room = rooms[targetRoomId];
    if (room) {
      if (reelId) room.currentReelId = reelId;
      if (typeof currentTime === 'number') room.currentTime = currentTime;
      if (typeof isPlaying === 'boolean') room.isPlaying = isPlaying;

      // Broadcast to other room members (avoiding echo to sender)
      socket.to(targetRoomId).emit('playback_synced', {
        reelId: room.currentReelId,
        currentTime: room.currentTime,
        isPlaying: room.isPlaying,
        senderId: socket.id
      });
    }
  });

  socket.on('change_reel', ({ roomId, reelId, reelTitle }) => {
    const targetRoomId = (roomId || '').trim();
    const room = rooms[targetRoomId];
    if (room && reelId) {
      room.currentReelId = reelId;
      room.currentTime = 0;
      room.isPlaying = true;

      io.to(targetRoomId).emit('playback_synced', {
        reelId,
        currentTime: 0,
        isPlaying: true,
        senderId: socket.id
      });

      const sysReelMsg = {
        id: `sys-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        user: 'System',
        isSystem: true,
        text: `Now playing: "${reelTitle || reelId}"`,
        timestamp: 'Just now'
      };
      room.messages.push(sysReelMsg);
      io.to(targetRoomId).emit('new_message', sysReelMsg);
    }
  });

  socket.on('send_message', ({ roomId, text, userName, avatar }) => {
    const targetRoomId = (roomId || '').trim();
    const room = rooms[targetRoomId];
    if (room && text && text.trim()) {
      const msg = {
        id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        user: userName || 'Viewer',
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        text: text.trim(),
        timestamp: 'Just now'
      };
      room.messages.push(msg);
      io.to(targetRoomId).emit('new_message', msg);

      // Trigger AI Room Assistant smart interaction if requested or occasionally
      if (text.toLowerCase().includes('help') || text.toLowerCase().includes('what') || text.toLowerCase().includes('ai') || Math.random() < 0.25) {
        setTimeout(() => {
          const aiPrompts = [
            `💡 AI Insight: Watching together increases conceptual retention by 42%! Feel free to pause and discuss any frame.`,
            `🤔 Discussion Question: How do you think this concept applies to production environments?`,
            `✨ Quick fact: You earn +25 XP just for active watch party participation!`,
            `🎯 Tap 'Make This Useful' if you want a 3-question quiz generated from this current clip!`,
            `🚀 Tip: Anyone in the room can pause or seek playback to synchronize for all participants!`
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
          io.to(targetRoomId).emit('new_message', aiMsg);
        }, 1800);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
    for (const rId in rooms) {
      const prevCount = rooms[rId].members.length;
      rooms[rId].members = rooms[rId].members.filter(m => m.id !== socket.id);
      if (rooms[rId].members.length !== prevCount) {
        io.to(rId).emit('member_left', { members: rooms[rId].members });
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Zynqo Social Server running at http://localhost:${PORT}`);
  console.log(`📡 WebSocket / Socket.IO ready for Watch Together sync`);
});
