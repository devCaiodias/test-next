import { Todo } from "../schemas/todo.contract";

export default function makeNewTodo(description: string): Todo {
  return {
    id: crypto.randomUUID(),
    description,
    createAt: new Date().toISOString(),
  }
}
