

import { auth } from "@/auth";
import Sumary from "@/components/shift/tgl/Sumary";

const Page = async () => {
  const session = await auth();
  return (
   <Sumary session={session}/>
  );
};

export default Page;
