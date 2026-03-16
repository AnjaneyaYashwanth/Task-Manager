"use client";

import { useState, useEffect } from "react";

type Task = {
id: number;
title: string;
description?: string;
completed?: boolean;
};

export default function TaskManager() {
const [tasks, setTasks] = useState<Task[]>([]);
const [newTask, setNewTask] = useState("");

const fetchTasks = async () => {
try {
const res = await fetch("/api/tasks?page=1&size=100");
const json = await res.json();


  if (Array.isArray(json.data)) {
    setTasks(json.data);
  } else {
    setTasks([]);
  }
} catch (error) {
  console.error("Error fetching tasks:", error);
}


};

const addTask = async () => {
if (!newTask.trim()) return;


await fetch("/api/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: newTask,
    description: "",
    completed: false
  })
});

setNewTask("");
fetchTasks();


};

const deleteTask = async (id: number) => {
await fetch(`/api/tasks/${id}`, {
method: "DELETE"
});


fetchTasks();


};

useEffect(() => {
fetchTasks();
}, []);

return ( <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20"> <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">


    <h1 className="text-2xl font-bold mb-6 text-center">
      Task Manager
    </h1>

    <div className="flex gap-2 mb-6">
      <input
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task..."
      />

      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>

    <ul className="space-y-2">
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">
          No tasks yet
        </p>
      )}

      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2"
        >
          <span>{task.title}</span>

          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

  </div>
</div>


);
}
