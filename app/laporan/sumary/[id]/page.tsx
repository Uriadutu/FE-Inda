import { auth } from "@/auth";
import Samples from "@/components/Samples"

const page = async () => {
  const session = await auth();
  return (
    <Samples auth={session}/>
  )
}

export default page
