/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

// Form Validation Schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginUser(values);
      if (res.success) {
        toast.success("Login successful! Redirecting...");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Demo Accounts Section (Static) */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Demo Accounts</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>Admin:</strong> admin@foodhub.test / admin123
            </p>
            <p>
              <strong>Provider:</strong> chef@pizzeria.com / provider123
            </p>
            <p>
              <strong>Customer:</strong> john@example.com / password123
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-lg bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <span>🍽️</span>
              <span>FoodHub</span>
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 h-11 text-base font-semibold text-white"
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-red-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm underline-offset-4 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}