import { LucideIcon } from "lucide-react";

export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;    // আইকন যোগ করা হয়েছে (অপশনাল)
  description?: string; // ডেসক্রিপশন যোগ করা হয়েছে (অপশনাল)
}

export interface Route {
  title: string;
  items: RouteItem[];
}