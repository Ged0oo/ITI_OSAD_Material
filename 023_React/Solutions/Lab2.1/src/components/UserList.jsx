import React from "react";
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserList;
