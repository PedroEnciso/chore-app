"use server";

import { updateChoreCompletedDate } from "./queries";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function update_chore_completed_date(
  prevState: {
    message: string;
    success: boolean;
  },
  formData: FormData
) {
  const date = new Date();

  const schema = z.object({
    id: z.number().min(1),
    frequency: z.number().min(1),
  });

  try {
    const id = formData.get("id") as string;
    const frequency = formData.get("frequency") as string;
    const name = formData.get("name");

    if (!id || !frequency) {
      throw new Error("Either id or frequency is not the correct type.");
    }

    const data = schema.parse({
      id: parseInt(id),
      frequency: parseInt(frequency),
    });

    await updateChoreCompletedDate(data.id, date, data.frequency);

    revalidatePath("/chores");
    console.log("updated chore");
    return { message: `Updated chore ${name}.`, success: true };
  } catch (error) {
    console.log("There was an error:", error);
    return { message: `Failed to updated chore.`, success: false };
  }
}
