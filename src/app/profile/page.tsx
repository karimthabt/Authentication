import Profile from "../../client/Profile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await getServerSession();
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!session && !token) {
    redirect("/login");
  }

  return <Profile />;
}
