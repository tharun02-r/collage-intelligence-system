import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { attendanceRecords, courseRef } = await request.json();

    if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
      return NextResponse.json({ error: 'Invalid attendance data provided' }, { status: 400 });
    }

    // Bulk create attendance records
    const createdRecords = await Promise.all(
      attendanceRecords.map(async (record: any) => {
        return prisma.attendance.create({
          data: {
            profileId: record.profileId,
            status: record.status,
            courseRef: courseRef || record.courseRef || 'Unknown Course',
            notes: record.notes || null,
          }
        });
      })
    );

    return NextResponse.json({ success: true, count: createdRecords.length, records: createdRecords });
  } catch (error: any) {
    console.error('Error saving attendance:', error);
    return NextResponse.json({ error: error.message || 'Failed to save attendance' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseRef = searchParams.get('courseRef');
  const dateStr = searchParams.get('date');

  try {
    let whereClause: any = {};
    if (courseRef) whereClause.courseRef = courseRef;
    
    if (dateStr) {
      const date = new Date(dateStr);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      whereClause.date = {
        gte: date,
        lt: nextDay,
      };
    }

    const records = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        profile: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(records);
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 });
  }
}
