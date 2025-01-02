export interface Chore {
  id: number;
  name: string;
  frequency: number;
  description: string;
  frequency_description: string;
  last_completed: Date;
  due_date: Date;
}
