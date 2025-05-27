import { auth } from "@/auth";
import NamaLubang from "@/components/NamaLubangLaporanValid/NamaLubang";

const page = async () => {
  const session = await auth();
  return (
    <NamaLubang session={session}/>
  )
}

export default page
