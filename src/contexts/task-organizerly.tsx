import { ETaskStatus } from "@/enums";
import { Task } from "@/interfaces";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface TaskContextProps {
  tasks: Task[];
  createTask: (title: string, description: string) => void;
  getTasks: () => Task[];
  updateTask: (id: string, title: string, description: string) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const STORAGE_KEY = "task-organizerly";

const getStoredTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

interface TaskProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProps) => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: ETaskStatus.PENDING,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getTasks = () => {
    return tasks;
  };

  const updateTask = (id: string, title: string, description: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
            }
          : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === ETaskStatus.PENDING
                  ? ETaskStatus.COMPLETED
                  : ETaskStatus.PENDING,
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        updateTask,
        removeTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
