import MediCards from "@/components/modules/HomePage/MediCards";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";



export const dynamic = "force-dynamic";

export default async function Home() {
  let medi: Medicine[] = [];

  try {
    const res = await mediService.getMedicines(
      { isFeatured: false },
      { cache: "no-store" }
    );

    medi = res?.data?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
    medi = [];
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="mb-4 text-xl font-semibold">
        Total: {medi.length}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {
          medi.map((medicine) => (
            <MediCards key={medicine.id} medicine={medicine}></MediCards>
          ))
        }
      </div>

    </main>
  );
}
