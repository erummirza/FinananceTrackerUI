import React from 'react';

const AgentByID = ({ agent, loading, error, onRefresh }) => {
  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666' 
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading agent...</p>
      </div>
    );
  }

  if (error) {
    console.log('Error object:', error);
    console.log('Error code:', error?.code);
    console.log('Error status:', error?.status);
    console.log('Error message:', error?.message);
    console.log('Error string:', error?.toString());
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#dc3545' 
      }}>
        <h3>Error Loading Data</h3>
        
  <p>
  {error && (error === 'Request failed with status code 404' || error?.status === 404 || error?.code === 404)
    ? 'Record not found'
    : error?.message || 'Something went wrong'
  }
</p>
        <button 
          onClick={onRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!agent) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666',
        border: '2px dashed #ccc',
        borderRadius: '8px'
      }}>
        <p>No agent found.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Agent Details</h3>
        <button 
          onClick={onRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh
        </button>
     
            </div>

      <div 
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
              #{agent.id} - {agent.agentName}
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              ID: {agent.id}
            </p>
            {/* Add more agent details here as needed */}
            {/* Example: */}
            {/* <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>
              Email: {agent.email}
            </p>
            <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>
              Status: {agent.status}
            </p> */}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              View
            </button>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Edit
            </button>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentByID;