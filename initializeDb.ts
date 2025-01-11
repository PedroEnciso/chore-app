import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Chore } from "./app/lib/types";

async function initiate_db() {
  try {
    // open the sqlite db
    const db = await open({
      filename: "./mydatabase.db",
      driver: sqlite3.Database,
    });
    // initialize chores table
    await db.exec(
      "CREATE TABLE chores (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(250) NOT NULL, frequency SMALLINT  NOT NULL, description VARCHAR(350) NOT NULL, frequency_description VARCHAR(100) NOT NULL, last_completed TIMESTAMP NOT NULL, due_date TIMESTAMP NOT NULL)"
    );
    // insert test data
    await db.exec(
      "INSERT INTO chores (name, frequency, description, frequency_description, last_completed, due_date) VALUES ('Dust the urn of regrets', 7, 'Ensure the ashes of bad decisions are spotless.', 'Every week', '2025-01-03 15:00:00', '2025-01-10 15:00:00'), ('Feed the existential dread', 1, 'Ponder the meaninglessness of it all while taking out the trash.', 'Daily', '2025-01-09 07:00:00', '2025-01-10 07:00:00'), ('Vacuum the void', 14, 'Suck up all traces of hope and lint from the living room.', 'Every two weeks', '2025-01-05 10:00:00', '2025-01-19 10:00:00'), ('Polish the shattered dreams', 30, 'Buff out the cracks and try to shine them up a bit.', 'Monthly', '2025-01-01 12:00:00', '2025-02-01 12:00:00'), ('Reorganize the chaos', 365, 'Sort through the inevitable entropy of life.', 'Yearly', '2024-01-10 09:00:00', '2025-01-10 09:00:00')"
    );
    // get the test data
    const result = await db.all<Chore[]>("SELECT * FROM chores");

    console.log(result);

    db.close();
  } catch (error) {
    console.log(error);
  }
}
initiate_db();
