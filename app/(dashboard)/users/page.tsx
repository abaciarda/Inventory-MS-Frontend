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

export const metadata: Metadata = {
    title: "Users",
    description:
      "View and manage registered users, roles, and account permissions in the inventory management system.",
};

const users = [
    {
        id: 1,
        username: "Arda Abacı",
        role: "SME Owner",
        status: "Active",
        createdAt: "27.04.2026",
    },
    {
        id: 2,
        username: "Bora Çatalbaş",
        role: "SME Staff",
        status: "Active",
        createdAt: "27.04.2026",
    },
    {
        id: 3,
        username: "Bilal Ay",
        role: "SME Staff",
        status: "Active",
        createdAt: "27.04.2026",
    },
    {
        id: 4,
        username: "Şevval Esma Çoban",
        role: "SME Staff",
        status: "Active",
        createdAt: "27.04.2026",
    },
    {
        id: 5,
        username: "Tuba Süeda Aytan",
        role: "SME Staff",
        status: "Inactive",
        createdAt: "27.04.2026",
    },
];

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    View registered users and their roles in the system.
                </p>
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
                            {users.filter((user) => user.role === "SME Owner").length}
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
                            {users.filter((user) => user.role === "SME Staff").length}
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Member Since</TableHead>
                                        <TableHead className="w-[60px]" />
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium text-muted-foreground">
                                                {user.id}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium">{user.username}</p>
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.role === "SME Owner" ? "default" : "secondary"
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-muted-foreground">
                                                {user.createdAt}
                                            </TableCell>

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontalIcon className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Operations</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}