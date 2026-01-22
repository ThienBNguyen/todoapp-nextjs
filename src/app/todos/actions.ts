"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTodo(title: string) {
  const t = String(title ?? "").trim();
  if (!t) return;

  await prisma.todo.create({ data: { title: t } });
  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return;

  await prisma.todo.update({
    where: { id },
    data: { complete: !todo.complete },
  });

  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todos");
}

export async function clearCompleted() {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath("/todos");
}
