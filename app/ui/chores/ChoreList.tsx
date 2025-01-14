import { fetchChores } from "@/app/lib/queries";
import Chore from "@/app/ui/chores/Chore";

export default async function ChoreList() {
  // fetch list of chores by ascending due date
  const chores = await fetchChores();

  return (
    <>
      <ul className="flex flex-col gap-8">
        {chores.length > 0 ? (
          chores.map((chore) => <Chore key={chore.id} chore={chore} />)
        ) : (
          <p>You have not added any chores yet!</p>
        )}
      </ul>
    </>
  );
}
