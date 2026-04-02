import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Task List</h2>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-5 py-1 text-xs font-semibold uppercase text-slate-600">
          {tasks.length} total
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          No tasks yet. Add one above to get started.
        </p>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
