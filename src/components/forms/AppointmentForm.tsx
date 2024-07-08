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
import { getAppointmentSchema, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { Doctors, GenderOptions } from "../../../constants"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { SearchParamProps, Status } from "../../../types"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import { createAppointment } from "@/lib/actions/appointment.actions"

const AppointmentForm = ({
  userId, patientId, type 
}: {
  userId: string
  patientId: string
  type: "create" | "cancel" | "schedule"
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    setIsLoading(true);

    let status;

    switch (type) {
      case "create":
        status = "scheduled"
        break;
      case "cancel":
        status = "cancelled"
        break;
      case "schedule":
        status = "scheduled"
        break;
      default:
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          schedule: new Date(values.schedule),
          status: status as Status,
          note: values.note
        }
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
        }
      }

    } catch (error: any) {

      // if (error.code === 409) {
      //   router.push(`/patients/${user?.id}/register`)
      // }
      console.log("Error: ", error)
    }
  }

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Get new appointment in seconds</p>
        </section>

        {/* <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>

          </div>
        </section> */}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="Select a physician"
            //   iconStr="/assets/icons/user.svg"
            //   iconAlt="user"
            >
                {Doctors.map((doctor) => (
                    <SelectItem 
                        key={doctor.name}
                        value={doctor.name}
                    >
                        <div className="flex cursor-pointer items-center gap-2">
                            <Image
                                src={doctor.image}
                                width={32}
                                height={32}
                                alt={doctor.name}
                                className="rounded-full border border-dark-500"
                            />
                            <p>{doctor.name}</p>
                        </div>
                    </SelectItem>
                ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="dd/MM/yyyy - h:mm aa"
                // placeholder="Enter your email"
                // iconStr="/assets/icons/email.svg"
                // iconAlt="email"
              />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton 
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  ) 
}

export default AppointmentForm
