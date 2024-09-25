import { NEXT_AUTH_OPTIONS } from "@documenso/lib/next-auth/auth-options";
import { getRequiredServerComponentSession } from "@documenso/lib/next-auth/get-server-component-session";
import { getTeams } from "@documenso/lib/server-only/team/get-teams";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import React from "react";
import { Header } from "~/components/(dashboard)/layout/header";

const DesignPage: React.FC = async () => {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);
  if (!session) {
    // Handle the case where session is null
    throw new Error("Session is null");
  }

  const [{ user }, teams] = await Promise.all([
    getRequiredServerComponentSession(),
    getTeams({ userId: session.user.id }),
  ]);

  return (
    <>
      {" "}
      <Header user={user} teams={teams} />
      <div>
        <h1>Hello, World!</h1>
      </div>
    </>
  );
};

export default DesignPage;
