import React from "react";

function NotFound() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-neutral-900">Page Not Found</h2>
      <p className="mt-2 text-neutral-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
