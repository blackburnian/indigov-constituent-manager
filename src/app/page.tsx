import Link from "next/link";
import { ConstituentsTable } from "./ConstituentsTable";
import { ExportConstituents } from "./ExportConstituents";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Constituent Manager
        </h1>
        <div className="flex justify-between content-baseline w-full">
          <Link
            href="/add"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Add a constituent
          </Link>
          <ExportConstituents />
        </div>
        <ConstituentsTable />
      </main>
    </div>
  );
}
