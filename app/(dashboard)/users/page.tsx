import {
    MoreHorizontalIcon,
    ShieldCheckIcon,
    UserIcon,
    UsersIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { UsersTable } from "./components/UsersTable";
import { CreateUserView } from "./components/CreateUserView";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Users",
    description:
      "View and manage registered users, roles, and account permissions in the inventory management system.",
};


export default async function UsersPage() {
    const [users, user] = await Promise.all([
        api.getAllUsers(),
        getServerSession()
    ])
    
    if(user?.role !== "SME_OWNER") {
        redirect("/dashboard")
    }
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        View registered users and their roles in the system.
                    </p>
                </div>

                <CreateUserView />
            </div>
            

            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-12 md:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className="text-base">Total Users</CardTitle>
                            <CardDescription>Registered accounts in the system.</CardDescription>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                            <UsersIcon className="size-5" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">{users.length}</p>
                    </CardContent>
                </Card>

                <Card className="col-span-12 md:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className="text-base">SME Owner</CardTitle>
                            <CardDescription>Users with administrator privileges</CardDescription>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                            <ShieldCheckIcon className="size-5" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {users.filter((user) => user.role === "SME_OWNER").length}
                        </p>
                    </CardContent>
                </Card>

                <Card className="col-span-12 md:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className="text-base">SME Staff</CardTitle>
                            <CardDescription>Operational users</CardDescription>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                            <UserIcon className="size-5" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {users.filter((user) => user.role === "SME_STAFF").length}
                        </p>
                    </CardContent>
                </Card>

                <Card className="col-span-12">
                    <CardHeader>
                        <CardTitle>Users List</CardTitle>
                        <CardDescription>
                            Usernames, roles, and account statuses.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-hidden rounded-md border">
                           <UsersTable users={users} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}