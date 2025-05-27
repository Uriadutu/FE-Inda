import { auth } from "@/auth";
import TanggalValid from "@/components/TanggalValid/TanggalValid";

const page = async () => {
  const session = await auth();
  return (
    <TanggalValid auth={session}/>
  )
}

export default page
