import DataPengguna from "@/components/DataPengguna/DataPengguna";
import { getUsers, addUser, deleteUser } from "@/lib/data";

const Page = async () => {
  const users = (await getUsers()) ?? [];

  return <DataPengguna users={users} addUser={addUser} deleteUser={deleteUser} />;
};

export default Page;
