import { prisma } from "@/lib/prisma";
import TodosClient from "./TodosClient";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, complete: true },
  });

  return <TodosClient todos={todos} />;
}
