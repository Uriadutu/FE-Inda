import { auth } from "@/auth";
import LokasiLubang from "@/components/LokasiLubang";

const page = async() => {
  const session = await auth();
  return (
    <LokasiLubang session={session}/>
  );
};

export default page;
