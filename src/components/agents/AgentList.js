import React from 'react';
import { useNavigate } from 'react-router-dom';
import Refresh from '../../pages/Refresh';
import useDeleteAgent from '../../hooks/useDeleteAgent';
import useEditAgent from '../../hooks/useEditAgent';
import { agentService } from '../../services/agentService';

import { usePagination } from '../../hooks/usePagination';
//const AgentList = ({ agents, loading, error, onRefresh }) => {
const AgentList = ({ agents, loading, error, onRefresh, totalCount }) => {
  const { deleteAgent, isLoading: deleteLoading, error: deleteError } = useDeleteAgent();
    const { editAgent, isLoading: editLoading, error: editError } = useEditAgent();
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

   const {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize
  } = usePagination(1, 10);
  const showEditAlert = async (itemId) => {
    alert("You clicked on Record " + itemId);
    if (window.confirm("Are you sure you want to Edit agent #" + itemId + "?")) {
      //Naviaget to edit page 
    navigate(`/editpage/${itemId}`);
  
      //const result = await editAgent(itemId);
      //
      // if (result && result.success) {
      //   alert("Agent updated successfully!");
      //   try {
      //     await agentService.getAllAgents();
      //     onRefresh();
      //   } catch (refreshError) {
      //     console.error("Error refreshing agents list:", refreshError);
      //   }
      // } else {
      //   alert("Failed to edit agent: " + (result?.error || "Unknown error"));
      // }
    }
  };
   const totalPages = Math.ceil(totalCount / pageSize);
 const handlePageSizeChange = (newSize) => {
    changePageSize(parseInt(newSize));
    onRefresh(currentPage, parseInt(newSize));
  };

  // Generate visible page numbers
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
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
      {/* Header with Controls */}
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h3>Agents List</h3>
          <p style={{ color: '#666', margin: 0 }}>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} agents
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Page Size Selector */}
          <div>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>
              Show: 
            </label>
            <select 
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <button 
           // onClick={handleRefresh}
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
        gridTemplateColumns: '1fr 2fr 2fr 2fr',
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
        gap: '10px',
        marginBottom: '20px'
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 2fr 2fr',
              gap: '15px',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ color: '#333', fontSize: '16px' }}>
                  #{agent.id}
                </strong>
              </div>
              
              <div>
                <span style={{ color: '#333', fontSize: '16px' }}>
                  {agent.agentName}
                </span>
              </div>
              
              <div>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  {formatDate(agent.createdDate)}
                </span>
              </div>
              
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
                  onClick={() => showEditAlert(agent.id)}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          {/* First Page */}
          <button
            onClick={() => {
              firstPage();
              onRefresh(1, pageSize);
            }}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            First
          </button>

          {/* Previous Page */}
          <button
            onClick={() => {
              prevPage();
              onRefresh(currentPage - 1, pageSize);
            }}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {getVisiblePages().map(page => (
            <button
              key={page}
              onClick={() => {
                goToPage(page);
                onRefresh(page, pageSize);
              }}
              style={{
                padding: '8px 12px',
                border: '1px solid #007bff',
                backgroundColor: currentPage === page ? '#007bff' : 'white',
                color: currentPage === page ? 'white' : '#007bff',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: currentPage === page ? 'bold' : 'normal'
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Page */}
          <button
            onClick={() => {
              nextPage();
              onRefresh(currentPage + 1, pageSize);
            }}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Next
          </button>

          {/* Last Page */}
          <button
            onClick={() => {
              lastPage(totalPages);
              onRefresh(totalPages, pageSize);
            }}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};


export default AgentList;