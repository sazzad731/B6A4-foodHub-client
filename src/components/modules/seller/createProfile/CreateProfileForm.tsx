"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProfile } from '@/services/seller'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from "zod"

const profileSchema = z.object({
  businessName: z.string().min(1, "Please enter your brand name"),
  address: z.string().min(1, "Please enter your business address"),
  contactNumber: z.string().min(11, "Please enter a valid number"),
  description: z.string().min(10, "Description will be minimum 10 character")
})


export default function CreateProfileForm() {
  const form = useForm({
    defaultValues: {
      businessName: "",
      address: "",
      contactNumber: "",
      description: "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Profile creating")
      try {
        const result = await createProfile(value);
        console.log(result);
        if (result.success) {
          toast.success(result.message, {id: toastId});
        } else if (result.success === false && result.error.code === "P2002") {
          toast.error("Profile already created", { id: toastId });
        } else {
          toast.error(result.message), {id: toastId};
        }
      } catch (error: any) {
        toast.error(error.message, { id: toastId });
      }
    },
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Profile</CardTitle>
        <CardDescription>You must have to create a profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Business Name */}
          <FieldGroup className="mb-5">
            <form.Field
              name="businessName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Business Name</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter your brand name"
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

          {/* Address */}
          <FieldGroup className="mb-5">
            <form.Field
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter your brand name"
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

          {/* Contact Number */}
          <FieldGroup className="mb-5">
            <form.Field
              name="contactNumber"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact Number</FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      name={field.name}
                      value={field.state.value}
                      placeholder="Type here"
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

          {/* Description */}
          <FieldGroup className="mb-5">
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter your brand name"
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
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Button form="profile-form" type="submit" className="cursor-pointer">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
