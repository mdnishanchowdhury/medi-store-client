"use client";

import { authClient } from "@/lib/auth-client";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Camera, 
  Loader2, 
  Save 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="md:col-span-1 shadow-sm border-slate-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-all">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{session?.user?.name}</h2>
              <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider mt-1">
                {(session?.user as any)?.role || "USER"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Update your name and email address here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="name" defaultValue={session?.user?.name} className="pl-10 focus-visible:ring-blue-600" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="email" defaultValue={session?.user?.email} disabled className="pl-10 bg-slate-50 text-slate-500 cursor-not-allowed" />
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck size={12} /> Email cannot be changed for security reasons.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6">
                <Save size={18} /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}