import { Suspense } from "react";
import ChoreList from "@/app/ui/chores/ChoreList";
import TypographyH1 from "@/components/typography/h1";
import { Button } from "@/components/ui/button";
export default async function Home() {
  return (
    <>
      <header className="mt-10 w-11/12 mx-auto flex flex-col gap-3">
        <TypographyH1>Enciso Chores</TypographyH1>
        <Button variant="outline" className="w-fit">
          Add a chore
        </Button>
      </header>
      <main className="w-11/12 mx-auto">
        <Suspense fallback={<p>Loading chores...</p>}>
          <ChoreList />
        </Suspense>
      </main>
      {/* <p>"My idea of housework is to sweep the room with a glance."</p> */}
    </>
  );
}
