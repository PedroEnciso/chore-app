import ChoreForm from "@/app/ui/chores/ChoreForm";
import Header from "@/app/ui/chores/Header";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Providers } from "../(overview)/provider";

export default async function Page() {
  return (
    <Providers>
      <Header page="new" />
      <main className="w-11/12 mx-auto mt-8">
        <ChoreForm />
      </main>
    </Providers>
  );
}
