import React from "react";

function AddTask({ onAddTask }) {
  const [task, setTask] = React.useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() !== "") {
      onAddTask({
        title: task.title,
        description: task.description,
        completed: false,
      });
      setTask({ title: "", description: "" });
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/60 sm:p-6">
      <h2 className="text-xl font-semibold text-slate-900">Add New Task</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={task.title}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder:text-slate-400  "
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={task.description}
          onChange={handleChange}
          rows={3}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder:text-slate-400 outline-none "
        />
        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 font-semibold "
        >
          Add Task
        </button>
      </form>
    </section>
  );
}

export default AddTask;
