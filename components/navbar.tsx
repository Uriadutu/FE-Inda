import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-[#978058] border-gray-200 border-b fixed w-full z-50 drop-shadow-xl py-5">
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center gap-10">
          <Link href="/dashboard">
            <div className="flex justify-between items-center">
              <Image
                src="/MSM-Logo.png"
                alt="logo"
                width={180}
                height={100}
                priority
                className="w-28 h-auto"
              />
            </div>
          </Link>
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
            {session && (
              <>
                <ul className="flex gap-4 text-white">
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:text-gray-600 duration-300"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shift"
                      className="hover:text-gray-600 duration-300"
                    >
                      Laporan
                    </Link>
                  </li>
                  
                    <li>
                      <Link
                        href="/arsip-laporan"
                        className="hover:text-gray-600 duration-300"
                      >
                        Arsip Laporan
                      </Link>
                    </li>
                  {session.user.role === "geologi senior" ? (
                    <li>
                      <Link
                        href="/validasi-laporan"
                        className="hover:text-gray-600 duration-300"
                      >
                        Validasi Laporan
                      </Link>
                    </li>
                  ) : null}
                  {session.user.role === "geologi senior" ? (
                    <li>
                      <Link
                        href="/validasi-arsip-laporan"
                        className="hover:text-gray-600 duration-300"
                      >
                        Validasi Arsip Laporan
                      </Link>
                    </li>
                  ) : null}
                  {session.user.role === "admin" ? (
                    <li>
                      <Link
                        href="/data-pengguna"
                        className="hover:text-gray-600 duration-300"
                      >
                        Data Pengguna
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-gray-200 text-right capitalize">
                  {session.user.name}
                </span>
                <span className="font-xs text-gray-200 text-right capitalize">
                  {session.user.role}
                </span>
              </div>
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  src={session.user.image || "/avatar.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          )}
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Sign Out
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
