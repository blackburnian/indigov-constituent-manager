"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Constituent } from "../types";

export const ConstituentsTable = () => {
  const [constituents, setConstituents] = useState<Constituent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConstituents = async () => {
      try {
        const response = await axios.get<Constituent[]>("/api/constituents");
        setConstituents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch constituents.");
      }
    };
    fetchConstituents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Street Address
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Zip Code
            </th>
            <th scope="col" className="px-6 py-3">
              Sign up time
            </th>
          </tr>
        </thead>
        <tbody>
          {constituents.map(
            ({
              id,
              first_name,
              last_name,
              email,
              street_address,
              city,
              state,
              zip_code,
              created_at,
            }) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{first_name}</td>
                <td className="px-6 py-4">{last_name}</td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">{street_address}</td>
                <td className="px-6 py-4">{city}</td>
                <td className="px-6 py-4">{state}</td>
                <td className="px-6 py-4">{zip_code}</td>
                <td className="px-6 py-4">
                  {format(new Date(created_at), "MMM d, yyyy, h:mm a")}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
