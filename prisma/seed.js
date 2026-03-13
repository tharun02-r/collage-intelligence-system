const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with initial users...');

  // 1. Seed Students
  await prisma.user.upsert({
    where: { id: 'S-19042' },
    update: {},
    create: {
      id: 'S-19042',
      name: 'Alex Mercer',
      role: 'student',
      password: 'password123',
      status: 'Active',
      allocation: {
        create: {
          room: '302',
          block: 'Block B'
        }
      }
    },
  });

  await prisma.user.upsert({
    where: { id: 'S-8821' },
    update: {},
    create: {
      id: 'S-8821',
      name: 'Marcus Cole',
      role: 'student',
      password: 'password123',
      status: 'Flagged',
      allocation: {
        create: {
          room: '114',
          block: 'Block C'
        }
      }
    },
  });

  // Unallocated student for Warden testing
  await prisma.user.upsert({
    where: { id: 'S-20199' },
    update: {},
    create: {
      id: 'S-20199',
      name: 'Ravi Shankar',
      role: 'student',
      password: 'password123',
      status: 'Active',
    },
  });

  // 2. Seed Faculty
  await prisma.user.upsert({
    where: { id: 'F-8810' },
    update: {},
    create: {
      id: 'F-8810',
      name: 'Dr. Sarah Chen',
      role: 'faculty',
      password: 'password123',
    },
  });

  // 3. Seed Counselor
  await prisma.user.upsert({
    where: { id: 'C-992' },
    update: {},
    create: {
      id: 'C-992',
      name: 'Priya Sharma',
      role: 'counselor',
      password: 'password123',
    },
  });

  // 4. Seed Warden
  await prisma.user.upsert({
    where: { id: 'W-401' },
    update: {},
    create: {
      id: 'W-401',
      name: 'James Smith',
      role: 'warden',
      password: 'password123',
    },
  });

  // 5. Seed Admin
  await prisma.user.upsert({
    where: { id: 'A-001' },
    update: {},
    create: {
      id: 'A-001',
      name: 'Director Operations',
      role: 'admin',
      password: 'password123',
    },
  });

  console.log('Database seeded successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
