import { fetchChores, fetchMembers } from "@/app/lib/queries";
import ChoreList from "@/app/ui/chores/ChoreList";

export default async function ChoreContainer() {
  // fetch list of chores by ascending due date
  const members = await fetchMembers();
  const chores = await fetchChores();

  return <ChoreList chores={chores} members={members} />;
}
