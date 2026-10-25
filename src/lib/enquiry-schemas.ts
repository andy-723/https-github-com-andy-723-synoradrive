import { z } from "zod";

export const demoSchema = z.object({
  fullName: z.string().trim().nonempty("Full name is required").max(100),
  workEmail: z.string().trim().email("Enter a valid work email").max(255),
  mobile: z.string().trim().max(30).optional(),
  role: z.string().trim().nonempty("Select your role").max(100),
  dealership: z.string().trim().nonempty("Dealership or group name is required").max(150),
  rooftops: z.string().trim().nonempty("Select the number of rooftops").max(50),
  dms: z.string().trim().max(100).optional(),
  interest: z.string().trim().nonempty("Select what you're interested in").max(100),
  notes: z.string().trim().max(1000).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().nonempty("Name is required").max(100),
  workEmail: z.string().trim().email("Enter a valid work email").max(255),
  organisation: z.string().trim().max(150).optional(),
  enquiryType: z.string().trim().nonempty("Select an enquiry type").max(100),
  message: z.string().trim().nonempty("Message cannot be empty").max(1000, "Message must be less than 1000 characters"),
});
