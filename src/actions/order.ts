"use server";

import { orderService } from "@/services/order.server";
import { revalidateTag } from "next/cache";

export async function handleOrderAction(
    medicineId: string,
    price: number,
    sellerId: string,
    quantity: number,
    shippingAddress: string
) {
    const orderData = {
        shippingAddress: shippingAddress,
        items: [
            {
                medicineId: medicineId,
                quantity: quantity,
                price: Number(price),
                sellerId: sellerId,
            },
        ],
    };

    const res = await orderService.createOrder(orderData);

    if (res.data) {
        revalidateTag('orders', '');
    }

    return res;
}