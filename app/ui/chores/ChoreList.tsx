import { fetchChores } from "@/app/lib/queries";
import Chore from "@/app/ui/chores/Chore";

export default async function ChoreList() {
  // fetch list of chores by ascending due date
  const chores = await fetchChores();

  return (
    <>
      <ul className="mt-8 flex flex-col gap-6">
        {chores.map((chore) => (
          <Chore key={chore.id} chore={chore} />
        ))}
      </ul>
    </>
  );
}
