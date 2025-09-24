// import Property from '@/app/models/properties';
// import connectToDatabase from '@/lib/mongodb';
// import { NextRequest, NextResponse } from 'next/server';
// export async function GET(req: NextRequest) {
//     await connectToDatabase();
//     try {
//         const cityName = req.nextUrl.searchParams.get("city");
//         let query = {};
//         if (cityName) {
//             query = { geoCountryLocation: { $regex: new RegExp(`^${cityName}$`, 'i') } };
//         }
//         const properties = await Property.find(query);
//         return NextResponse.json(properties, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Failed to fetch properties" }, { status: 500 });
//     }

// } //