import ChoreForm from "@/app/ui/chores/ChoreForm";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <header className="mt-10 w-11/12 mx-auto flex flex-col gap-3">
        <TypographyH1>New Chore</TypographyH1>
        <Link href="/chores">
          <Button variant="outline" className="w-fit">
            Back to chores
          </Button>
        </Link>
      </header>
      <main className="w-11/12 mx-auto mt-8">
        <ChoreForm />
      </main>
      {/* <p>"My idea of housework is to sweep the room with a glance."</p> */}
    </>
  );
}
