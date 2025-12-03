import React, { useState } from 'react';

const ProfileCard = ({ username }) => {
  // State to simulate login/logout status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Safely get the first letter (handles cases where username might be empty)
  const firstLetter = username ? username.charAt(0).toUpperCase() : '?';

  // Handlers for button clicks
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={styles.card}>
      {/* Display first letter of userName inside a circle */}
      <div style={styles.avatar}>
        {firstLetter}
      </div>

      {/* Display the full username */}
      <h1>
        {username || "Guest User"}
      </h1>

      {/* Handle login and logout buttons using Conditional Rendering */}
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.buttonLogout}>
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} style={styles.buttonLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

// Basic styling object to make it look like a card
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    maxWidth: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px auto'
  },
  buttonLogin: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buttonLogout: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ProfileCard;