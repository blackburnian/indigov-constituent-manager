import Link from "next/link";
import { AddConstituentForm } from "./AddConstituentForm";

export default function AddConstituent() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-5xl">
        <div className="flex justify-between content-end w-full">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Add a constituent
          </h1>
          <Link
            href="/"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Go back home
          </Link>
        </div>
        <AddConstituentForm />
      </main>
    </div>
  );
}
