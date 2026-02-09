import { Route } from "@/types/menuBar";
import {
    UserCircle,
    LayoutDashboard,
    Settings,
    Home,
    Truck,
    Users,
    Pill,
    LayoutGrid
} from "lucide-react";

export const adminRoutes: Route[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Home",
                url: "/",
                icon: Home,
            },
            {
                title: "Dashboard",
                url: "/admin-dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Account Management",
        items: [
            {
                title: "All Category",
                url: "/admin-dashboard/allCategory",
                icon: LayoutGrid
            },
            {
                title: "All Medicine",
                url: "/admin-dashboard/allMedicine",
                icon: Pill
            },
            {
                title: "Customer Orders",
                url: "/admin-dashboard/customerOrders",
                icon: Truck
            },
            {
                title: "Order History",
                url: "/admin-dashboard/orderHistory",
                icon: Truck
            },
            {
                title: "All Users",
                url: "/admin-dashboard/allUsers",
                icon: Users
            },
            {
                title: "My Profile",
                url: "/admin-dashboard/profile",
                icon: UserCircle
            }
        ],
    },
    {
        title: "Preferences",
        items: [
            {
                title: "Settings",
                url: "/admin-dashboard/settings",
                icon: Settings,
            },
        ],
    },
];