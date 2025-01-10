"use client";

import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Chore from "@/app/ui/chores/Chore";
import { MemberContext } from "@/app/chores/(overview)/provider";
import type { ChoreWithMember, Member } from "@/app/lib/types";

const FormSchema = z.object({
  id: z.string({
    required_error: "Please select a name.",
  }),
});

export default function ChoreList({
  chores,
  members,
}: {
  chores: ChoreWithMember[];
  members: Member[];
}) {
  const member_context = useContext(MemberContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let member = members.find((member) => member.id === parseInt(data.id));
    if (!member) {
      // I'm not sure why member would be
      member = { name: "ped", id: 1 };
      member_context.setMember(member);
    } else {
      member_context.setMember(member);
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-8">
        {chores.map((chore) => (
          <Chore key={chore.id} chore={chore} />
        ))}
      </ul>

      <Dialog open={member_context.member == null} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>What is your name</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Please select your name.
          </DialogDescription>
          <DialogFooter>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select your name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {members.map((member) => (
                              <SelectItem
                                value={member.id.toString()}
                                key={member.name}
                              >
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full md:w-fit mt-4">
                  Confirm
                </Button>
              </form>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
