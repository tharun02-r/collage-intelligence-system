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

// ---------------------------------------------------------
// 4.5. Hostel Room Management API (Warden Write-Access)
// ---------------------------------------------------------
app.put('/api/hostel/room/status', async (req, res) => {
  try {
    const { id, status } = req.body;
    
    // E.g., change from "Available" to "Maintenance"
    const updatedRoom = await prisma.hostelRoom.update({
      where: { id },
      data: { status }
    });
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New endpoint to find unallocated students
app.get('/api/hostel/unallocated', async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'student',
        allocation: null // Assuming prisma relation returns null if not allocated
      },
      include: {
        profile: true
      }
    });

    res.json(students.map(s => ({
      id: s.id,
      name: s.name,
      course: s.profile?.course || 'Unknown Course',
      status: 'Pending Allocation'
    })));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refactored allocate endpoint (updates room occupancy)
app.post('/api/hostel/allocate', async (req, res) => {
  try {
    const { userId, room, block } = req.body;
    
    // Check if room exists and has capacity
    const hostelRoom = await prisma.hostelRoom.findFirst({
      where: { block, roomNo: room }
    });

    if (!hostelRoom) {
      return res.status(404).json({ error: 'Hostel room not found.' });
    }

    if (hostelRoom.occupancy >= hostelRoom.capacity) {
      return res.status(400).json({ error: 'Hostel room is already at full capacity.' });
    }

    // Allocate student
    const allocation = await prisma.hostelAllocation.create({
      data: { userId, room, block }
    });

    // Update room occupancy
    const newOccupancy = hostelRoom.occupancy + 1;
    await prisma.hostelRoom.update({
      where: { id: hostelRoom.id },
      data: { 
        occupancy: newOccupancy,
        status: newOccupancy >= hostelRoom.capacity ? 'Full' : 'Available'
      }
    });

    res.json({ success: true, allocation });
  } catch (error) {
    console.error("Allocation Error:", error);
    res.status(400).json({ error: 'Failed to allocate room.' });
  }
});

// New Endpoint to vacate a specific user from their room
app.post('/api/hostel/vacate', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the allocation
    const allocation = await prisma.hostelAllocation.findUnique({
      where: { userId }
    });

    if (!allocation) {
      return res.status(404).json({ error: 'No room allocation found for this user.' });
    }

    // Delete the allocation
    await prisma.hostelAllocation.delete({
      where: { userId }
    });

    // Find and update the room occupancy
    const hostelRoom = await prisma.hostelRoom.findFirst({
      where: { block: allocation.block, roomNo: allocation.room }
    });

    if (hostelRoom && hostelRoom.occupancy > 0) {
      await prisma.hostelRoom.update({
        where: { id: hostelRoom.id },
        data: {
          occupancy: hostelRoom.occupancy - 1,
          status: 'Available' // Ensure it's marked available when someone leaves
        }
      });
    }

    res.json({ success: true, message: `Room ${allocation.room} in ${allocation.block} vacated for user ${userId}.` });
  } catch (error) {
    console.error("Vacate Error:", error);
    res.status(500).json({ error: 'Internal server error while vacating room.' });
  }
});

app.put('/api/hostel/reallocate', async (req, res) => {
  try {
    const { studentId, newRoomBlock, newRoomNo } = req.body;
    
    // Find existing allocation for student
    const allocation = await prisma.hostelAllocation.findUnique({
      where: { userId: studentId }
    });

    if (!allocation) {
      return res.status(404).json({ error: 'Student has no active allocation to move.' });
    }

    // Step 1: Update the Hostel Allocation record
    const updatedAllocation = await prisma.hostelAllocation.update({
      where: { id: allocation.id },
      data: {
        block: newRoomBlock,
        room: newRoomNo
      }
    });

    // Step 2: Handle Room Occupancy Counts (Decrement old, Increment new)
    // Find the old room using block/roomNo logic
    const oldRoom = await prisma.hostelRoom.findFirst({
      where: { block: allocation.block, roomNo: allocation.room }
    });

    const newRoom = await prisma.hostelRoom.findFirst({
      where: { block: newRoomBlock, roomNo: newRoomNo }
    });

    if (oldRoom && oldRoom.occupancy > 0) {
      await prisma.hostelRoom.update({
        where: { id: oldRoom.id },
        data: { occupancy: oldRoom.occupancy - 1 }
      });
    }

    if (newRoom) {
      await prisma.hostelRoom.update({
        where: { id: newRoom.id },
        data: { occupancy: newRoom.occupancy + 1 }
      });
    }

    res.json(updatedAllocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reallocate student.' });
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
