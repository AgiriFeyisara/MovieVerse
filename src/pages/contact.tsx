import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center px-6 py-4 shadow-md bg-gray-800">
        <button
          onClick={() => router.back()}
          className="text-white text-2xl font-bold mr-4 hover:opacity-80"
        >
          ←
        </button>
        <h1 className="text-xl md:text-2xl font-bold">Contact Us</h1>
      </div>

      <div className="max-w-xl mx-auto mt-10 px-6">
        <h1 className="font-bold text-xl mb-4">
          Do you have a suggestion, recommendation or complaint? Send us a
          message.
        </h1>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values,
            {
              resetForm,
            }: FormikHelpers<{ name: string; email: string; message: string }>,
          ) => {
            console.log("Form Submitted:", values);
            alert("Form submitted successfully");
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* Name */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="How can we help you..."
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none"
                />
                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 transition py-2 rounded font-semibold disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
