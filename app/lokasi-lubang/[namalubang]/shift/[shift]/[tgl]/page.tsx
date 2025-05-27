// "use client";

import { auth } from "@/auth";
import Sumary from "@/components/shift/tgl/Sumary";
import { useParams } from "react-router-dom";

const Page = async () => {
  const session = await auth();
  // const {tgl} = useParams();
  // console.log(tgl, "tgl");
  
  return (
   <Sumary session={session}/>
  );
};

export default Page;
