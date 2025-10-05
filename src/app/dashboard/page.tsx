import React from "react";
import UserTable from "@/Components/Dash_Board/UserTable";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession();
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!session && !token) {
    redirect("/login");
  }

  return <UserTable />;
}

export default page;
