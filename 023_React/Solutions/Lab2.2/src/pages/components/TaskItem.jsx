import React from "react";

function TaskItem({ task, onDeleteTask, onUpdateTask }) {
  const isCompleted = task.completed;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className={`text-lg font-semibold ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}`}
          >
            {task.title}
          </h3>

          <p className="mt-1 text-slate-600">{task.description}</p>
        </div>

        <span
          className={`rounded-full px-5 py-2 text-xs font-semibold uppercase  ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Task ID: {task.id}</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => onUpdateTask({ ...task, completed: !isCompleted })}
            className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
          >
            {isCompleted ? "Mark Incomplete" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
