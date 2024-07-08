"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
} from "@/components/ui/form"
import { SubmitButton } from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { GenderOptions, IdentificationTypes } from "../../../constants"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import { SelectItem } from "../ui/select"
import { FileUploader } from "../FileUploader"
import { User } from "../../../types"


const RegisterForm = ({ user }: {user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    let formData;

    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], { type: values.identificationDocument[0].type });
      formData = new FormData();
      formData.append('blobFile', blobFile)
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {

      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }

      console.log("Patient Data: ", patientData)

      // const patient = await registerPatient(patientData)

      // if (patient) router.push(`/patients/${user?.$id}/register`)
      
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
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
            // iconSrc="/assets/icons/email.svg"
            // iconAlt="email"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="709, Galaxy Heights, Sector 27, Naya Raipur, Chhattisgarh, India"
          />

          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Data Scientist"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's name"
          />

          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(+91) 91xxxxxxxxx"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg, Asprin 75mg"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg, Asprin 75mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg, Asprin 75mg"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Milk, Sulphur"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past medical history (if any)"
            placeholder="Uncle had asthama and he is having high blood pressure"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyHistory"
            label="Family history (if any)"
            placeholder="Appendectomy, Tonsillectomy, Cancer"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type"  
          >
            {IdentificationTypes.map((option: any) => (
              <SelectItem 
                key={option}
                value={option}
                id={option}
                className="cursor-pointer"
              >{option}</SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="ABCDE1234F"
          />
          <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            renderSkeleton={(field: any) => (
              <FormControl>
                <FileUploader 
                  files={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I have read and agree to the treatment consent form"
          
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I have read and agree to the disclosure consent form"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I have read and agree to the privacy consent form"
        />

        <SubmitButton 
          isLoading={isLoading}
        >
          Getting Started
        </SubmitButton>
      </form>
    </Form>
  ) 
}

export default RegisterForm
