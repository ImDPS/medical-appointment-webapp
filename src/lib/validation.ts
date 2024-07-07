import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
            .min(2, "Name must be atleast 2 characters")
            .max(50, "Name cannot be more than 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone),
                                        "Invalid phone number")

})