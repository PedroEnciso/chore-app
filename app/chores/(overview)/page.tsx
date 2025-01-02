import { Suspense } from "react";
import ChoreList from "@/app/ui/chores/ChoreList";
import TypographyH1 from "@/components/typography/h1";
export default async function Home() {
  return (
    <>
      <TypographyH1>Enciso Chores</TypographyH1>
      <button>Add a chore</button>
      <Suspense fallback={<p>Loading chores...</p>}>
        <ChoreList />
      </Suspense>
      {/* <p>"My idea of housework is to sweep the room with a glance."</p> */}
    </>
  );
}
