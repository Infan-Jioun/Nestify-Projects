import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import ProfilePage from "../Components/ProfilePage";


export async function generateMetadata() {
  const session = await getServerSession(authOptions);

  const name = session?.user?.name || "User";

  return {
    title: `${name}'s Profile`,
    description: `View ${name}'s profile`,
  };
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Please login</div>;
  }

  return <ProfilePage />;
}