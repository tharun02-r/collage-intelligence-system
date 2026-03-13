const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.resourceUsage.deleteMany();
  await prisma.riskScore.deleteMany();
  await prisma.academicPerformance.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.hostelRoom.deleteMany();

  console.log('Creating Hostel Rooms...');
  const blocks = ['Block A', 'Block B', 'Block C'];
  for (const block of blocks) {
    for (let i = 1; i <= 5; i++) {
       await prisma.hostelRoom.create({
         data: { block, roomNo: `${100 + i}`, capacity: 2, occupancy: Math.floor(Math.random() * 3) }
       });
    }
  }

  console.log('Creating Resource Usage data...');
  for(let i=0; i<7; i++) {
     const date = new Date();
     date.setDate(date.getDate() - i);
     await prisma.resourceUsage.createMany({
        data: [
           { building: 'Academic Block', type: 'Electricity', value: 450 + (Math.random()*100), unit: 'kWh', timestamp: date },
           { building: 'Hostel Block B', type: 'Electricity', value: 200 + (Math.random()*50), unit: 'kWh', timestamp: date },
           { building: 'Hostel Block B', type: 'Water', value: 1500 + (Math.random()*200), unit: 'Liters', timestamp: date },
        ]
     });
  }

  console.log('Fetching existing students...');
  const students = await prisma.user.findMany({ where: { role: 'Student' } });

  console.log('Generating AI Analytics profiles...');
  for (const student of students) {
     // Create Profile
     const profile = await prisma.studentProfile.create({
        data: {
           userId: student.id,
           course: 'B.Tech Computer Science',
           batch: '2024'
        }
     });

     // Create Attendance
     await prisma.attendance.createMany({
        data: Array.from({ length: 14 }).map((_, i) => ({
           profileId: profile.id,
           status: Math.random() > 0.15 ? 'Present' : 'Absent',
           courseRef: 'CS-101'
        }))
     });

     // Create Academics
     const gpa = 60 + (Math.random() * 35);
     const assignmentRate = Math.floor(60 + (Math.random() * 40));
     await prisma.academicPerformance.create({
        data: {
           profileId: profile.id,
           term: 'Fall 2026',
           subject: 'Core Aggregated',
           grade: gpa,
           assignments: assignmentRate
        }
     });

     // AI Risk Engine Simulation Logic
     let score = 100 - gpa; // Base risk
     score += (100 - assignmentRate) * 0.5;
     
     if(student.status === 'Flagged') score += 30;
     
     // Normalize
     score = Math.min(Math.max(score, 0), 100);
     let level = 'Low';
     let intervention = 'None needed';

     if (score > 75) {
        level = 'High';
        intervention = 'Immediate Counselor Meeting';
     } else if (score > 45) {
        level = 'Medium';
        intervention = 'Academic Peer Tutoring';
     }

     await prisma.riskScore.create({
        data: {
           profileId: profile.id,
           score,
           level,
           intervention
        }
     });
  }

  console.log('Seeding Complete for Predictive Analytics Modules.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
