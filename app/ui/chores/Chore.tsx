"use client";

import { useEffect, useState, useActionState } from "react";
import { is_due, format_date, get_days_lapsed } from "@/app/utils";
import { Chore as TChore } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { update_chore_completed_date } from "@/app/lib/actions";
import Pill from "./pill";
import { TypographyH2 } from "@/components/typography";

const initialState = {
  message: "",
  success: false,
};

function Chore({ chore }: { chore: TChore }) {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  const [formState, formAction] = useActionState(
    update_chore_completed_date,
    initialState
  );

  useEffect(() => {
    if (formState.success === true) {
      closeDialog();
    }
  }, [formState.success]);

  const dirty_status = get_dirtiness_status(get_days_lapsed(chore.due_date));

  return (
    <li
      key={chore.id}
      className="flex flex-col gap-2 bg-black/5 rounded-xl px-4 py-6"
    >
      <p
        className="scroll-m-20 text-xl font-semibold tracking-tight cursor-pointer"
        onClick={() => openDialog()}
      >
        {chore.name}
      </p>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <Pill variant={dirty_status}>{dirty_status}</Pill>
          {is_due(chore.due_date) ? (
            <p className="text-sm font-medium leading-none">
              Dirty for {get_days_lapsed(chore.due_date)} days
            </p>
          ) : (
            <p className="text-sm font-medium leading-none">
              until {format_date(chore.due_date)}
            </p>
          )}
        </div>
        <p>{chore.frequency_description}</p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{chore.name}</DialogTitle>
            <DialogDescription>{chore.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form action={formAction}>
              <input type="hidden" name="id" value={chore.id} />
              <input type="hidden" name="name" value={chore.name} />
              <input type="hidden" name="frequency" value={chore.frequency} />
              <Button type="submit" className="w-full md:w-fit mt-4">
                Mark as completed
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}

export default Chore;

function get_dirtiness_status(days_lapsed: number): DirtinessStatus {
  switch (true) {
    case days_lapsed < 0:
      return "Clean";
    case days_lapsed >= 0 && days_lapsed < 7:
      return "Ready to clean";
    case days_lapsed >= 7 && days_lapsed < 14:
      return "Dirty";
    default:
      return "Very dirty";
  }
}

export type DirtinessStatus =
  | "Very dirty"
  | "Dirty"
  | "Ready to clean"
  | "Clean";
