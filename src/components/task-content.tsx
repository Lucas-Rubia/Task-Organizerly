import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/interfaces";
import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { TaskItem } from "./task-item";
import { Input } from "./ui/input";

interface TaskContentProps {
  title: string;
  description: string;
  tasks: Task[];
}

export function TaskContent({ title, description, tasks }: TaskContentProps) {
  const [search, setSearch] = useState("");
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Card>
      <CardHeader className="flex-row justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="max-w-[400px] flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procure pela tarefa..."
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="flex items-center justify-center gap-2 text-center bg-muted p-10 text-muted-foreground">
            <ClipboardList className="size-5" />
            Tarefa não encontrada
          </p>
        )}
      </CardContent>
    </Card>
  );
}
