// import { NextResponse } from "next/server";
// import connectToDatabase from "@/app/lib/mongoose";
// import Attendance from "@/app/Models/Attendance";

// export async function POST(req) {
//     try {
//         await connectToDatabase();
//         const { date, students } = await req.json();

//         if (!date || !students) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const result = await Attendance.findOneAndUpdate(
//             { date },
//             { $set: { students } },
//             { new: true, upsert: true }
//         );

//         return NextResponse.json({ message: "Attendance saved successfully", result }, { status: 200 });
//     } catch (error) {
//         console.error("Error saving attendance:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

// export async function GET(req) {
//     try {
//         await connectToDatabase();

//         const url = new URL(req.url);
//         const date = url.searchParams.get("date") || new Date().toISOString().split('T')[0];

//         const attendance = await Attendance.findOne({ date });

//         if (!attendance) {
//             return NextResponse.json({ message: "No records found for this date" }, { status: 404 });
//         }

//         return NextResponse.json({ attendance }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching attendance:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
