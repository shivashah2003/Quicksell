import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import KanbanBoard from './KanbanBoard'; // Import the KanbanBoard component

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeBoard, setActiveBoard] = useState("User"); // Track which board is active

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBoardClick = (type) => {
    setActiveBoard(type); // Show the respective Kanban board
  };

  return (
    <div>
      <nav className="navbar">
        <button className="display-btn">
          <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
          </span> Display
          <span className="down-btn" onClick={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
          </span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item">
              <span className='grouping'>Grouping</span>
              <button className="status-btn" onClick={() => handleBoardClick('Status')}>
                Status
                <span className="down-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </span>
              </button>
              {/* <button className="user-btn" onClick={() => handleBoardClick('User')}>
                User
                <span className="down-btn">▼</span>
              </button> */}
            </div>

            <div className="dropdown-item">
              <span className='Ordering'>Ordering</span>
              <button className="priority-btn" onClick={() => handleBoardClick('Priority')}>
                Priority
                <span className="down-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Render the active KanbanBoard */}
      {activeBoard && (
        <div className="kanban-container">
          <KanbanBoard type={activeBoard} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
