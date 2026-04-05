import { object, string } from "yup";

const contactSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email format").required("Email is required"),
    message: string()
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message must be at most 500 characters")
        .required("Message is required"),
});

export default contactSchema;