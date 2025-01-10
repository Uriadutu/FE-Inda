import { auth } from "@/auth";
import ValidasiArsip from "@/components/ValidasiArsip";
import React from "react";

const page = async () => {
  const session = await auth();
  return (

      <ValidasiArsip session={session} />
    )
};

export default page;
