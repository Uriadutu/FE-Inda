import { auth } from "@/auth";
import Tanggal from "@/components/shift/Tanggal";


const Page = async() => {
  const session = await auth();
    console.log(session, "data");

  return (
   <Tanggal auth={session}/>
  );
};

export default Page;
