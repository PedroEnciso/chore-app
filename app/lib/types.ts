interface ChoreCore {
  id: number;
  name: string;
  frequency: number;
  frequency_description: string;
  description: string;
  last_completed: Date;
  due_date: Date;
}

export interface Chore extends ChoreCore {
  member_last_completed?: number;
}

export interface ChoreWithMember extends ChoreCore {
  member_name: string;
}

// export type Member = "ped" | "Daniel" | "Anisa" | "mom" | "dad";

export interface Member {
  id: number;
  name: string;
}
