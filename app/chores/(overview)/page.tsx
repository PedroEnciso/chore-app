import { Suspense } from "react";
import ChoreList from "@/app/ui/chores/ChoreList";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
    <>
      <header className="mt-10 w-11/12 mx-auto flex flex-col gap-3">
        <TypographyH1>Enciso Chores</TypographyH1>
        <Link href="/chores/create">
          <Button variant="outline" className="w-fit">
            Add a chore
          </Button>
        </Link>
      </header>
      <main className="w-11/12 mx-auto mt-8">
        <Suspense fallback={<p>Loading chores...</p>}>
          <ChoreList />
        </Suspense>
      </main>
      {/* <p>"My idea of housework is to sweep the room with a glance."</p> */}
    </>
  );
}
