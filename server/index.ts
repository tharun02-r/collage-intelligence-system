import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// 1. Authentication API
// ---------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    
    // In a real app, hash and compare passwords.
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Strip password from response
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------
// 2. Global User Directory API (Admin)
// ---------------------------------------------------------
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        status: true,
        allocation: {
          select: {
            room: true,
            block: true
          }
        }
      }
    });
    
    // Format response to match frontend expectations
    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      role: u.role,
      status: u.status,
      room: u.allocation ? `${u.allocation.block} - ${u.allocation.room}` : 'N/A'
    }));

    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------
// 3. Hostel Allocation API (Warden)
// ---------------------------------------------------------
app.get('/api/hostel/allocations', async (req, res) => {
  try {
    const allocations = await prisma.hostelAllocation.findMany({
      include: {
        user: {
          select: { name: true, status: true, id: true }
        }
      }
    });
    res.json(allocations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/hostel/allocate', async (req, res) => {
  try {
    const { userId, room, block } = req.body;
    
    const allocation = await prisma.hostelAllocation.create({
      data: {
        userId,
        room,
        block
      }
    });
    res.json(allocation);
  } catch (error) {
    // Unique constraint will fail if user already mapped, etc.
    res.status(400).json({ error: 'Failed to allocate room.' });
  }
});

// ---------------------------------------------------------
// 4. CampusMind Logs API (Counselor)
// ---------------------------------------------------------
app.get('/api/counselor/logs', async (req, res) => {
  try {
    const logs = await prisma.campusMindLog.findMany({
      orderBy: { date: 'desc' },
      include: {
        user: {
          select: { id: true }
        }
      }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------
// 5. Predictive Analytics & Resources API
// ---------------------------------------------------------
app.get('/api/analytics/risk', async (req, res) => {
  try {
    const risks = await prisma.riskScore.findMany({
      include: {
        profile: {
          include: {
            user: { select: { id: true, name: true } },
            academics: { orderBy: { term: 'desc' }, take: 1 }
          }
        }
      },
      orderBy: { score: 'desc' }
    });
    
    // Process to send actionable items
    const actionableRisks = risks.map(r => ({
      id: r.profile.user.id,
      name: r.profile.user.name,
      course: r.profile.course,
      score: r.score,
      level: r.level,
      gpa: r.profile.academics[0]?.grade || 0,
      intervention: r.intervention
    }));

    res.json(actionableRisks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/analytics/resources', async (req, res) => {
  try {
    const usage = await prisma.resourceUsage.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    res.json(usage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/analytics/hostel', async (req, res) => {
  try {
    const rooms = await prisma.hostelRoom.findMany({
      orderBy: { block: 'asc' }
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`CampusGuard Backend running on http://localhost:${PORT}`);
});
