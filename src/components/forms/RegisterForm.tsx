"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomFormField } from "../CustomFormField"
import { SubmitButton } from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { GenderOptions } from "../../../constants"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

const RegisterForm = () => {
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
      console.log("User form: ", user)


      if(user) {
        console.log("User: ", user)
        router.push(`/patients/${user?.id}/register`)
      }
    } catch (error: any) {

      // if (error.code === 409) {
      //   router.push(`/patients/${user?.id}/register`)
      // }
      console.log("Error: ", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>

          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconStr="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            iconStr="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="(+91) 91xxxxxxxxx"
            // iconStr="/assets/icons/email.svg"
            // iconAlt="email"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birth"
            label="Date of Birth"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field: any) => (
              <FormControl>
                <RadioGroup 
                  className="flex h-11 gap-6 xl:justify-between" 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option: any) => (
                    <div 
                      key={option}
                      className="radio-group"

                    >
                      <RadioGroupItem 
                        value={option}
                        id={option}
                      />
                      <Label
                        htmlFor={option}
                        className="cursor-point"
                      >{option}</Label>
                    </div>
                  ))}
                  
                </RadioGroup>
              </FormControl>
            )}
            // iconStr="/assets/icons/email.svg"
            // iconAlt="email"
          />
        </div>
       
        
        
        <SubmitButton isLoading={isLoading}>
          Getting Started
        </SubmitButton>
      </form>
    </Form>
  ) 
}

export default RegisterForm
