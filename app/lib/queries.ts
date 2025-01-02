import { sql } from "@vercel/postgres";
import type { Chore } from "./types";

export async function fetchChores() {
  try {
    const data = await sql<Chore>`
    SELECT * FROM chores
    ORDER BY chores.due_date ASC
    `;
    return data.rows;
  } catch (error) {
    throw new Error("Failed to fetch chores.");
  }
}

export async function fetchChore(id: number) {
  try {
    const data = await sql<Chore>`
    SELECT * FROM chores
    WHERE id = ${id};
    `;
    return data.rows;
  } catch (error) {
    throw new Error(`Failed to fetch chore with id ${id}.`);
  }
}

export async function updateChoreCompletedDate(
  id: number,
  date: Date,
  frequency_in_days: number
) {
  const new_due_date = addDaysToDate(date, frequency_in_days);
  try {
    const data = await sql<Chore>`
    UPDATE chores
    SET last_completed = ${date.toISOString()}, due_date = ${new_due_date.toISOString()}
    WHERE id = ${id};
    `;
    return data.rows;
  } catch (error) {
    throw new Error(`Failed to fetch chore with id ${id}.`);
  }
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
