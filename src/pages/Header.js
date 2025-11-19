import React from 'react';

function Header() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'green', marginBottom: '15px' }}>✅ Welcome to Finance Tracker</h1>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Select "User" from the navigation to manage your agents.
      </p>
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h2>
        <p style={{ color: '#666', margin: 0 }}>
          Manage and view all agents in the system
        </p>
      </div>
    </div>
  );
}

export default Header;