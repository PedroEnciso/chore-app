import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Chore } from "./types";

export async function DB() {
  async function initialize() {
    return open({
      filename: "./mydatabase.db",
      driver: sqlite3.Database,
    });
  }

  const db = await initialize();

  async function getChores() {
    return await db.all<Chore[]>(`
      SELECT * 
      FROM chores 
      ORDER BY due_date ASC`);
  }

  async function createNewChore({
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
      const db = await open({
        filename: "./mydatabase.db",
        driver: sqlite3.Database,
      });

      await db.run(
        `
      INSERT INTO chores
      (name, frequency, description, frequency_description, last_completed, due_date)
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
        name,
        frequency,
        description,
        frequency_description,
        last_completed.toISOString(),
        due_date.toISOString()
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a new chore.");
    }
  }

  function close() {
    db.close();
  }

  return { getChores, close, createNewChore };
}

export async function openDb() {
  return open({
    filename: "./mydatabase.db",
    driver: sqlite3.Database,
  });
}
