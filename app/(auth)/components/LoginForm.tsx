"use client"

import { LoginFormValues, loginSchema } from "@/app/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";
import { env } from "@/lib/env";

export function LoginForm() {

    const router = useRouter();
    const { checkAuth } = useAuth();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormValues) {

        try {
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })

            const data = await res.json();

            if(!res.ok) {
                toast.error("Login failed", { description: data.message })
                return;
            }

            toast.success("Login successfull");
            await checkAuth();
            router.push('/dashboard');

        } catch {
            toast.error("Failed to connect to the API.")
        }
    }

    return (
        <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-5">
            <FieldGroup>
                { form.formState.errors.root && (
                    <p className="text-sm text-destructive">
                        { form.formState.errors.root.message }
                    </p>
                )}
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Username..."
                        autoComplete="username"
                        className="h-11 bg-muted/40"
                        {...form.register("username")}
                    />

                    { form.formState.errors.username && (
                        <p className="text-sm text-destructive">
                            { form.formState.errors.username.message }
                        </p>
                    )}
                </Field>

                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>

                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="h-11 bg-muted/40"
                        { ...form.register("password") }
                    />

                    { form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            { form.formState.errors.password.message }
                        </p>
                    )}
                </Field>
            </FieldGroup>

            <Button disabled={ form.formState.isSubmitting } type="submit" className="h-11 w-full hover:brightness-125">
                { form.formState.isSubmitting ? 'Signing in...' : 'Login' }
            </Button>
        </form>
    )
}