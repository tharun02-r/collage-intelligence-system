"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, CheckCircle, XCircle, Clock, Loader2, Save } from "lucide-react";

// Mock student roster for the demo since full DB relation pulling is complex without actual data
const MOCK_STUDENTS = [
  { id: '1', profileId: 'prof-19042', name: 'Alex Mercer', rollNo: 'S-19042', status: 'Present', notes: '' },
  { id: '2', profileId: 'prof-18331', name: 'Priya Patel', rollNo: 'S-18331', status: 'Present', notes: '' },
  { id: '3', profileId: 'prof-8821', name: 'Marcus Cole', rollNo: 'S-8821', status: 'Absent', notes: 'Absent 3x this week' },
  { id: '4', profileId: 'prof-19222', name: 'Sarah Jenkins', rollNo: 'S-19222', status: 'Late', notes: '' },
  { id: '5', profileId: 'prof-17540', name: 'David Chen', rollNo: 'S-17540', status: 'Present', notes: '' },
];

export default function FacultyAttendance() {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [course, setCourse] = useState('MATH-301');

  const handleStatusChange = (index: number, status: string) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
  };

  const handleNotesChange = (index: number, notes: string) => {
    const updated = [...students];
    updated[index].notes = notes;
    setStudents(updated);
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    setSuccessMsg('');
    
    try {
      // Map frontend state to API payload
      const attendanceRecords = students.map(s => ({
        profileId: s.profileId,
        status: s.status,
        notes: s.notes
      }));

      const res = await fetch('/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseRef: course,
          attendanceRecords
        })
      });

      if (res.ok) {
        setSuccessMsg('Attendance recorded securely on-chain & in DB.');
      } else {
        alert('Failed to record attendance');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout role="faculty">
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            Digital Roll Call <Badge variant="info">Faculty Form</Badge>
          </h1>
          <p className="text-slate-400 mt-1">Mark attendance for your classes. Data connects to the MSRS Behavioral Engine.</p>
        </div>

        <Card>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <CardHeader title="Today's Register" subtitle="Select a course to view roster" />
            <select 
              value={course} 
              onChange={e => setCourse(e.target.value)}
              className="bg-surface-darker border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:ring-accent-teal focus:border-accent-teal"
            >
              <option value="MATH-301">MATH-301: Advanced Calculus</option>
              <option value="PHY-201">PHY-201: Quantum Mechanics</option>
            </select>
          </div>

          {successMsg && (
            <div className="mb-4 bg-accent-teal/10 border border-accent-teal/40 text-accent-teal px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-white/5 bg-surface-darker/50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-medium">Student Info</th>
                  <th className="px-4 py-3 font-medium">Status (P/A/L)</th>
                  <th className="px-4 py-3 font-medium">Observation Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {students.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-white">{student.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{student.rollNo}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(idx, 'Present')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${student.status === 'Present' ? 'bg-accent-teal text-white border-accent-teal' : 'bg-surface-darker border border-white/10 text-slate-400 hover:text-white'}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, 'Absent')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${student.status === 'Absent' ? 'bg-alert-critical text-white border-alert-critical' : 'bg-surface-darker border border-white/10 text-slate-400 hover:text-white'}`}
                        >
                          <XCircle className="w-3.5 h-3.5" /> Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, 'Late')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${student.status === 'Late' ? 'bg-alert-warning text-white border-alert-warning' : 'bg-surface-darker border border-white/10 text-slate-400 hover:text-white'}`}
                        >
                          <Clock className="w-3.5 h-3.5" /> Late
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px]">
                      <input 
                        type="text" 
                        placeholder="Add note..."
                        value={student.notes}
                        onChange={(e) => handleNotesChange(idx, e.target.value)}
                        className="w-full bg-surface-darker/50 border border-white/5 focus:border-accent-teal/50 focus:outline-none rounded-lg px-3 py-1.5 text-sm text-white" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={submitAttendance}
              disabled={isSubmitting}
              className="bg-accent-teal hover:bg-teal-400 text-slate-900 font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-accent-teal/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? 'Recording...' : 'Submit Attendance Register'}
            </button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
