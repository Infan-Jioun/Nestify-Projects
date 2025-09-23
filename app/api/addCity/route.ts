import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AddCity from "@/app/models/addCity";

export async function GET() {
   await connectToDatabase();
   try{
      const fetchedCities = await AddCity.find({});
     return NextResponse.json(fetchedCities, { status: 200 });   
   } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch cities" }, { status: 500 });
   }
}
export async function POST(req: NextRequest) {
   await connectToDatabase();
   try {
      const data = await req.json(); 
      const newCity = await AddCity.create(data);
      return NextResponse.json(newCity, { status: 201 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to create city" }, { status: 500 });
   }
}
