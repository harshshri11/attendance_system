'use client'
import { useState } from "react";
import BackButton from "../components/BackButton";

function HeadmasterLogin() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ studentId: "", studentName: "", parentName: "", parentContact: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddStudent = () => {
        if (form.studentId && form.studentName && form.parentName && form.parentContact) {
            setStudents([...students, form]);
            setForm({ studentId: "", studentName: "", parentName: "", parentContact: "" });
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-start p-6 pt-20 bg-gray-100 relative">
            <BackButton className="absolute top-6 left-6" />
            <h2 className="text-2xl font-bold mb-4">Headmaster Dashboard</h2>
            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Enrolled Students</h3>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                        Add New Admission
                    </button>
                </div>
                <table className="bg-white rounded-xl shadow-lg w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Parent</th>
                            <th className="p-2">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{student.studentId}</td>
                                <td className="p-2">{student.studentName}</td>
                                <td className="p-2">{student.parentName}</td>
                                <td className="p-2">{student.parentContact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
                        <input className="w-full p-2 border rounded mb-2" name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
                        <input className="w-full p-2 border rounded mb-2" name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} />
                        <input className="w-full p-2 border rounded mb-2" name="parentName" placeholder="Parent Name" value={form.parentName} onChange={handleChange} />
                        <input className="w-full p-2 border rounded mb-2" name="parentContact" placeholder="Parent Contact" value={form.parentContact} onChange={handleChange} />
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2" onClick={handleAddStudent}>Add Student</button>
                        <button className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 mt-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeadmasterLogin;
