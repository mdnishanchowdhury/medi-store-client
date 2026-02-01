
import MediCards from "@/components/modules/HomePage/MediCards";
import CategorySection from "@/components/modules/HomePage/CategorySection";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import { Category, categoryService } from "@/services/category.server";



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

  let categories: Category[] = [];

  try {
    const { data, error } = await categoryService.getCategories({
      cache: "no-store"
    });
    categories = data ?? [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories = [];
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="mb-4 text-xl font-semibold">
        Total: {medi.length}
      </h1>

      <CategorySection categories={categories}></CategorySection>

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
