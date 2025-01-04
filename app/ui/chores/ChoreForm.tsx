"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { create_new_chore } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "A chore name is required.",
    })
    .max(100),
  description: z
    .string()
    .min(2, {
      message: "A chore name is required.",
    })
    .max(250),
  frequency: z
    .string()
    .min(1, {
      message: "A chore frequency is required.",
    })
    .max(2),
  last_completed: z.date().optional(),
});

function ChoreForm() {
  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      frequency: "",
      last_completed: undefined,
    },
  });

  // form states
  const {
    formState: { isSubmitting },
  } = form;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // router
  const router = useRouter();

  // submit function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // clear error message
    setErrorMessage(null);
    try {
      // call error
      const response = await create_new_chore(values);
      if (response.message !== "") {
        setErrorMessage(response.message);
      } else {
        // success, redirect
        router.push("/chores");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("There was an error creating this chore.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Chore name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="7">Once a week</SelectItem>
                  <SelectItem value="14">Every other week</SelectItem>
                  <SelectItem value="30">Once a month</SelectItem>
                  <SelectItem value="60">Every other month</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_completed"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Date last completed</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter the last date that this chore was completed if you
                remember it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-fit"
        >
          Submit
        </Button>
        {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
      </form>
    </Form>
  );
}

export default ChoreForm;
