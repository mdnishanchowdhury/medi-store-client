import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mediService } from "@/services/medi.server";
import { Button } from "@/components/ui/button";
import { Edit, Package } from "lucide-react";
import Link from "next/link";
import { addMedicine } from "@/types/medi.service";
import { categoryService } from "@/services/category.server";
import DeleteMedicineButton from "../DeleteMedicineButton";

export default async function SellerMedicineList() {

    let medicines: addMedicine[] = [];
    try {
        const { data } = await mediService.getMedicines({}, { cache: "no-store" });

        medicines = data?.data || data || [];
    } catch (error) {
        medicines = [];
    }

    let categories: any = [];
    try {
        const response = await categoryService.getCategories({ cache: "no-store" });

        categories = response?.data || response || [];

    } catch (error) {
        console.error("Error fetching categories:", error);
        categories = [];
    }

    const getCategoryName = (id: string) => {
        const category = categories.find((cat: any) => (cat.id || cat._id) === id);
        return category ? category.categoryName : "Unknown Category";
    };




    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold">All Medicines</h2>
                </div>
                <Link href="/seller-dashboard/allMedicine/addMedicine">
                    <Button className="bg-blue-600 hover:bg-blue-700">Add New Medicine</Button>
                </Link>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Medicine Name</TableHead>
                            <TableHead>description</TableHead>
                            <TableHead>Manufacturer</TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicines.length > 0 ? (
                            medicines.map((medi: any) => {
                                const id = medi._id || medi.id;
                                return (
                                    <TableRow key={id} className="hover:bg-slate-50/50">
                                        <TableCell>
                                            <div className="relative h-10 w-10 rounded-md overflow-hidden border">
                                                <img src={medi.image} alt="medicine" className="object-cover" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-slate-900">
                                            {medi.name}
                                        </TableCell>
                                        <TableCell className="max-w-[150px] line-clamp-3 text-sm" >
                                            {medi.description}
                                        </TableCell>
                                        <TableCell>{medi.manufacturer}</TableCell>
                                        <TableCell>{getCategoryName(medi.categoryId)}</TableCell>
                                        <TableCell className="font-medium text-green-600">
                                            ${medi.price}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${medi.stock > 10 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {medi.stock} in stock
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Link href={`/seller-dashboard/allMedicine/edit/${id}`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <DeleteMedicineButton id={id} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    No medicines found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}