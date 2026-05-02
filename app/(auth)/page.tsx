import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleAlertIcon, HandCoinsIcon, RadioIcon, ShieldUserIcon, StoreIcon } from "lucide-react";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in securely with your username and password to access the IMS panel.",
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 min-h-svh">
      <div className="col-span-12 lg:col-span-7 main-background hidden lg:flex flex-col justify-center items-start p-8">
        <div className="max-w-5xl w-full mx-auto p-3 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-fit rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-md">
              <StoreIcon className="size-4" />
              Stock Tracking System for SMEs
            </div>

            <p className="text-4xl font-bold text-white">
              Inventory Management System
            </p>

            <p className="text-gray-300 text-lg font-light max-w-[70%]">
              Manage your products, stock levels and inventory movements in one panel.
              Improve your decision-making process with low stock alerts and profitability analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[78%]">
            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <RadioIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Real-Time Tracking</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Track stock in and out in real-time.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <CircleAlertIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Low Stock Alerts</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Quickly identify products that are running low on stock.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <HandCoinsIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Profitability Analysis</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                View product performance based on cost and sales price.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/25 bg-primary/10 p-4 backdrop-blur-md shadow-sm shadow-black/10 transition hover:bg-primary/15 hover:border-primary/40">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                <ShieldUserIcon className="size-5 text-primary-foreground" />
              </div>

              <p className="text-white font-semibold">Secure Access</p>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                Use the system with controlled access based on roles.
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <ShieldUserIcon className="size-7 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Welcome
            </h1>

            <p className="mt-2 text-muted-foreground">
              Enter your login information to access the inventory panel.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}