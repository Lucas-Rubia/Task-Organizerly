import { CreateTaskSchema } from "@/schemas/create-task-schema";
import { z } from "zod";

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;