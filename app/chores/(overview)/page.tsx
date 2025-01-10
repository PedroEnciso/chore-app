import { Suspense } from "react";
import ChoreContainer from "@/app/ui/chores/ChoreContainer";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Providers } from "./provider";
import Header from "@/app/ui/chores/Header";

export default async function Home() {
  return (
    <>
      <Providers>
        <Header page="chores" />
        <main className="w-11/12 mx-auto mt-8">
          <Suspense fallback={<p>Loading chores...</p>}>
            <ChoreContainer />
          </Suspense>
        </main>
      </Providers>
    </>
  );
}
