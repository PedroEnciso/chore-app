import { chores } from "./app/lib/data";
import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

async function seedDB() {
  try {
    // first clear the chores and activity of all data
    await sql`
  TRUNCATE chores CASCADE;
`;

    // add all data from
    chores.forEach(async (chore) => {
      await sql`
  INSERT INTO chores
  (name, frequency, description, frequency_description, last_completed, due_date)
  VALUES
  (${chore.name}, ${chore.frequency}, ${chore.description}, ${chore.frequency_description}, ${chore.last_completed}, ${chore.due_date})
  `;
    });
    console.log("Success!");
  } catch (error) {
    console.log("Failure", error);
  }
}

seedDB();
