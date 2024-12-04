import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";

const App = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default App;
