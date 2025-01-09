import { auth } from "@/auth";
import ValidasiLaporan from "@/components/ValidasiLaporan";

const page = async() => {
  const session = await auth();
  console.log(session, "data");
  return (
    <ValidasiLaporan auth={session}/>
  );
};

export default page;
