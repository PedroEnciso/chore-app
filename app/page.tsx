import styles from "./page.module.css";
import { chores } from "@/app/lib/data";

export default function Home() {
  return (
    <>
      <h1>Hello this is the chore app</h1>
      <ul>
        {chores.map((chore) => (
          <li key={chore.id}>{chore.name}</li>
        ))}
      </ul>
    </>
  );
}
