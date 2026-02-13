"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, CircleDollarSign, X, Check } from 'lucide-react';

const CategorySection = ({ categories }) => {
    const searchParams = useSearchParams();
    const [activeDrawer, setActiveDrawer] = useState(null);

    const activeCategory = searchParams.get('category');
    const closeDrawer = () => setActiveDrawer(null);

    return (
        <div className="w-full">
            <div className="lg:hidden flex gap-2 p-4 bg-white border-b sticky top-0 z-20">
                <button
                    onClick={() => setActiveDrawer('category')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 active:bg-slate-100"
                >
                    <LayoutGrid size={18} className="text-blue-600" />
                    Categories
                </button>
                <button
                    onClick={() => setActiveDrawer('price')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 active:bg-slate-100"
                >
                    <CircleDollarSign size={18} className="text-emerald-600" />
                    Price Filter
                </button>
            </div>

            {activeDrawer && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeDrawer} />
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-black text-slate-900">
                                {activeDrawer === 'category' ? 'Select Category' : 'Set Price Range'}
                            </h2>
                            <button onClick={closeDrawer} className="p-2 bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
                        </div>

                        {activeDrawer === 'category' ? (
                            <div className="grid grid-cols-1 gap-3">
                                <Link
                                    href="/"
                                    scroll={false}
                                    onClick={closeDrawer}
                                    className={`flex items-center justify-between p-4 rounded-2xl border ${!activeCategory ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-100'}`}
                                >
                                    <span className="font-bold">All Medicines</span>
                                    {!activeCategory && <Check size={18} />}
                                </Link>
                                {categories.map((cat) => {
                                    const catId = cat._id || cat.id;
                                    const isActive = activeCategory === catId;
                                    return (
                                        <Link
                                            key={catId}
                                            href={`/?category=${catId}`}
                                            scroll={false}
                                            onClick={closeDrawer}
                                            className={`flex items-center justify-between p-4 rounded-2xl border ${isActive ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-100'}`}
                                        >
                                            <span className="font-bold">{cat.categoryName}</span>
                                            {isActive && <Check size={18} />}
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="space-y-6 pb-4">
                                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                    <input type="range" min="0" max="5000" className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600" />
                                    <div className="flex justify-between mt-4 text-lg font-black text-slate-900">
                                        <span>Tk 0</span> <span className="text-blue-600">Tk 1000</span>
                                    </div>
                                </div>
                                <button onClick={closeDrawer} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Apply Filter</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="hidden lg:block w-full max-w-[280px] space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-[16px] font-black text-slate-800 mb-4 border-b pb-2">Product Categories</h2>
                    <div className="space-y-3">
                        <Link href="/" scroll={false} className="flex items-center gap-3 group">
                            <input type="checkbox" checked={!activeCategory} readOnly className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
                            <span className={`text-sm font-bold ${!activeCategory ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>All Medicines</span>
                        </Link>
                        {categories.map((cat) => {
                            const catId = cat._id || cat.id;
                            const isActive = activeCategory === catId;
                            return (
                                <Link key={catId} href={`/?category=${catId}`} scroll={false} className="flex items-center gap-3 group">
                                    <input type="checkbox" checked={isActive} readOnly className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
                                    <span className={`text-sm font-bold ${isActive ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>{cat.categoryName}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Price Filter */}
                {/* <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-[16px] font-black text-slate-800 mb-4 border-b pb-2">Price Filter</h2>
                    <div className="space-y-4">
                        <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600" />
                        <div className="text-sm font-bold text-slate-700">Tk 0 — 1000</div>
                    </div>
                </div> */}
                
            </div>
        </div>
    );
};

export default CategorySection;