import MediCards from "@/components/modules/HomePage/MediCards";
import CategorySection from "@/components/modules/HomePage/CategorySection";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import { Category, categoryService } from "@/services/category.server";
import HeroMedicine from "@/components/layout/banner";
import SearchBar from "@/components/modules/Store/SearchBar";
import { Help1 } from "@/components/layout/help1";
import { Logos8 } from "@/components/layout/logos8";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;

  let medi: Medicine[] = [];
  try {
    const res = await mediService.getMedicines(
      {
        isFeatured: false,
        search: search || "",
        ...(category && { categoryId: category })
      },
      { cache: "no-store" }
    );
    medi = res?.data?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
    medi = [];
  }

  let categories: Category[] = [];
  try {
    const { data } = await categoryService.getCategories({ cache: "no-store" });
    categories = data ?? [];
  } catch (error) { categories = []; }

  return (
    <main className="bg-[#f8fafc] dark:bg-black min-h-screen">
      <div className="pt-24 flex sm:hidden w-full justify-center items-center px-4">
        <div className="w-full max-w-[90%] mx-auto rounded-lg p-2 bg-white border">
          <SearchBar />
        </div>
      </div>

      <HeroMedicine />

      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          <aside className="w-full lg:w-1/6 shrink-0">
            <CategorySection categories={categories} />
          </aside>

          <section className="w-full lg:w-3/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                {search ? `Results for "${search}"` : category ? "Filtered Medicines" : "All Medicines"}
              </h2>
              <span className="text-sm text-slate-500">{medi.length} products found</span>
            </div>

            {medi.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {medi.map((medicine) => (
                  <MediCards key={medicine.id} medicine={medicine} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-muted-foreground italic">
                  No medicines found {search ? `matching "${search}"` : "in this category"}
                </p>
              </div>
            )}
          </section>

        </div>
      </div>
      <div className="container mx-auto px-4 pb-10">
        <Logos8></Logos8>
        <Help1></Help1>
      </div>

    </main>
  );
}