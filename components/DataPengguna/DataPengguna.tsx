"use client";

import React, { useState, useTransition } from "react";
import { FaTrash } from "react-icons/fa";
import AddUserModal from "../modals/AddUserModal";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image: string | null;
  emailVerified: Date | null;
  password: string | null;
}

const DataPengguna = ({
  users,
  addUser,
  deleteUser,
}: {
  users: User[];
  addUser: (user: any) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}) => {
  const [userList, setUserList] = useState(users);
  const [isPending, startTransition] = useTransition();
  const [openModalAdd, setIsOpenModalAdd] = useState(false);

  // Tambah pengguna
  const handleAddUser = async (userData: any) => {
    startTransition(async () => {
      try {
        const newUser = await addUser(userData);
        setUserList([...userList, newUser]);
      } catch (error) {
        console.error("Gagal menambah pengguna:", error);
      }
    });
  };

  // Hapus pengguna
  const handleDeleteUser = async (userId: string) => {
    startTransition(async () => {
      try {
        await deleteUser(userId);
        setUserList(userList.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Gagal menghapus pengguna:", error);
      }
    });
  };

  return (
    <div className="page">
      {openModalAdd && (
        <AddUserModal
          setIsOpenModalAdd={setIsOpenModalAdd}
          onAddUser={handleAddUser}
        />
      )}{" "}
      <h1 className="text-2xl mb-4">Data Pengguna</h1>
      <button
        className="btn-add"
        onClick={() => setIsOpenModalAdd(true)}
        disabled={isPending}
      >
        Tambah Pengguna
      </button>
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex justify-center gap-3">
                
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPengguna;
