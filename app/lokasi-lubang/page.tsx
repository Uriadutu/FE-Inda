import { auth } from "@/auth";
import LokasiPengeboran from "@/components/LokasiPengeboran/LokasiPengeboran";


const page = async() => {
  const session = await auth();
  return (
    <LokasiPengeboran session={session} />
  )
}

export default page
