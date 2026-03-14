"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import * as z from "zod"
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  role: z.string().min(1, "You must select a role to continue."),
  name: z.string().min(1, "Please enter your name"),
  email: z.email(),
  password: z.string().min(6, "Minimum length is 6"),
});

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      role: "",
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({value}) => {
      const toastId = toast.loading("Creating user")
      try {
        const result = await registerUser(value);
        if(result.success){
          toast.success("Registration success. Please login", {id: toastId})
          router.push("/login")
        } else if(result.success === false && result.error.code === "P2002") {
          toast.error("User already exist or " + result.message, { id: toastId });
        }
      } catch (error: any) {
        toast.error(error.message, { id: toastId })
      }
    }
  });
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Registration Card */}
        <Card className="p-8 shadow-lg bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <span>🍽️</span>
              <span>FoodHub</span>
            </h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Role Selection */}
            <FieldGroup>
              <form.Field
                name="role"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldSet>
                      <FieldLegend>Who are you?</FieldLegend>
                      <FieldDescription>Select a role</FieldDescription>
                      <RadioGroup
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <FieldLabel htmlFor="customer">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>Customer</FieldTitle>
                              <FieldDescription>
                                For personal. Order meals
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value="CUSTOMER"
                              id="customer"
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="provider">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>Seller</FieldTitle>
                              <FieldDescription>
                                For business. Sell meals
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value="PROVIDER"
                              id="provider"
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                      </RadioGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  );
                }}
              />
            </FieldGroup>

            {/* Name Field */}
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            {/* Email Field */}
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            {/* password Field */}
            <FieldGroup>
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 h-11 text-base font-semibold text-white mt-2"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-red-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm hover:underline underline-offset-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
