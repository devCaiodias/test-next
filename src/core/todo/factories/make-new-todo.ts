import { Todo } from "../schemas/todo.contract";

export function makeNewTodo(description: string): Todo {
  return {
    id: crypto.randomUUID(),
    description,
    createAt: new Date().toISOString(),
  }
}
