import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AddDistrict from "@/app/models/addDsitrict";


export async function GET() {
   await connectToDatabase();
   try{
      const fetchedDistricts = await AddDistrict.find({});
     return NextResponse.json(fetchedDistricts, { status: 200 });   
   } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch Districts" }, { status: 500 });
   }
}
export async function POST(req: NextRequest) {
   await connectToDatabase();
   try {
      const data = await req.json(); 
      const newDistrict = await AddDistrict.create(data);
      return NextResponse.json(newDistrict, { status: 201 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to create city" }, { status: 500 });
   }
}
