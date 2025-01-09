import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name,
      last_name,
      email,
      street_address,
      city,
      state,
      zip_code,
    } = body;

    // Validate input
    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        { message: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Use UPSERT (INSERT ... ON DUPLICATE KEY UPDATE)
    const query = `
      INSERT INTO constituents (first_name, last_name, email, street_address, city, state, zip_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        street_address = VALUES(street_address),
        city = VALUES(city),
        state = VALUES(state),
        zip_code = VALUES(zip_code)
    `;

    await connection.execute(query, [
      first_name,
      last_name,
      email,
      street_address,
      city,
      state,
      zip_code,
    ]);

    await connection.end();
    return NextResponse.json(
      { message: "Constituent added or updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding or updating constituent:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
