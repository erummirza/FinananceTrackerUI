import '../../App.css';
import { useAddAgent } from '../../hooks/useAddAgent';
import { useState } from 'react';

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    name: ''
  });
  
  // Add success state
  const [successMessage, setSuccessMessage] = useState('');

  const { addAgent, isLoading, error } = useAddAgent();

  const handleChange = (event) => {
    setFormData(prev => ({
      ...prev,
      name: event.target.value
    }));
    
    // Clear messages when user starts typing again
    if (successMessage || error) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    console.log("Form data:", formData);
    
    // Clear previous messages
    setSuccessMessage('');
    
    try {
      await addAgent({ name: formData.name });
      
      // ✅ Show success message when no error
      setSuccessMessage('Record added successfully!');
      console.log("✅ Agent added successfully!");
      
      // Reset form after success
      setFormData({ name: '' });
      
    } catch (err) {
      console.error("❌ Failed to add agent:", err);
      //  if (err.response && err.response.status === 409) {
      //   setSuccessMessage('Record already exists!');
      // } else {
      //   // For other errors, use the error from the hook
      //   setSuccessMessage(err.message || 'An error occurred');
      // }
      
      // Error is already handled by the hook and will be displayed
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: '#dc3545' 
    }}>
      <form className='create-agent-form' onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name} 
            name="name"
            onChange={handleChange}
            placeholder="Enter agent name"
             required = 'Agent name is required'
     //     minLength = { value= 3  message= 'Minimum 3 characters' }
          />
        </label>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Agent...' : 'Submit'}
        </button>
        
        {/* ✅ Success Message */}
        {successMessage && (
          <div style={{ 
            color: 'green', 
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f0fff0',
            border: '1px solid #00ff00',
            borderRadius: '4px'
          }}>
            ✅ {successMessage}
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div style={{ 
            color: 'red', 
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#fff0f0',
            border: '1px solid #ff0000',
            borderRadius: '4px'
          }}>
            {error.includes('Request failed with status code 409') ? '⚠️ Record Already exist' : '❌'} 
          </div>
        )}
      </form>
    </div>
  );

}

export default CreateAgent;