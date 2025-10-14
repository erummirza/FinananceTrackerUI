import React from 'react';

function Header() {
  return (
    <div>
      <h1>Welcome to Finance Tracker</h1>
      <p>Select "Agents" from the navigation to manage your agents.</p>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h1>
        <p style={{ color: '#666', margin: 0 }}>
          Manage and view all agents in the system
        </p>
      </div>
    </div>
  );
}

export default Header;