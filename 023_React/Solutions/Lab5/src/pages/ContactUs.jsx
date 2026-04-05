import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import contactSchema from "../validations/contactSchema";

function Contact() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold text-neutral-900">
          Contact Us
        </h1>

        {success && (
          <div className="mb-4 rounded-lg border border-secondary-300 bg-secondary-50 p-3 text-center text-secondary-700">
            Your message has been sent successfully
          </div>
        )}

        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          validationSchema={contactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            setSuccess(true);
            resetForm();
            setTimeout(() => setSuccess(false), 3000);
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
                  as="textarea"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="mt-1 text-sm text-primary-700"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-2 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 active:bg-primary-800"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Contact;
