"use client";
import React, { useState } from "react";

const AddUserModal = ({
  setIsOpenModalAdd,
  onAddUser,
}: {
  setIsOpenModalAdd: (state: boolean) => void;
  onAddUser: (user: any) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("geologi junior");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddUser({ name, email, password, role });
      setIsOpenModalAdd(false);
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold">Tambah Pengguna</h3>
          <button
            type="button"
            onClick={() => setIsOpenModalAdd(false)}
            className="w-8 h-8 text-gray-400 hover:bg-gray-200 rounded-lg"
          >
            ✖
          </button>
        </div>

        {/* FORM */}
        <div className="p-4 space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <label className="block">
            Nama:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2"
              required
              autoComplete="off"
            />
          </label>

          <label className="block">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              required
               autoComplete="off"
              
            />
          </label>

          <label className="block">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
               autoComplete="new-password"
            />
          </label>

          <label className="block">
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="geologi junior">geologi junior</option>
              <option value="geologi senior">geologi senior</option>
              <option value="data entri">data entri</option>
            </select>
          </label>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end p-4 border-t">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpenModalAdd(false)}
            className="ml-2 px-4 py-2 bg-gray-300 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
