import MediCards from "@/components/modules/HomePage/MediCards";
import CategorySection from "@/components/modules/HomePage/CategorySection";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import { Category, categoryService } from "@/services/category.server";
import HeroMedicine from "@/components/layout/banner";
import { Help1 } from "@/components/layout/help1";
import { Logos8 } from "@/components/layout/logos8";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export const dynamic = "force-dynamic";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: number;
  }>;
}) {
  const params = await searchParams;
  const { search, category, minPrice, maxPrice, page = "1" } = params;

  const currentPage = Number(page) || 1;
  const limit = 9;

  let medi: Medicine[] = [];
  let meta = { total: 0, totalPages: 0 };

  try {
    const res = await mediService.getMedicines(
      {
        search: search || "",
        categoryId: category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page: currentPage,
        limit,
      },
      { cache: "no-store" }
    );

    if (res?.data) {
      medi = res.data.data || [];
      meta = res.data.meta || { total: 0, totalPages: 0 };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }

  let categories: Category[] = [];
  try {
    const { data } = await categoryService.getCategories({ cache: "no-store" });
    categories = data ?? [];
  } catch (error) {
    categories = [];
  }

  const createPageURL = (p: number) => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    if (category) newParams.set("category", category);
    if (minPrice) newParams.set("minPrice", minPrice);
    if (maxPrice) newParams.set("maxPrice", maxPrice);
    newParams.set("page", p.toString());
    return `/?${newParams.toString()}`;
  };

  return (
    <main className="bg-[#f8fafc] dark:bg-black min-h-screen">
      <HeroMedicine />

      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          <aside className="w-full lg:w-1/4 shrink-0 space-y-4">
            <CategorySection categories={categories} />

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Price Filter</h3>
              <form method="GET" className="space-y-3">
                {search && <input type="hidden" name="search" value={search} />}
                {category && <input type="hidden" name="category" value={category} />}
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" name="minPrice" placeholder="Min" defaultValue={minPrice} className="border p-2 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  <input type="number" name="maxPrice" placeholder="Max" defaultValue={maxPrice} className="border p-2 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98]">
                  Apply Filter
                </button>
              </form>
            </div>
          </aside>

          <section className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {search ? `Results for "${search}"` : "All Medicines"}
              </h2>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
                {meta.total} items found
              </span>
            </div>

            {medi.length > 0 ? (
              <>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {medi.map((medicine) => (
                    <MediCards key={medicine.id} medicine={medicine} />
                  ))}
                </div>

                {meta.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {(() => {
                          const pages = [];
                          const total = meta.totalPages;
                          if (total <= 5) {
                            for (let i = 1; i <= total; i++) pages.push(i);
                          } else {
                            pages.push(1);
                            if (currentPage > 3) pages.push("ellipsis-1");
                            const start = Math.max(2, currentPage - 1);
                            const end = Math.min(total - 1, currentPage + 1);
                            for (let i = start; i <= end; i++) { if (!pages.includes(i)) pages.push(i); }
                            if (currentPage < total - 2) pages.push("ellipsis-2");
                            if (!pages.includes(total)) pages.push(total);
                          }

                          return pages.map((p, idx) => (
                            <PaginationItem key={idx}>
                              {typeof p === "string" ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  href={createPageURL(p)}
                                  isActive={p === currentPage}
                                  className={p === currentPage ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-xl shadow-md border-none" : "rounded-xl"}
                                >
                                  {p}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ));
                        })()}

                        <PaginationItem>
                          <PaginationNext
                            href={currentPage < meta.totalPages ? createPageURL(currentPage + 1) : "#"}
                            className={currentPage >= meta.totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="text-slate-400 italic mb-4 text-lg">No medicines found matching your filters.</div>
                <Link href="/" className="text-blue-600 font-bold hover:underline">
                  Clear all filters
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
      <Logos8 />
      <Help1 />
    </main>
  );
}