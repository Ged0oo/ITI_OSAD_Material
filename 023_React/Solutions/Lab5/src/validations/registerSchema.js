import { object, string, ref } from "yup";

const registerSchema = object({
    name: string().required("Name is required"),
    username: string().required("Username is required").matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
    ),
    email: string().email("Invalid email format").required("Email is required"),
    password: string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
            /[@$!%*?&]/,
            "Password must contain at least one special character"
        )
        .required("Password is required"),
    confirmPassword: string()
        .oneOf([ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default registerSchema;