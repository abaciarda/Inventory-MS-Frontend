'use client'
import { CreateUserFormValues, createUserSchema } from "@/app/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createUserAction } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateUserView() {
    const router = useRouter();
    const [editing, setEditing] = useState<boolean>(false);

    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            username: "",
            password: "",
            role: "SME_STAFF"
        },
    });

    async function onSubmit(values: CreateUserFormValues) {
        const result = await createUserAction(values)
        if(result.ok) {
            toast.success("User created.");
            setEditing(false);
            router.refresh();
        } else {
            toast.error("User creation failed", { description: result.message })
        }
    }

    return (
        <>
            <Button onClick={() => setEditing(true) } data-testid="create-user-button">
                Add User
            </Button>

            <Sheet open={editing} onOpenChange={(open) => setEditing(open)}>
                <SheetContent side="right" className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>
                            Create User
                        </SheetTitle>
                        <SheetDescription>
                            Create a User with username, password and role.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-3 px-4">
                        <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-5">
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username..."
                                    autoComplete="username"
                                    className="h-11 bg-muted/40"
                                    data-testid="create-username-input"
                                    {...form.register("username")}
                                />
                                { form.formState.errors.username && (
                                    <FieldError>
                                        { form.formState.errors.username.message }
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password..."
                                    autoComplete="password"
                                    className="h-11 bg-muted/40"
                                    data-testid="create-password-input"
                                    {...form.register("password")}
                                />

                                {form.formState.errors.password && (
                                    <FieldError>
                                        {form.formState.errors.password.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="role">Role</FieldLabel>
                                <Controller
                                    name="role"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="role" className="w-full" data-testid="create-role-select">
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
                                                    
                        <SheetFooter className="flex-row justify-end gap-2 sm:justify-end w-full px-0">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={form.formState.isSubmitting}
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.formState.isSubmitting} data-testid="create-submit-button">
                                {form.formState.isSubmitting ? "Creating..." : "Create"}
                            </Button>
                        </SheetFooter>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}