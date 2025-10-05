
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("Test endpoint called");

        const body = await request.json();
        console.log("Request body:", body);

        return NextResponse.json(
            {
                message: "Test successful!",
                receivedData: body,
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Test error:", error);
        return NextResponse.json(
            { error: "Test failed", details: String(error) },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Test GET works!" },
        { status: 200 }
    );
}