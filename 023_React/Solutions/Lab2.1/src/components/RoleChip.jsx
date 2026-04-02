import React from "react";

const RoleChip = ({ role }) => {
  const roleClass = `role-chip role-chip-${role || "guest"}`;

  return <span className={roleClass}>{role}</span>;
};

export default RoleChip;
