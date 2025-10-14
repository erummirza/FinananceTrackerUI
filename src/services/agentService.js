import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Agents'; // Your API URL

export const agentService = {
  // Get all agents
  getAllAgents: async () => {
    try {
      console.log("getAllagents")
      const response = await axios.get(`${API_BASE_URL}`); // Remove /api/agents
    //  console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  },

  // Get single agent by ID
  getAgentById: async (agentId) => {
   try {
          console.log("🔍 [1] getAgentById called with agentId:", agentId, "Type:", typeof agentId);
      
      // Validate agentId
      if (!agentId) {
        throw new Error("Agent ID is required");
      }
      
      const url = `${API_BASE_URL}/${agentId}`;
      console.log("🔍 [2] Making request to:", url);
      
    console.log("🧪 TEST: Direct API call with agentId:", agentId);
    const response = await axios.get(`${API_BASE_URL}/${agentId}`);
    console.log("🧪 TEST: Success! Data:", response.data);
    return response.data;
  } catch (error) {
    console.log("🧪  TEST: Failed with error:", error.message);
    throw error;
  }

  },

addAgent: async (agentData) => {
  try {
    console.log("➕ addAgent called with data:", agentData);
    console.log("🔍 ALL agentData properties:", agentData);
    
    // Check for different possible property names
    console.log("🔍 agentData.name:", agentData.name);        // ✅ Fixed - added .name
    console.log("🔍 agentData.Name:", agentData.Name);        // ✅ Fixed - added .Name  
    console.log("🔍 agentData.agentName:", agentData.agentName); // ✅ Fixed - added .agentName
    
    // TEMPORARY: Use whichever property exists
    const agentName = agentData.name || agentData.Name || agentData.agentName;
    console.log("🔍 Found agent name:", agentName);
    
    if (!agentData || !agentName) {
      console.log("❌ No agent name found in:", agentData);
      throw new Error("Agent name is required");
    }

    // ✅ FIX: Send agentName (the string), not agentData (the object)
    const payload = {
      agentName: agentName  // ✅ CORRECT - just the string value
    };

    console.log("📤 Sending payload to API:", payload);
    const response = await axios.post(`${API_BASE_URL}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("✅ Agent added successfully:", response.data);
    return response.data;
    
  } catch (error) {
     if (error.response && error.response.status === 409) {
        // Display a specific message for conflict, e.g., "Username already exists."
        console.error("Conflict error:", error.response.data);
        // Update UI to show error message
      } else {
        // Handle other types of errors
        console.error("An unexpected error occurred:", error);
      }
    throw error;
  }
},

 deleteAgent: async (agentId) => {
  try {
     const response = await axios.delete(`${API_BASE_URL}/${agentId}`);
    console.log("🧪 TEST: Success! Data:", response.data);
    console.log("🗑️ deleteAgent called with agentId:", agentId) ;

//getAllAgents() ;
 }
 catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
 }
};