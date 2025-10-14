import React from 'react';
import { useNavigate } from 'react-router-dom';
import Refresh from '../../pages/Refresh';
import useDeleteAgent from '../../hooks/useDeleteAgent';
import { agentService } from '../../services/agentService';

const AgentList = ({ agents, loading, error, onRefresh }) => {
  const { deleteAgent, isLoading: deleteLoading, error: deleteError } = useDeleteAgent();
  const navigate = useNavigate();

  // Date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const showAlert = async (itemId) => {
    alert("You clicked on Record " + itemId);
    if (window.confirm("Are you sure you want to delete agent #" + itemId + "?")) {
      const result = await deleteAgent(itemId);
      
      if (result && result.success) {
        alert("Agent deleted successfully!");
        try {
          await agentService.getAllAgents();
          onRefresh();
        } catch (refreshError) {
          console.error("Error refreshing agents list:", refreshError);
        }
      } else {
        alert("Failed to delete agent: " + (result?.error || "Unknown error"));
      }
    }
  };

  const handleCreateClick = () => {
    navigate('/createpage');
    console.log('Create button clicked!');
  };
  
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
        <p>Loading agents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#dc3545' 
      }}>
        <h3>Error Loading Data</h3>
        <p>{error}</p>
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

  if (agents.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666',
        border: '2px dashed #ccc',
        borderRadius: '8px'
      }}>
        <p>No agents found.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Agents List ({agents.length} agents)</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
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
          <button 
            onClick={handleCreateClick}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 2fr 2fr', // Equal proportional widths
        gap: '15px',
        padding: '15px 20px',
        backgroundColor: '#194f85ff',
        border: '1px solid #dee2e6',
        borderRadius: '8px 8px 0 0',
        fontWeight: 'bold',
        color: '#e2ebf5ff',
        marginBottom: '10px'
      }}>
        <div>Agent ID</div>
        <div>Agent Name</div>
        <div>Created Date</div>
        <div>Actions</div>
      </div>

      {/* Agents Grid */}
      <div style={{ 
        display: 'grid', 
        gap: '10px' 
      }}>
        {agents.map(agent => (
          <div 
            key={agent.id}
            style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* Data Row - Using same grid layout as header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 2fr 2fr', // Same as header
              gap: '15px',
              alignItems: 'center'
            }}>
              {/* Agent ID */}
              <div>
                <strong style={{ color: '#333', fontSize: '16px' }}>
                  #{agent.id}
                </strong>
              </div>
              
              {/* Agent Name */}
              <div>
                <span style={{ color: '#333', fontSize: '16px' }}>
                  {agent.agentName}
                </span>
              </div>
              
              {/* Created Date */}
              <div>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  {formatDate(agent.createdDate)}
                </span>
              </div>
              
              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
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
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => showAlert(agent.id)}
                  disabled={deleteLoading}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: deleteLoading ? '#6c757d' : '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: deleteLoading ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;