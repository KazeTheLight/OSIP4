import { Link } from "react-router-dom";

// Komponen Card (disederhanakan sesuai DB-mu)
export default function BeritaCard({ data }) {
  // Gunakan placeholder gambar
  const placeholderImage = "https://via.placeholder.com/400x200/1e3a8a/FFFFFF?text=Berita+SMK";

  // Ambil hanya tanggal (tanpa jam) — asumsi format: "2025-04-05 10:30:00"
  const tanggal = data.tanggal_post ? data.tanggal_post.split(" ")[0] : "—";

  return (
    <div className="bg-[#0A0F2D] rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition relative">
      {/* Tanggal */}
      <div className="absolute bg-blue-600 text-white px-4 py-1 rounded-full m-4 text-sm font-semibold z-10">
        {tanggal}
      </div>

      {/* Gambar */}
      <img 
        src={placeholderImage} 
        className="w-full h-48 object-cover"
        alt={data.judul}
      />

      {/* Isi Card */}
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
          {data.judul}
        </h2>

        <p className="text-gray-400 text-sm mb-3">
          Dibuat oleh: {data.id_guru}
        </p>

        <p className="text-gray-300 mb-6 line-clamp-3">
          {data.isi}
        </p>

        <Link 
          to={`/berita/${data.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block text-sm"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}

