const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLaporan() {
  try {
    const res = await fetch(`${API_URL}/laporan`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data laporan");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

export const tambahLaporan = async (data: any) => {
  const res = await fetch("/api/laporan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
};

export const editLaporan = async (id: number, data: any) => {
  const res = await fetch(`/api/laporan/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
};

export async function updateLaporan(id: number, data: any) {
  try {
    const res = await fetch(`${API_URL}/laporan/update?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal memperbarui laporan");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function hapusLaporan(id: number) {
  try {
    const res = await fetch(`${API_URL}/laporan/hapus`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // ini penting yaa biar backend ga error JSON
    });

    if (!res.ok) throw new Error("Gagal menghapus laporan");

    return true;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}
