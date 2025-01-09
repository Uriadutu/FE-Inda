import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <div className=" border mx-0 sm:mx-[15%] md:mx-[25%] lg:mx-[35%] mt-24">
        {" "}
        <Login />
      </div>
    </div>
  );
}
