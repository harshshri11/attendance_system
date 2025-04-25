'use client';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { API_URLS } from '@/constants';

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        console.log("url", API_URLS.POST);
        fetchStudents(selectedDate);
    }, [selectedDate]);

    const fetchStudents = async (date) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URLS.GET}?date=${date}`);
    
            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }
    
            const data = await response.json();
    
            const formattedData = data.data.map(student => {
                const localKey = `attendance-${student.studentId}-${date}`;
                const savedTimestamp = localStorage.getItem(localKey);  // Get the saved timestamp
                const isPresent = !!savedTimestamp;
                const timestamp = savedTimestamp || null;
    
                return {
                    studentId: student.studentId || "N/A",
                    studentName: student.name || "Unknown",
                    parentName: student.parentsName || "N/A",
                    parentContact: student.parentsContact || "N/A",
                    isPresent,
                    timestamp
                };
            });
    
            setStudents(formattedData);
        } catch (err) {
            console.error("Error fetching students:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const markPresent = async (index) => {
        const updatedStudents = [...students];
        const timestamp = new Date().toLocaleString();  // Record the timestamp when the student is marked present
    
        updatedStudents[index].isPresent = true;
        updatedStudents[index].timestamp = timestamp;
    
        // Save the timestamp in localStorage to persist it across page refreshes
        const localKey = `attendance-${updatedStudents[index].studentId}-${selectedDate}`;
        localStorage.setItem(localKey, timestamp); // Only save when marking present
    
        setStudents(updatedStudents);
    
        try {
            const response = await fetch(API_URLS.POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "no-cors",
                body: JSON.stringify({
                    studentId: updatedStudents[index].studentId,
                    attendanceStatus: 'Present'
                })
            });
    
            console.log("Mark present response:", response);
        } catch (err) {
            console.log("Failed to mark on server:", err.message);
        }
    };
    
    const resetAttendance = async () => {
        try {
            // Mark all students as absent in the backend
            const response = await fetch("https://script.google.com/macros/s/AKfycbyejFHdZFbeNesOUiczYJG0ZRePjNy1FmKGTAxqknrihPptCNWY3EVCMYLpMK27SlHP/exec?markAllAbsent=true");
            if (!response.ok) {
                throw new Error("Failed to reset attendance");
            }
    
            // Clear the attendance state and localStorage
            const updatedStudents = students.map(student => {
                const localKey = `attendance-${student.studentId}-${selectedDate}`;
                localStorage.removeItem(localKey); // Remove the attendance entry from localStorage
    
                return {
                    ...student,
                    isPresent: false, // Set attendance to absent
                    timestamp: null,  // Remove the timestamp
                };
            });
    
            // Update the students state to reflect the changes
            setStudents(updatedStudents);
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div className="flex flex-col min-h-screen items-center justify-start p-6 pt-20 bg-gray-100">
            <BackButton className="absolute top-6 left-6" />

            <div className="flex justify-between w-full max-w-4xl items-center mb-4">
                <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
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

            <button 
                onClick={resetAttendance} 
                className="mb-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Reset Attendance
            </button>

            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Class Attendance for {selectedDate}</h3>
                {loading && <p>Loading students...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3 w-1/6">ID</th>
                                <th className="p-3 w-1/6">Name</th>
                                <th className="p-3 w-1/6">Parent</th>
                                <th className="p-3 w-1/6">Contact</th>
                                <th className="p-3 w-1/6">Status</th>
                                <th className="p-3 w-1/6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index} className="border-t text-center">
                                        <td className="p-3">{student.studentId}</td>
                                        <td className="p-3">{student.studentName}</td>
                                        <td className="p-3">{student.parentName}</td>
                                        <td className="p-3">
                                            {student.parentContact ? (
                                                <a 
                                                    href={`https://wa.me/${String(student.parentContact).replace(/\D/g, '')}?text=${encodeURIComponent(
                                                        `Dear ${student.parentName},\n\nYour child ${student.studentName} was marked *Absent* today (${selectedDate}).`
                                                    )}`}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline hover:text-blue-800"
                                                >
                                                    {String(student.parentContact)}
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className={`p-3 font-semibold ${student.isPresent ? "text-green-600" : "text-red-600"}`}>
                                            {student.isPresent ? `Present ${student.timestamp}` : "Absent"}
                                        </td>
                                        <td className="p-3">
                                            {!student.isPresent && (
                                                <button 
                                                    onClick={() => markPresent(index)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 transition">
                                                    Mark Present
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">No attendance records for this date</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default TeacherDashboard;
