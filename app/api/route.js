import connectToDatabase from "@/app/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const isConnected = mongoose.connection.readyState === 1;

        return NextResponse.json(
            {
                message: isConnected ? "✅ Connected to MongoDB" : "❌ Failed to connect",
                status: isConnected ? "success" : "error",
            },
            { status: isConnected ? 200 : 500 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "❌ Error connecting to MongoDB",
                error: error.message,
                status: "error",
            },
            { status: 500 }
        );
    }
}
