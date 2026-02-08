"use server"; 

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function updateUserAction(id: string, payload: { name: string; phone: string }) {
    const result = await userService.updateUser(id, payload);
    
    if (!result.error) {
        revalidatePath("/profile"); 
    }
    
    return result;
}