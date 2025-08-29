import Property from "@/app/models/properties"
import connectToDatabase from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    await connectToDatabase()

    try {
        const data = await req.json()
        console.log("Received data:", data)


        if (!Array.isArray(data.images)) data.images = []

        const newProperty = await Property.create(data)
        return NextResponse.json({ success: true, property: newProperty }, { status: 201 })
    } catch (error) {
        console.error("Error adding property:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
