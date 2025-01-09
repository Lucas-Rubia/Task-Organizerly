import { useTask } from "@/contexts/task-organizerly";
import { ETaskStatus } from "@/enums";
import { Task } from "@/interfaces";
import { toastInformation } from "@/utils/toast-information";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { UpdateTask } from "./update-task";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskStatus, removeTask } = useTask();

  const handleToggleTaskStatus = () => {
    toggleTaskStatus(task.id);
    const forwardTaskText =
      task.status === ETaskStatus.PENDING ? "concluidos" : "pendentes";
    toastInformation(
      "✅ Tarefa movida com sucesso!",
      `Sua tarefa foi movida para aba "${forwardTaskText}". Acesse para vê-la.`
    );
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
    toastInformation(
      "🗑️ Tarefa excluída com sucesso!",
      "Sua tarefa foi excluída. Você não poderá mais vê-la."
    );
  };

  return (
    <div className="border rounded-md bg-muted">
      <div className="flex items-center justify-between p-2">
        <h4 className="font-semibold">{task.title}</h4>
        <div className=" flex items-center gap-2">
          {task.status === ETaskStatus.PENDING ? (
            <>
              <Button
                size="icon"
                className="size-7 bg-emerald-600 hover:bg-emerald-500"
                onClick={handleToggleTaskStatus}
              >
                <Check />
              </Button>

              <UpdateTask task={task} />
            </>
          ) : (
            <Button
              size="icon"
              className="size-7 bg-blue-600 hover:bg-blue-500"
              onClick={handleToggleTaskStatus}
            >
              <RotateCcw />
            </Button>
          )}
          <Button
            variant="destructive"
            size="icon"
            className="size-7"
            onClick={handleRemoveTask}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <p className="p-3 text-sm bg-background rounded-sm">{task.description}</p>
    </div>
  );
}
