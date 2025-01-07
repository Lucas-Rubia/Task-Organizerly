import { CreateTask } from "./create-task";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground pt-4 p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="size-5 rounded-md bg-primary-foreground" />
          <h3 className="text-xl leading-none tracking-tighter font-semibold">
            Task Organizerly
          </h3>
        </div>
        <CreateTask />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold uppercase">
          Organize suas tarefas
        </h1>
        <p className="text-lg text-secondary/80">
          O objetivo é facilitar o gerenciamento de tarefas do dia a dia,
          ajudando você a organizar suas atividades de forma prática e
          eficiente.
        </p>
      </div>
    </header>
  );
}
