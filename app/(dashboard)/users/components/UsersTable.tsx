"use client"

import { MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { EditUserFormValues, editUserSchema } from "@/app/schemas/auth.schema"
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
import { updateUserAction } from "@/lib/actions"
import type { UserResponse } from "@/types/app.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export function UsersTable({ users }: { users: UserResponse[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<boolean>(false);

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: "",
      role: "SME_STAFF"
    },
  })

  const openEditMode = (user: UserResponse) => {
    form.reset({
      id: user.id,
      username: user.username,
      role: user.role
    });
    setEditing(true);
  }

  async function onSubmit(values: EditUserFormValues) {
    const result = await updateUserAction(values);
    if (result.ok) {
      toast.success("User edited.");
      setEditing(false);
      router.refresh();
    } else {
      toast.error("User editing failed", { description: result.message })
    }
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
                    <DropdownMenuItem onSelect={() => openEditMode(user)}>
                      Edit user
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet open={ editing } onOpenChange={ (open) => setEditing(open) }>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit user</SheetTitle>
            <SheetDescription>
              Update username and role.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-4 px-4">
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="edit-username">Username</FieldLabel>
              <Input
                id="edit-username"
                {...form.register("username")}
                autoComplete="off"
                minLength={3}
                maxLength={80}
              />

              {form.formState.errors.username && (
                <FieldError>
                  {form.formState.errors.username.message}
                </FieldError>
              )}
            </Field>

            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="edit-role">Role</FieldLabel>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="edit-role" className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectItem value="SME_OWNER">SME_OWNER</SelectItem>
                      <SelectItem value="SME_STAFF">SME_STAFF</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {form.formState.errors.role && (
                <FieldError>
                  {form.formState.errors.role.message}
                </FieldError>
              )}
            </Field>
            <SheetFooter className="px-0 mt-auto flex-row justify-end gap-2 sm:justify-end w-full">
              <Button
                type="button"
                variant="outline"
                disabled={ form.formState.isSubmitting }
                onClick={ () => setEditing(false) }
              >
                Cancel
              </Button>
              <Button type="submit" disabled={ form.formState.isSubmitting }>
                {form.formState.isSubmitting ? "Saving…" : "Save"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
