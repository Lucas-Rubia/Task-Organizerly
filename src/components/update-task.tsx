import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTask } from "@/contexts/task-organizerly";
import { Task } from "@/interfaces";
import { CreateTaskSchema } from "@/schemas/create-task-schema";
import { CreateTaskSchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface UpdateTaskProps {
  task: Task;
}

export function UpdateTask({ task }: UpdateTaskProps) {
  const { updateTask } = useTask();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  function handleUpdateTaskSubmit(data: CreateTaskSchemaType) {
    updateTask(task.id, data.title, data.description);
    handleOpenDialog(false);
    toastInformation(
      "✅ Tarefa atualizada com sucesso!",
      "Sua nova tarefa foi atualizada."
    );
  }

  function handleOpenDialog(open: boolean) {
    setOpenDialog(open);
    form.reset({
      title: task.title,
      description: task.description,
    });
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button size="icon" className="size-7 bg-blue-600 hover:bg-blue-500">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateTaskSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Atualize a tarefa</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para atualizar sua tarefa.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo da Tarefa" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      className="resize-none"
                      placeholder="Descrição da Tarefa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Atualizar Tarefa</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
