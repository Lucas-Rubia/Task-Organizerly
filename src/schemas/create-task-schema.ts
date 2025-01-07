import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Informe um título para a tarefa"),
  description: z
    .string()
    .min(10, {
      message: "Descrição precisa ter no mínimo 10 caracteres.",
    })
    .max(400, {
      message: "Descrição não pode ter mais de 400 caracteres.",
    }),
});
