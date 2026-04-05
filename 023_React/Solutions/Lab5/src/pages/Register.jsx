import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import registerSchema from "../validations/registerSchema";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-neutral-900">
          Register
        </h1>

        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log(values);
            navigate("/");
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-2 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 active:bg-primary-800"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
