import mysql, { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";
import { Constituent } from "../../types";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute<(Constituent & RowDataPacket)[]>(
      "SELECT * FROM constituents ORDER BY created_at DESC"
    );

    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching constituents:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
