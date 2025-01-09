
export function tanggalFormat(dateString: string): string {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
  
    const parsedDate = new Date(dateString);
  
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date string provided");
    }
  
    const year = parsedDate.getFullYear();
    const month = months[parsedDate.getMonth()]; // Mengambil nama bulan berdasarkan indeks
    const day = parsedDate.getDate().toString().padStart(2, "0");
  
    return `${day} ${month} ${year}`;
  }