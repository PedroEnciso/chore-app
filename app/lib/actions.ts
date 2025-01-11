"use server";

import {
  createNewChore,
  insertActivity,
  updateChoreCompletedDate,
} from "./queries";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function update_chore_completed_date(
  prevState: {
    message: string;
    success: boolean;
  },
  formData: FormData
): Promise<{
  message: string;
  success: boolean;
}> {
  const date = new Date();

  const schema = z.object({
    id: z.number().min(1),
    frequency: z.number().min(1),
    member_id: z.number(),
  });

  try {
    const id = formData.get("id") as string;
    const frequency = formData.get("frequency") as string;
    const name = formData.get("name");
    const member_id = formData.get("member_id") as string;

    if (!id || !frequency) {
      throw new Error("Either id or frequency is not the correct type.");
    }

    const data = schema.parse({
      id: parseInt(id),
      frequency: parseInt(frequency),
      member_id: parseInt(member_id),
    });
    // update the completed date of the chore
    await updateChoreCompletedDate(
      data.id,
      date,
      data.frequency,
      data.member_id
    );

    // add member id and chore id to activity table
    await insertActivity(data.member_id, data.id);

    revalidatePath("/chores");
    return { message: `Updated chore ${name}.`, success: true };
  } catch (error) {
    console.log("There was an error:", error);
    return { message: `Failed to updated chore.`, success: false };
  }
}

export async function create_new_chore({
  name,
  description,
  frequency,
  last_completed,
}: {
  name: string;
  description: string;
  frequency: string;
  last_completed?: Date;
}): Promise<{
  message: string;
}> {
  const frequency_number = parseInt(frequency);

  const formSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(250),
    frequency: z.number().min(1).max(60),
    last_completed: z.date().optional(),
  });

  try {
    // validate the input
    const parse = formSchema.safeParse({
      name,
      description,
      frequency: frequency_number,
      last_completed,
    });

    if (!parse.success) {
      return { message: "Failed to create chore." };
    }
    // define all variables
    const validated_name = parse.data.name;
    const validated_description = parse.data.description;
    const validated_frequency = parse.data.frequency;
    let validated_last_completed = parse.data.last_completed;
    // check for last_completed
    if (!validated_last_completed) {
      // last_completed not inputed by user, assume the chore is due today
      validated_last_completed = getDateNDaysBefore(validated_frequency + 1);
    }
    // determine frequency_description and due_date
    const frequency_description = getFrequencyDescription(validated_frequency);
    const due_date = getDateNDaysAfter(
      validated_last_completed,
      validated_frequency
    );
    // create a new chore using the query
    await createNewChore({
      name: validated_name,
      description: validated_description,
      frequency: validated_frequency,
      last_completed: validated_last_completed,
      frequency_description,
      due_date,
    });

    return { message: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "There was an error creating this chore." };
    }
  }
}

// returns the date that was n number of days ago
function getDateNDaysBefore(n: number) {
  const today = new Date();
  today.setDate(today.getDate() - n);
  return today;
}

function getDateNDaysAfter(date: Date, n: number) {
  date.setDate(date.getDate() + n);
  return date;
}

function getFrequencyDescription(frequency: number) {
  switch (true) {
    case frequency <= 13:
      return "Once a week";
    case frequency > 13 && frequency <= 29:
      return "Every other week";
    case frequency > 29 && frequency <= 59:
      return "Once a month";
    default:
      return "Every other month";
  }
}
