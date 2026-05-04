"use client"

import { MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { UserResponse } from "@/types/app.types"
import { updateUserAction } from "../../../../lib/actions"

export function UsersTable({ users }: { users: UserResponse[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<UserResponse | null>(null)
  const [username, setUsername] = useState("")
  const [role, setRole] = useState<UserResponse["role"]>("SME_STAFF")

  function openEdit(user: UserResponse) {
    setEditing(user)
    setUsername(user.username)
    setRole(user.role)
  }

  function handleSave() {
    if (!editing) return
    const trimmed = username.trim()
    if (trimmed.length < 3) {
      toast.error("Username must be at least 3 characters.")
      return
    }

    startTransition(async () => {
      const result = await updateUserAction(editing.id, trimmed, role)
      if (result.ok) {
        toast.success("User updated.")
        setEditing(null)
        router.refresh()
      } else {
        toast.error("Update failed", { description: result.message })
      }
    })
  }

  return (
    <>
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
                <p className="font-medium capitalize">{user.username}</p>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    user.role === "SME_OWNER" ? "default" : "secondary"
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
                    <DropdownMenuItem onSelect={() => openEdit(user)}>
                      Edit user
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null)
        }}
      >
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit user</SheetTitle>
            <SheetDescription>
              Update username and role.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                minLength={3}
                maxLength={80}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) =>
                  setRole(value as UserResponse["role"])
                }
              >
                <SelectTrigger id="edit-role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SME_OWNER">SME_OWNER</SelectItem>
                  <SelectItem value="SME_STAFF">SME_STAFF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="flex-row justify-end gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
