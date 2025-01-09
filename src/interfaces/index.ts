import { ETaskStatus } from "@/enums";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ETaskStatus;
}