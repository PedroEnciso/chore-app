import { DB } from "./db";
import type { Chore } from "./types";

export async function fetchChores(): Promise<Chore[]> {
  try {
    const db = await DB();
    return db.getChores();
  } catch (error) {
    throw new Error("Failed to fetch chores.");
  }
}

// export async function updateChoreCompletedDate(
//   id: number,
//   date: Date,
//   frequency_in_days: number
// ) {
//   const new_due_date = addDaysToDate(date, frequency_in_days);
//   try {
//     const data = await sql<Chore>`
//     UPDATE chores
//     SET last_completed = ${date.toISOString()}, due_date = ${new_due_date.toISOString()}
//     WHERE id = ${id};
//     `;
//     return data.rows;
//   } catch (error) {
//     throw new Error(`Failed to fetch chore with id ${id}.`);
//   }
// }

export async function createNewChore({
  name,
  description,
  frequency,
  frequency_description,
  last_completed,
  due_date,
}: {
  name: string;
  description: string;
  frequency: number;
  frequency_description: string;
  last_completed: Date;
  due_date: Date;
}): Promise<void> {
  try {
    const db = await DB();
    await db.createNewChore({
      name,
      description,
      frequency,
      frequency_description,
      last_completed,
      due_date,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a new chore.");
  }
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
