import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Agents'; // Your API URL

export const agentService = {
  // Get all agents
  getAllAgents: async () => {
    try {
      console.log("getAllagents")
      const response = await axios.get(`${API_BASE_URL}`); // Remove /api/agents
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

  }
};