import { beritaDummy } from "../data/beritaDummy";
import BeritaCard from "../components/BeritaCard";

export default function BeritaPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Berita Terbaru</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {beritaDummy.map((item) => (
          <BeritaCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
