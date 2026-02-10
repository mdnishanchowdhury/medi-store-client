import { userService } from "@/services/user.service";
import {
    User, Mail, Phone, Calendar, Search, MoreHorizontal, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AllUsersPage() {
    const response = await userService.getUsers();
    const users = response?.data || [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen p-4 md:p-10 bg-slate-50/50">
            <div className="w-full mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                        <p className="text-slate-500 font-medium text-sm">Total {users.length} users registered in the system</p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">User Info</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Role & Status</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Joined</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative size-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                                                    <img
                                                        src={user.image || "https://ui-avatars.com/api/?name=" + user.name}
                                                        alt={user.name}
                                                        className="object-cover size-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 leading-none">{user.name}</span>
                                                    <span className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1">
                                                        <Mail size={10} /> {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <div className="p-1.5 bg-slate-100 rounded-lg">
                                                    <Phone size={12} className="text-slate-500" />
                                                </div>
                                                <span className="text-xs font-bold">{user.phone || "No Phone"}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={cn(
                                                    "w-fit px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                                    user.role === 'ADMIN' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                                )}>
                                                    {user.role}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                                    <CheckCircle2 size={10} />
                                                    {user.status}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Calendar size={12} />
                                                <span className="text-xs font-medium">{formatDate(user.createdAt)}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[24px] mt-6">
                        <User className="size-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">No Users Yet</h3>
                        <p className="text-slate-400 text-sm">New registered users will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}