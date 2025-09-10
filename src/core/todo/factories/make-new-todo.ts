export default function makeNewTodo(description: string) {
  return {
    id: crypto.randomUUID(),
    description,
    createAt: new Date().toISOString(),
  }
}
