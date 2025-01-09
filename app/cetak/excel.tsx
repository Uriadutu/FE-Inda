// Excel.tsx
import React from "react";

interface ExcelProps {
  onExport: (data: any[]) => void;
  dataGet: any[]; // dataGet yang diterima sebagai prop
}

const Excel = ({ onExport, dataGet }: ExcelProps) => {
  // Memetakan data yang ingin diekspor (mengambil hanya 'id' atau data lainnya)
  const data = dataGet.map((item) => ({
    id: item.id, // Misalnya hanya mengambil id, bisa ditambah kolom lainnya
    // Misalnya jika ingin menambahkan kolom nama, umur, dsb:
    // name: item.name,
    // age: item.age
  }));

  // Fungsi untuk mengekspor data
  const handleExport = () => {
    onExport(data); // Mengirimkan data yang sudah diproses ke komponen induk
  };

  return (
    <div>
      <button onClick={handleExport} className="btn-excel">
        Ekspor Excel
      </button>
    </div>
  );
};

export default Excel;
