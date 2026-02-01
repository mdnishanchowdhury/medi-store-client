import MediCards from "@/components/modules/HomePage/MediCards";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";

export async function generateStaticParams() {
    const { data } = await mediService.getMedicines();
    return data?.data?.map((medi: Medicine) => ({ id: medi.id })).splice(0, 3);
}

export default async function StorePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const { data: medicine } = await mediService.getCategoryById(id);
    const medi: Medicine[] = medicine.data;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 container mx-auto px-4">
            {
                medi.map((medicine) => (
                    <MediCards key={medicine.id} medicine={medicine}></MediCards>
                ))
            }

        </div>
    );
}