"use client";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import * as z from "zod"
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChefHat, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { ROLES } from "@/constants/roles";

const formSchema = z
  .object({
    role: z.string().min(1, "Please select a role."),
    name: z.string().min(1, "Please enter your name"),
    email: z.email(),
    phone: z.string().min(11, "Please provide a valid number"),
    restaurantName: z.string(),
    address: z.string(),
    image: z.string(),
    password: z.string().min(6, "Minimum length is 6"),
  })
  .superRefine((data, ctx) => {
    if (data.role === ROLES.PROVIDER) {
      if (!data.restaurantName || data.restaurantName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Restaurant name is required",
          path: ["restaurantName"],
        });
      }
      if (!data.address || data.address.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Restaurant location is required",
          path: ["address"],
        });
      }
      if (!data.image || data.image.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Restaurant image URL is required",
          path: ["image"],
        });
      }
    }
  });

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState("CUSTOMER");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      role: "CUSTOMER",
      name: "",
      email: "",
      phone: "",
      restaurantName: "",
      address: "", 
      image: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        setLoading(true)
        const result = await registerUser(value);
        if (result.success) {
          toast.success("Registration success. Please login", { id: toastId });
          setLoading(false)
          router.push("/login");
        } else if (!result.success) {
          setLoading(false)
          toast.error(result.message, {id: toastId})
        } else if (!result.success && result.error.code === "P2002") {
          setLoading(false)
          toast.error("User already exist or " + result.message, {
            id: toastId,
          });
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
        {/* Role Selection */}
        <RadioGroup>
          <form.Field
            name="role"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FieldSet>
                  <RadioGroup
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => {
                      field.handleChange(val);
                      setRole(val);
                    }}
                    className="flex"
                  >
                    <FieldLabel htmlFor="customer" className="relative">
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <FieldContent>
                          <ShoppingCart className="mb-2 size-8" />
                          <FieldTitle className="text-sm font-semibold text-fh-green-deep">
                            Customer
                          </FieldTitle>
                          <FieldDescription className="text-xs text-fh-green-muted mt-0.5">
                            Order meals & track delivery
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="CUSTOMER"
                          id="customer"
                          aria-invalid={isInvalid}
                          className="absolute right-4"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="provider" className="relative">
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <FieldContent>
                          <ChefHat className="mb-2 size-8" />
                          <FieldTitle className="text-sm font-semibold text-fh-green-deep">
                            Provider
                          </FieldTitle>
                          <FieldDescription className="text-xs text-fh-green-muted mt-0.5">
                            List your restaurant & manage orders
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="PROVIDER"
                          id="provider"
                          aria-invalid={isInvalid}
                          className="absolute right-4"
                        />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldSet>
              );
            }}
          />
        </RadioGroup>

        <FieldGroup>
          {/* Name Field */}
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-fh-green-deep font-medium"
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Your full name"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

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

          {/* phone Field */}
          <form.Field
            name="phone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-fh-green-deep font-medium"
                  >
                    Phone Number
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your phone number"
                    className="h-11"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {role === ROLES.PROVIDER && (
            <>
              {/* restaurant name */}
              <form.Field
                name="restaurantName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-fh-green-deep font-medium"
                      >
                        Restaurant Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your restaurant name"
                        className="h-11"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* restaurant address */}
              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-fh-green-deep font-medium"
                      >
                        Restaurant Location
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your restaurant location"
                        className="h-11"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

                {/* restaurant image */}
                <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-fh-green-deep font-medium"
                      >
                        Restaurant Image URL
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="Enter your restaurant image url"
                        className="h-11"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </>
          )}

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
          Create {role === "PROVIDER" ? "Provider" : "Customer"} Account →
        </Button>
      </form>
    </Card>
  );
}
