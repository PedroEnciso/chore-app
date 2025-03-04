import { sql } from "@vercel/postgres";
import type { Chore, ChoreWithMember, Member } from "./types";

export async function fetchChores() {
  try {
    const data = await sql<ChoreWithMember>`
    SELECT 
    chores.id, 
    chores.name, 
    chores.frequency,
    chores.description,
    chores.frequency_description,
    chores.last_completed,
    chores.due_date,
    members.name AS member_name
    FROM chores
    LEFT JOIN members ON chores.person_last_completed = members.id
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
  frequency_in_days: number,
  member_id: number
) {
  const new_due_date = addDaysToDate(date, frequency_in_days);
  try {
    const data = await sql<Chore>`
    UPDATE chores
    SET last_completed = ${date.toISOString()}, due_date = ${new_due_date.toISOString()}, person_last_completed = ${member_id}
    WHERE id = ${id};
    `;
    return data.rows;
  } catch (error) {
    throw new Error(`Failed to fetch chore with id ${id}.`);
  }
}

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
}) {
  try {
    const data = await sql<Chore>`
    INSERT INTO chores
    (name, frequency, description, frequency_description, last_completed, due_date)
    VALUES
    (${name}, ${frequency}, ${description}, ${frequency_description}, ${last_completed.toISOString()}, ${due_date.toISOString()})
    `;
    return data.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a new chore.");
  }
}

export async function fetchMembers() {
  try {
    const data = await sql<Member>`
    SELECT * FROM members
    `;
    return data.rows;
  } catch (error) {
    throw new Error(`Failed to fetch members of your household.`);
  }
}

export async function insertActivity(member_id: number, chore_id: number) {
  try {
    await sql`
      INSERT INTO activity (chore_id, member_id) VALUES (${chore_id}, ${member_id})
    `;
  } catch (error) {
    throw new Error(`Failed to document activity.`);
  }
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
