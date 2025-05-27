import { auth } from "@/auth";
import ValidasiLaporan from "@/components/ValidasiLaporan";

const page = async() => {
  const session = await auth();
  return (
    <ValidasiLaporan auth={session}/>
  );
};

export default page;
