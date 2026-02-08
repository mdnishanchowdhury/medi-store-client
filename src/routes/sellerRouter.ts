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

export const sellerRoutes: Route[] = [
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
                url: "/seller-dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Account Management",
        items: [
            {
                title: "Add Category",
                url: "/seller-dashboard/addCategory",
                icon: LayoutGrid
            },
            {
                title: "Add Medicine",
                url: "/seller-dashboard/addMedicine",
                icon: Pill
            },
            {
                title: "All Users",
                url: "/admin-dashboard/allUsers",
                icon: Users
            },
            {
                title: "Customer Orders",
                url: "/seller-dashboard/customerOrders",
                icon: Truck
            },
            {
                title: "My Profile",
                url: "/seller-dashboard/profile",
                icon: UserCircle
            }
        ],
    },
    {
        title: "Preferences",
        items: [
            {
                title: "Settings",
                url: "/seller-dashboard/settings",
                icon: Settings,
            },
        ],
    },
];