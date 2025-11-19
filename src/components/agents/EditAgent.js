import '../../App.css';
import { useState, useEffect } from 'react'; // Import useEffect
import useEditAgent from '../../hooks/useEditAgent';

 
 const EditAgent = ({ agent, loading, error, onRefresh }) => {
 const { updateAgent, isLoading, errorupdate } = useEditAgent();
  // Initialize with database value
  const [formData, setFormData] = useState({
    name: agent?.agentName || '' // This gets the previous value from database
  });

  // ✅ Add this useEffect to update formData when agent prop changes
  useEffect(() => {
    console.log("calling useeffect")
    if (agent?.agentName) {
      setFormData(prev => ({
        ...prev,
        name: agent.agentName
      }));
    }
  }, [agent]); // This runs whenever the agent prop changes

  const handleChange = (event) => {
    setFormData(prev => ({
      ...prev,
      name: event.target.value
    }));
  };

const handleSubmit = async (event) => {
  
    event.preventDefault();
    console.log("Form submitted!");
    console.log("Form data:", formData);
    console.log("createddate//////////////"+ agent.createdDate);
    // Clear previous messages
  //  setSuccessMessage('');
    
    try {
  await updateAgent(agent.id, {
      agentName: formData.name,
//createdDate: agent.createdDate,
//createdDate: agentData.createdDate,
      // Only include fields you want to update
    });
      
      // ✅ Show success message when no error
      //setSuccessMessage('Record added successfully!');
     // console.log("✅ Agent added successfully!");
      
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
    <div>
      <h3>Edit Agent Form</h3>
      
      {/* Show loading state */}
      {loading && <p>Loading agent data...</p>}
      
      <form className='create-agent-form' onSubmit={handleSubmit}>
        <label>
          Name: 
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          Update
        </button>
      </form>
      
      {/* Debug info */}
      <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
        <p>Agent prop: {JSON.stringify(agent)}</p>
        <p>Database value: {agent?.agentName}</p>
        <p>Current form value: {formData.name}</p>
      </div>
    </div>
  );
}

export default EditAgent;