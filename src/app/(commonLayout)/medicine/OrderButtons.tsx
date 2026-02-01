"use client"; 

import { handleOrderAction } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function OrderButtons({ medicineId, price, sellerId, quantity,shippingAddress }: { medicineId: string, price: number, sellerId: string, quantity: number, shippingAddress: string }) {
    const [isPending, setIsPending] = useState(false);

    const handleOrder = async () => {
        setIsPending(true);
        const res = await handleOrderAction(medicineId, price, sellerId, quantity,shippingAddress);
        setIsPending(false);

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Order Placed Successfully!");
        }
    };

    return (
        <Button 
            onClick={handleOrder}
            disabled={isPending}
            className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
            <ShoppingCart className="mr-2 h-5 w-5" /> 
            {isPending ? "Ordering..." : "Order Now"}
        </Button>
    );
}