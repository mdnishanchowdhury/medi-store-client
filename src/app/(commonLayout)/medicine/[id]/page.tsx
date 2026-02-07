import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import {
    MessageSquare,
    Building2,
    Pill,
    Send,
    Star,
    CheckCircle2,
    ShieldCheck,
    Truck
} from "lucide-react";
import OrderButtons from "../OrderButtons";
import { userService } from "@/services/user.service";

export default async function MedicinePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data: medicine } = await mediService.getMedicinesById(id);
    const medi: Medicine = medicine.data;
    const { data: session } = await userService.getSession();
    const sellerId = session.user.id;

    return (
        <div className="w-full max-w-7xl mx-auto mb-10 pt-15">
            {/* Main Card Container */}
            <div className="bg-white dark:bg-black rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100">
                <div className="flex flex-col lg:flex-row">

                    {/* Left Side: Product Image Section */}
                    <div className="lg:w-1/2 bg-[#f8fafc] dark:bg-black p-6 md:p-12 flex items-center justify-center relative">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl -ml-20 -mb-20"></div>

                        <div className="w-full h-full max-w-md max-h-md relative group">
                            <img
                                src={medi.image}
                                alt={medi.name}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="lg:w-1/2 p-8 md:p-14 flex flex-col gap-8 ">

                        {/* Header & Badges */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-600 text-white hover:bg-blue-700 border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ">
                                    {medi.category.categoryName}
                                </Badge>
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50/50 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    In Stock
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {medi.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-slate-500 pt-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Building2 size={18} /></div>
                                    <span className="text-sm font-semibold text-slate-700">{medi.manufacturer}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck size={18} /></div>
                                    <span className="text-sm font-semibold text-slate-700">Certified Authentic</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-3">
                            <h3 className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">Product Overview</h3>
                            <p className="text-slate-600 leading-relaxed text-base font-medium">
                                {medi.description || "Premium pharmaceutical grade product. Rigorously tested for safety and compliance with international healthcare standards."}
                            </p>
                        </div>

                        {/* Price & Stock Card */}
                        <div className="bg-slate-900 rounded-[1.5rem] p-8 flex items-center justify-between text-white shadow-xl shadow-slate-200">
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Price</p>
                                <h2 className="text-4xl font-bold">৳{medi.price}</h2>
                            </div>
                            <div className="h-12 w-[1px] bg-slate-700 hidden sm:block"></div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{medi.stock}</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Units Left</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <div className="flex-1">
                                <OrderButtons
                                    medicineId={medi.id}
                                    name={medi.name}
                                    price={medi.price}
                                    image={medi.image}
                                    sellerId={sellerId}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Reviews & Feedback */}
                <div className="border-t border-slate-50 bg-slate-50/30 p-8 md:p-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Review Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-900">User Experience</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} className="fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <span className="text-lg font-bold text-slate-900 ml-2">4.9 / 5.0</span>
                                </div>
                                <p className="text-slate-500 text-sm">Based on 124 verified purchases.</p>
                            </div>

                            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                    <Truck size={18} className="text-blue-500" /> Fast Delivery (24-48 hrs)
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                    <CheckCircle2 size={18} className="text-blue-500" /> Quality Guaranteed
                                </div>
                            </div>
                        </div>

                        {/* Review List & Input */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                {[1, 2].map((i) => (
                                    <div key={i} className="p-6 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-blue-200">JD</div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-bold text-slate-800">John Doe</span>
                                                        <CheckCircle2 size={14} className="text-blue-500" />
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Buyer</span>
                                                </div>
                                            </div>
                                            <span className="text-[11px] text-slate-400 font-medium">2 days ago</span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">"Excellent packaging and the medicine was within the expiry date. The delivery person was professional."</p>
                                    </div>
                                ))}
                            </div>

                            {/* Review Input */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Share your thoughts..."
                                    className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm shadow-sm"
                                />
                                <Button className="h-auto px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                                    <Send size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}