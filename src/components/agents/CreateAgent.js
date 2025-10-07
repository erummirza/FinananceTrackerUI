import React from 'react';

const CreateAgent = () => {

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
  
      setIsSubmitting(true);
      
      try {
        // Your API call here
        //console.log('Form submitted:', formData);
        //call hook here
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert(`Agent "${formData.agentName}" created successfully!`);
        
        // Reset form
        setFormData({ agentName: '' });
        
      } catch (error) {
        console.error('Error creating agent:', error);
        alert('Error creating agent. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const handleReset = () => {
      setFormData({ agentName: '' });
      setErrors({});
    };
  
  return (
    <div className="agent-list">
      <h2>Create Agent List</h2>
      <div style={{ 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        marginBottom: '20px', 
        color: '#333',
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px'
      }}>
        Create New Agent
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Agent Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="agentName" 
            style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            Agent Name *
          </label>
          <input
            type="text"
            id="agentName"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              border: `2px solid ${errors.agentName ? '#dc3545' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter agent name"
            disabled={isSubmitting}
          />
          {errors.agentName && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '14px', 
              marginTop: '5px', 
              display: 'block' 
            }}>
              {errors.agentName}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'flex-end',
          borderTop: '1px solid #ddd',
          paddingTop: '20px'
        }}>
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            Clear
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              minWidth: '120px'
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create Agent'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateAgent;