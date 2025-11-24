import { useEffect, useState } from "react";
import axios from "axios";

export default function JadwalApelPage({ user }) {
  const [jadwal, setJadwal] = useState([]);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const API = "https://bayudian.pplgsmkn4.my.id/lomba_api/src/api/";

  const loadJadwal = () => {
    axios
      .get(API + "get_jadwal.php")
      .then((res) => setJadwal(res.data))
      .catch((err) => console.error("Gagal memuat jadwal:", err));
  };

  useEffect(() => {
    loadJadwal();
  }, []);

  const openModal = (item, e) => {
    // Ambil posisi klik relatif terhadap viewport
    const x = e.clientX;
    const y = e.clientY;
    setClickPosition({ x, y });
    setSelectedJadwal(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJadwal(null);
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-200 min-h-screen bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6">📅 Jadwal Apel</h2>

      {/* Daftar Jadwal sebagai Card */}
      <div className="space-y-4">
        {jadwal.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Tidak ada jadwal tersedia.</p>
        ) : (
          jadwal.map((row) => (
            <div
              key={row.id_jadwal}
              onClick={(e) => openModal(row, e)}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition border border-gray-200 dark:border-gray-700"
            >
              <div className="font-semibold">{row.Hari}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {row.Tanggal} • {row.Kelas}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal dengan Background Radial Gradient Dinamis */}
      {isModalOpen && selectedJadwal && (
        <div
          style={{
            background: `radial-gradient(600px circle at ${clickPosition.x}px ${clickPosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-gray-800 dark:text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">Detail Jadwal</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div><span className="font-medium">Hari:</span> {selectedJadwal.Hari}</div>
                <div><span className="font-medium">Tanggal:</span> {selectedJadwal.Tanggal}</div>
                <div><span className="font-medium">Kelas:</span> {selectedJadwal.Kelas}</div>
              </div>

              {user && (
                <div className="mt-6 flex justify-end space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}