import { chores } from "./app/lib/data";
import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

async function seedDB() {
  // first clear the db of all data
  // const data = await sql`
  //   TRUNCATE chores;
  // `;
  // console.log("Finished", data);

  // add all data from
  chores.forEach(async (chore) => {
    await sql`
    INSERT INTO chores
    (name, frequency, description, frequency_description, last_completed, due_date)
    VALUES
    (${chore.name}, ${chore.frequency}, ${chore.description}, ${chore.frequency_description}, ${chore.last_completed}, ${chore.due_date})
    `;
  });
}

seedDB();
