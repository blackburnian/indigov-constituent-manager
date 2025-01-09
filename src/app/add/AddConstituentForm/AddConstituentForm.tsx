"use client";

import { useState } from "react";
import axios from "axios";

const formFields = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "street_address",
    label: "Street Address",
    type: "text",
    required: false,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: false,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    required: false,
  },
  {
    name: "zip_code",
    label: "ZIP Code",
    type: "text",
    required: false,
  },
];

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

export const AddConstituentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post("/api/constituents/add", formData);
      setMessage(response.data.message);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Handle AxiosError (response-specific errors)
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError("An unexpected Axios error occurred");
        }
      } else {
        // Handle other, unexpected errors
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      {(message || error) && (
        <div className="py-8">
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {formFields.map(({ name, label, type, required }) => {
          return (
            <div key={name} className="mb-5">
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {label}
                {required && "*"}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                required={required}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
