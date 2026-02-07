"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Package, Calendar, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardProps {
  initialOrders: any[];
}

export default function DeliveryCard({ initialOrders = [] }: DashboardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deliveredOrders = useMemo(() => {
    if (!Array.isArray(initialOrders)) return [];
    return initialOrders.filter(
      (order: any) => order.status?.toString().trim().toUpperCase() === "DELIVERED"
    );
  }, [initialOrders]);

  if (!mounted) return null;

  return (
    <div className="p-4">
      {deliveredOrders.length > 0 ? (
        deliveredOrders.map((order: any) => (
          <Card key={order.id} className="border-none shadow-md bg-white overflow-hidden hover:ring-1 ring-emerald-500 transition-all">
            <CardContent className="p-0">
              <div className="bg-emerald-500 p-2 flex justify-between items-center text-white px-4">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Package size={14} />
                  <span>ORDER #{order.id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[10px]">
                  <CheckCircle2 size={12} />
                  <span>DELIVERED</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Shipping Address</p>
                    <p className="text-sm text-slate-700 font-medium leading-tight">{order.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Amount</p>
                    <p className="text-lg font-black text-emerald-600">{order.totalAmount}৳</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    <span className="text-[11px] font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Tag size={14} />
                    <span className="text-[11px] font-medium">{order.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-slate-400 border-2 border-dashed rounded-xl">
          No delivered products to show.
        </div>
      )}
    </div>
  );
}