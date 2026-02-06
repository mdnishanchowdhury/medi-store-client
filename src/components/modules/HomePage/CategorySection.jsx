"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from "lucide-react";

const CategorySection = ({ categories }) => {
    const searchParams = useSearchParams();
    

    const activeCategory = searchParams.get('category'); 

    return (
        <div className="w-full max-w-[280px] space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h2 className="text-[16px] font-bold text-slate-800 mb-4 border-b pb-2">
                    Product Categories
                </h2>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            checked={!activeCategory}
                            readOnly
                        />
                        <span className={`text-sm transition-colors font-medium ${!activeCategory ? 'text-blue-600' : 'text-slate-600'}`}>
                            All Medicines
                        </span>
                    </Link>

                    {categories.map((cat) => {
                        const catId = cat._id || cat.id; 
                        
                        return (
                            <Link
                                href={`/?category=${catId}`} 
                                scroll={false}
                                key={catId}
                                className="flex items-center gap-3 group cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    checked={activeCategory === catId}
                                    readOnly
                                />
                                <span className={`text-sm transition-colors font-medium ${activeCategory === catId ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600`}>
                                    {cat.categoryName}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h2 className="text-[16px] font-bold text-slate-800 mb-4 border-b pb-2">
                    Filter by Price
                </h2>
                <div className="space-y-4">
                    <input
                        type="range"
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="text-sm font-semibold text-slate-700">
                        Tk 0 —1000
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySection;