'use client';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { API_URLS } from '@/constants';

function ParentsDashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetchStudents(selectedDate);
    }, [selectedDate]);

const fetchStudents = async (date) => {
    try {
        setLoading(true);
        setError(null);  // Clear any previous errors
        const response = await fetch(`${API_URLS.GET}?date=${date}`);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        if (!Array.isArray(data.data) || data.data.some(student => typeof student !== 'object')) {
            throw new Error("Received invalid student data");
        }

        const formattedData = data.data.map(student => ({
            studentId: student.studentId || "N/A",
            studentName: student.name || "Unknown",
            parentName: student.parentsName || "N/A",
            parentContact: student.parentsContact || "N/A",
            isPresent: student.attendance?.toLowerCase() === "present",
            timestamp: student.attendance?.toLowerCase() === "present" ? new Date().toLocaleString() : null
        }));

        setStudents(formattedData);
    } catch (err) {
        setStudents([]);  // Clear stale data
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="flex flex-col min-h-screen items-center justify-start p-6 pt-20 bg-gray-100">
            <BackButton className="absolute top-6 left-6" />

            <div className="flex justify-between w-full max-w-4xl items-center mb-4">
                <h2 className="text-2xl font-bold">Parents Dashboard</h2>
                <div>
                    <label htmlFor="date-picker" className="mr-2 font-medium">Select Date:</label>
                    <input
                        id="date-picker"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded-lg px-3 py-1"
                    />
                </div>
            </div>

            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Attendance Records for {selectedDate}</h3>
                {loading && <p>Loading students...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3 w-1/5">ID</th>
                                <th className="p-3 w-1/5">Name</th>
                                <th className="p-3 w-1/5">Parent</th>
                                <th className="p-3 w-1/5">Contact</th>
                                <th className="p-3 w-1/5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index} className="border-t text-center">
                                        <td className="p-3">{student.studentId}</td>
                                        <td className="p-3">{student.studentName}</td>
                                        <td className="p-3">{student.parentName}</td>
                                        <td className="p-3">{student.parentContact}</td>
                                        <td className={`p-3 font-semibold ${student.isPresent ? "text-green-600" : "text-red-600"}`}>
                                            {student.isPresent ? `Present (${student.timestamp})` : "Absent"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">No attendance records for this date</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ParentsDashboard;
