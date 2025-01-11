"use client";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { MemberContext } from "@/app/chores/(overview)/provider";
import { User } from "lucide-react";

export default function Header({ page }: { page: "chores" | "new" }) {
  const member_context = useContext(MemberContext);

  return (
    <header className="mt-10 w-11/12 mx-auto flex flex-col gap-3">
      <TypographyH1>Enciso Chores</TypographyH1>
      <div className="flex gap-6 items-center">
        {page === "chores" ? (
          <Link href="/chores/create">
            <Button variant="outline" size="sm" className="w-fit">
              Add a chore
            </Button>
          </Link>
        ) : null}
        {page === "new" ? (
          <Link href="/chores">
            <Button variant="outline" size="sm" className="w-fit">
              Back to chores
            </Button>
          </Link>
        ) : null}
        {member_context.member ? (
          <div className="flex gap-2 items-center">
            <User className="h-5 w-5" />
            <p>{member_context.member}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
