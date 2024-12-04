import React, { useEffect, useState } from "react";
import "./KanbanBoard.css"; // Import CSS for styling

const KanbanBoard = ({ type }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  // Define columns dynamically based on type
  const columns =
    {
      Status: [
        { type: "Backlog", img: "/Backlog.svg" },
        { type: "Todo", img: "/Todo.svg" },
        { type: "In progress", img: "/progress.svg" },
        { type: "Done", img: "/Done.svg" },
        { type: "Cancelled", img: "/Cancelled.svg" },
      ],
      Priority: [
        { type: "No Priority", val: 0, img: "/No priority.svg" },
        { type: "Urgent", val: 4, img: "/Urgent.svg" },
        { type: "High", val: 3, img: "/High.svg" },
        { type: "Medium", val: 2, img: "/High.svg" },
        { type: "Low", val: 1, img: "/High.svg" },
      ],
      User: users.map((user) => user.name),
    }[type] || [];

  // Helper to filter tickets based on column type
  const filterTickets = (column) => {
    if (type === "Status")
      return tickets.filter((ticket) => ticket.status === column.type);
    if (type === "Priority")
      return tickets.filter((ticket) => ticket.priority === column.val);
    if (type === "User") {
      const user = users.find((u) => u.name === column);
      return tickets.filter((ticket) => ticket.userId === user?.id);
    }
    return [];
  };

  const Profile = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user.name[0];
  };

  return (
    <div className="kanban-board">
      {columns.map((column, index) => (
        <div className="column" key={index}>
          <div className="column-header">
            <div className="header-bar">
              <span className="header-icon">
                {type === "User" && (
                  <button className="profile-icon">{column[0]}</button>
                )}
                {type === "Priority" && (
                  <img src={column.img} alt={column.type} />
                )}
                {type === "Status" && (
                  <img src={column.img} alt={column.type} />
                )}
              </span>

              <span className="header-name">
                {type === "User" ? column : column.type}
              </span>
              <span className="icon-number">
                {filterTickets(column).length}
              </span>
            </div>
            <div className="column-icons">
              <span className="icon-plus">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#B7B7B7"
                >
                  <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
                </svg>
              </span>
              <span className="icon-dots">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#B7B7B7"
                >
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="column-content">
            {filterTickets(column).map((ticket) => (
              <div className="ticket" key={ticket.id}>
                {type === "Priority" && (
                  <div className="ticket-div">
                    <div className="ticket-detail">
                      <span className="ticket-id">{ticket.id}</span>
                      <span className="ticket-title">{ticket.title}</span>
                      <div className="ticket-tag-div">
                        <button className="ticket-tag-three-dot">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#B7B7B7"
                          >
                            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                          </svg>
                        </button>
                        <button className="ticket-tag">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#B7B7B7"
                            >
                              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                          </span>
                          {ticket.tag}
                        </button>
                      </div>
                    </div>
                    <div className="profile-div">
                      <button className="profile-icon">
                        {Profile(ticket.userId)}
                      </button>
                    </div>
                  </div>
                )}
                {type === "Status" && (
                  <div className="ticket-div">
                    <div className="ticket-detail">
                      <div>
                        <span className="ticket-id">{ticket.id}</span>
                        <span>{ticket.name}</span>
                      </div>
                      <span className="ticket-title">{ticket.title}</span>
                      <div className="ticket-tag-div">
                        <button className="ticket-tag-three-dot">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#B7B7B7"
                          >
                            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                          </svg>
                        </button>
                        <button className="ticket-tag">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#B7B7B7"
                            >
                              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                          </span>
                          {ticket.tag}
                        </button>
                      </div>
                    </div>
                    <div className="profile-div">
                      <button className="profile-icon">
                        {Profile(ticket.userId)}
                      </button>
                    </div>
                  </div>
                )}
                {type === "User" && (
                  <div className="ticket-detail">
                    <div>
                      <span className="ticket-id">{ticket.id}</span>
                      <span>{ticket.name}</span>
                    </div>
                    <span className="ticket-title">{ticket.title}</span>
                    <div className="ticket-tag-div">
                      <button className="ticket-tag-three-dot">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#B7B7B7"
                        >
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                        </svg>
                      </button>
                      <button className="ticket-tag">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#B7B7B7"
                          >
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                          </svg>
                        </span>
                        {ticket.tag}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
