import { auth } from "@/auth";
import LaporanValid from "@/components/LaporanValid/LaporanValid";

const page = async () => {
  const session = await auth();
  return (
    <LaporanValid session={session}/>
  )
}

export default page
