import React from "react";
import RoleChip from "./RoleChip";

const UserCard = ({ user }) => {
  return (
    <article className="user-card">
      <img src={user.profilePicture} alt={user.name} className="user-avatar" />

      <div className="user-role">
        <RoleChip role={user.role} />
      </div>

      <div className="user-info">
        <p className="user-name">{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.birthday}</p>
      </div>
    </article>
  );
};
export default UserCard;
