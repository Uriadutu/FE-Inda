import { auth } from "@/auth";
import Shift from "@/components/Shift";


const page = async() => {
  const session = await auth();
  return (
    <Shift session={session} />
  )
}

export default page
