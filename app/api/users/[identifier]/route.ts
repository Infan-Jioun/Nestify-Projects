import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectToDatabase();

    const { identifier } = await context.params;

    if (!identifier) {
      return NextResponse.json({ error: "Identifier required" }, { status: 400 });
    }

    let user = null;

    if (Types.ObjectId.isValid(identifier)) {
      user = await User.findById(identifier).select(
        "-password -resetTokenHash -resetTokenExpiry"
      );
    }

    if (!user) {
      user = await User.findOne({
        $or: [
          { slug: identifier },
          { email: identifier },
          { providerId: identifier },
        ],
      }).select("-password -resetTokenHash -resetTokenExpiry");
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectToDatabase();


    const { identifier } = await context.params;

    if (!identifier) {
      return NextResponse.json({ message: "User identifier required" }, { status: 400 });
    }

    let deletedUser = null;

    if (Types.ObjectId.isValid(identifier)) {
      deletedUser = await User.findByIdAndDelete(identifier);
    }
    if (!deletedUser) {
      deletedUser = await User.findOneAndDelete({
        $or: [
          { slug: identifier },
          { email: identifier },
          { providerId: identifier },
        ],
      });
    }

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User successfully deleted",
      deletedUserId: deletedUser._id.toString()
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json(
      { message: "Deletion failed" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const { identifier } = params;

    const updateData = await req.json();
    console.log("Received update data:", updateData);
    const user = Types.ObjectId.isValid(identifier)
      ? await User.findById(identifier)
      : await User.findOne({
        $or: [
          { slug: identifier },
          { email: identifier },
          { providerId: identifier }
        ]
      });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(" User before update:", {
      name: user.name,
      role: user.role,
      mobile: user.mobile,
      website: user.website,
      location: user.location,
      bio: user.bio

    });

    const allowedFields = ['name', "role", 'bio', 'location', 'website', 'mobile', 'image'];

    let hasChanges = false;
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        const newValue = updateData[field] === '' ? null : updateData[field];
        const currentValue = user[field];


        if (newValue !== currentValue) {
          user[field] = newValue;
          hasChanges = true;
          console.log(`Updated ${field}: from '${currentValue}' to '${newValue}'`);
        }
      }
    });

    if (!hasChanges) {
      console.log("ℹ️ No changes detected");
      const currentUserResponse = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || null,
        bio: user.bio || null,
        location: user.location || null,
        website: user.website,
        mobile: user.mobile,
        slug: user.slug || null,
        provider: user.provider || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      return NextResponse.json(currentUserResponse, { status: 200 });
    }

    await user.save();
    console.log("User saved successfully");
    const updatedUser = await User.findById(user._id).select("-password -resetTokenHash -resetTokenExpiry");
    if (!updatedUser) {
      return NextResponse.json({ error: "Error retrieving updated user" }, { status: 500 });
    }
    const userResponse = {
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image || null,
      bio: updatedUser.bio || null,
      location: updatedUser.location || null,
      website: updatedUser.website || null,
      mobile: updatedUser.mobile || null,
      slug: updatedUser.slug || null,
      provider: updatedUser.provider || null,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    console.log("Sending response:", userResponse);

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}