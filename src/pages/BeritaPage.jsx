import BeritaCard from "../components/BeritaCard";
import axios from "axios";
import { useEffect, useState } from "react";


// Halaman Utama Daftar Berita
export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ganti dengan URL API berita-mu
  const API_BASE = "https://bayudian.pplgsmkn4.my.id/lomba_api/src/api";

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get(`${API_BASE}/get_berita.php`);
        setBeritaList(response.data);
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-300">
        <p>Memuat berita...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-gray-300 min-h-screen bg-[#0C112A]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">📰 Berita Terbaru</h1>

      {beritaList.length === 0 ? (
        <p className="text-gray-500">Tidak ada berita tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaList.map((item) => (
            <BeritaCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
