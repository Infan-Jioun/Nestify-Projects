import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest } from "next/server";
type Params = { params: { name: string } };
export async function GET(req: NextRequest, { params }: Params) {
    try {
        await connectToDatabase();
        const properties = await Property.find({ category: params.name });
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Failed to fetch properties" }), { status: 500 });
    }

}