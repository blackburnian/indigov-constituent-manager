import mysql, { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";
import { parse } from "json2csv";
import { Constituent } from "@/app/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate") || "0000-01-01"; // Default to the earliest date
  const endDate = searchParams.get("endDate") || "9999-12-31"; // Default to the latest date

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute<(Constituent & RowDataPacket)[]>(
      "SELECT * FROM constituents WHERE created_at BETWEEN ? AND ?",
      [startDate, endDate]
    );

    await connection.end();

    const csv = parse(rows, {
      fields: [
        "id",
        "first_name",
        "last_name",
        "email",
        "street_address",
        "city",
        "state",
        "zip_code",
        "created_at",
      ],
    });

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=constituents_${startDate}_to_${endDate}.csv`,
      },
    });
  } catch (error) {
    console.error("Error exporting constituents:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
