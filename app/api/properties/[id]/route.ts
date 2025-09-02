import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    // Connect to the database
    await connectToDatabase();

    try {
        const id = params.id;

        // Validate the ID format (assuming MongoDB ObjectId)
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return new Response(JSON.stringify({ error: "Invalid property id" }), { status: 400 });
        }

        // Find and delete the property by ID
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return new Response(JSON.stringify({ error: "Property not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Property deleted successfully", id }), { status: 200 });
    } catch (error) {
        console.error("Error deleting property:", error);
        return new Response(JSON.stringify({ error: "Failed to delete property" }), { status: 500 });
    }
}