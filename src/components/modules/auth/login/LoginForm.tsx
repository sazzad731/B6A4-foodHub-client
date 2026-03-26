"use client";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import * as z from "zod"
import { loginUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, "Minimum length is 6"),
  })

export default function RegisterForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        setLoading(true)
        const result = await loginUser(value);
        if (result.success) {
          toast.success("Login success. redirecting!", { id: toastId });
          setLoading(false)
          router.push("/dashboard");
        } else if (!result.success) {
          setLoading(false)
          toast.error(result.message, {id: toastId})
        }
      } catch (error: any) {
        setLoading(false)
        toast.error(error.message, { id: toastId });
      }
    },
  });
  return (
    <Card className="bg-transparent shadow-none border-0 py-0 gap-0">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Email Field */}
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-fh-green-deep font-medium"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your email address"
                    className="h-11"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* password Field */}
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="relative">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-fh-green-deep font-medium"
                  >
                    password
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={show ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11"
                  />
                  <button
                    type="button"
                    className="absolute right-8 top-11 text-fh-green-muted"
                    onClick={() => setShow(!show)}
                    style={{ width: "0px" }}
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-fh-coral hover:bg-fh-coral-hover text-white font-semibold mt-2 cursor-pointer"
        >
          Log in
        </Button>
      </form>
    </Card>
  );
}
