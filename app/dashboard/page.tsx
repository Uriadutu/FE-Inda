import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="flex mx-10">
          <h1 className="text-2xl">
            Welcome Back{" "}
            <span className="font-bold">{session?.user?.name}</span>{" "}
          </h1>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
