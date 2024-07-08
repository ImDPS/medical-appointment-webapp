"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
} from "@/components/ui/form"
import { SubmitButton } from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import CustomFormField, { FormFieldType } from "../CustomFormField"


const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const { name, email, phone } = values;

    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if(user) {
        setIsLoading(false)
      }
      if(user) router.push(`/patients/${user?.id}/register`)
        
    } catch (error) {
      console.log("Error: ", error)
    } finally {

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there </h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
       
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="(+91) 91xxxxxxxxx"
          // iconSrc="/assets/icons/email.svg"
          // iconAlt="email"
        />
        <SubmitButton isLoading={isLoading}>
          Getting Started
        </SubmitButton>
      </form>
    </Form>
  ) 
}

export default PatientForm
