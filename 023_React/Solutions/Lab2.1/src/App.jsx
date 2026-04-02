import { useState } from "react";
import usersData from "./data/users";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(usersData);
      setHasSearched(false);
      return;
    }
    const results = usersData.filter((user) => {
      const term = searchTerm.toLowerCase();
      return (
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.toLowerCase().includes(term)
      );
    });
    setFilteredUsers(results);
    setHasSearched(true);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredUsers(usersData);
    setHasSearched(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-kicker">Directory</p>
        <h1>Team Users</h1>
        <p className="app-subtitle">
          Search by username, email, or phone number.
        </p>
      </header>

      <section className="app-panel">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          onReset={handleReset}
          hasSearched={hasSearched}
        />

        <p className="results-count">Showing {filteredUsers.length} users</p>
        <UserList users={filteredUsers} />
      </section>
    </div>
  );
}

export default App;
