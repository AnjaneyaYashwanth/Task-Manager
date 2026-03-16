import { db } from "@/config/db";
import { tasks } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";

const taskResponseBody = {
  id: tasks.id,
  title: tasks.title,
  description: tasks.description,
  completed: tasks.completed,
};

// create prepared statements for optimized queries
const allTasksCount = db
  .select({ total: count() })
  .from(tasks)
  .prepare("all_tasks_count");

const allTasksQuery = db
  .select(taskResponseBody)
  .from(tasks)
  .limit(sql.placeholder("size"))
  .offset(
    (Number(sql.placeholder("page")) - 1) * Number(sql.placeholder("size"))
  )
  .prepare("all_tasks");

export const getAllTasks = async (page = 1, size = 10) => {
  try {
    const [totalResult, data] = await Promise.all([
      allTasksCount.execute(),
      allTasksQuery.execute({ page, size }),
    ]);

    const total = totalResult[0].total;

    return { total, data, ...determinePagination(total, page, size) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// pagination helper
function determinePagination(total: number, page: number, page_size: number) {
  if (total <= 0 || page <= 0) {
    return { hasNextPage: false, hasPrevPage: false };
  }

  const totalPages = Math.ceil(total / page_size);
  const hasPrevPage = page > 1 && page <= totalPages;
  const hasNextPage = page < totalPages;

  return { hasNextPage, hasPrevPage };
}

// create task
export const createNewTask = async (data: typeof tasks.$inferInsert) => {
  if (!data.title) throw new Error("Title is required");

  const createdTask = await db
    .insert(tasks)
    .values({
      title: data.title,
      description: data.description,
      completed: false,
    })
    .returning();

  return createdTask;
};

// delete task
export const deleteTask = async (id: number) => {
  const deletedTask = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();

  return deletedTask;
};

type UpdateTaskType = {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
};

// update task
export const updateTask = async (data: UpdateTaskType) => {
  if (!data.id) throw new Error("Task id is required");

  const updatedTask = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, data.id))
    .returning();

  return updatedTask;
};