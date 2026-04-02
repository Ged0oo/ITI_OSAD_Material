import React from "react";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import tasks from "../data/Tasks";

function HomePage() {
  const [userTasks, setTasks] = React.useState(tasks);

  function handleAddTask(task) {
    setTasks((prevTasks) => {
      const nextId =
        prevTasks.length === 0
          ? 1
          : Math.max(...prevTasks.map((item) => item.id)) + 1;

      return [...prevTasks, { ...task, id: nextId }];
    });
  }

  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleUpdateTask(updatedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/60">
        <p className="text-lg uppercase text-teal-600">Task Console</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Focus on what matters
        </h1>
      </header>

      <AddTask onAddTask={handleAddTask} />

      <TaskList
        tasks={userTasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}

export default HomePage;
