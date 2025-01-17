import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTask } from "@/contexts/task-organizerly";
import { CreateTaskSchema } from "@/schemas/create-task-schema";
import { CreateTaskSchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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

export function CreateTask() {
  const { createTask } = useTask();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function handleCreateTaskSubmit(data: CreateTaskSchemaType) {
    createTask(data.title, data.description);
    handleOpenDialog(false);
    toastInformation(
      "✅ Tarefa criada com sucesso!",
      'Sua nova tarefa foi criada, Você pode vê lá na aba "Pendentes".'
    );
  }

  function handleOpenDialog(open: boolean) {
    setOpenDialog(open);
    form.reset();
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus />
          Adicionar Novo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTaskSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Crie uma uma nova tarefa</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar sua tarefa.
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
            <Button type="submit"> Criar Tarefa</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
