import { cookies } from "next/headers";
import Login from "../../client/Login";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (token) {
    redirect("/profile");
  }

  return <Login />;
}
