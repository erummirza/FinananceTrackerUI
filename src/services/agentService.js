import axios from 'axios';

const API_BASE_URL = 'http://localhost:5227/api/Agents';

export const agentService = {
  // Get all agents
  getAllAgents: async () => {
    try {
      console.log("getAllagents");
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  },

  // Get single agent by ID
  getAgentById: async (agentId) => {
    try {
      console.log("🔍 getAgentById called with agentId:", agentId);
      
      if (!agentId) {
        throw new Error("Agent ID is required");
      }
      
      const response = await axios.get(`${API_BASE_URL}/${agentId}`);
      console.log("🧪 TEST: Success! Data:", response.data);
      return response.data;
    } catch (error) {
      console.log("🧪 TEST: Failed with error:", error.message);
      throw error;
    }
  },

  // Add agent
  addAgent: async (agentData) => {
    try {
      console.log("➕ addAgent called with data:", agentData);
      
      const agentName = agentData.name || agentData.Name || agentData.agentName;
      console.log("🔍 Found agent name:", agentName);
      
      if (!agentData || !agentName) {
        console.log("❌ No agent name found in:", agentData);
        throw new Error("Agent name is required");
      }

      const payload = {
        agentName: agentName
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
        console.error("Conflict error:", error.response.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw error;
    }
  },

  // Delete agent
  deleteAgent: async (agentId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${agentId}`);
      console.log("🗑️ deleteAgent called with agentId:", agentId);
      console.log("🧪 TEST: Success! Data:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  },

  // Edit agent
  editAgent: async (agentData) => {
    try {
      console.log("Updating agent with ID:", agentData.id);
      console.log("Updating agent with name:", agentData.agentName);
      
      const updateData = {
        id: agentData.id,
        agentName: agentData.agentName,
        createdDate: agentData.createdDate,
      };
      
      const response = await axios.put(`${API_BASE_URL}/${agentData.id}`, updateData);
      console.log("✅ Agent updated successfully!");
      console.log(response.status);
      
      return response.data;
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  },

  // ✅ FIXED: Consistent pagination method using axios
// services/agentService.js
getAgentsWithPagination: async (page = 1, limit = 10, searchParams = {}) => {
  try {
    console.log(`📡 Fetching agents with pagination: page=${page}, limit=${limit}`);
    
    // First, get ALL agents from the API
    const allAgents = await agentService.getAllAgents();
    console.log(`📦 Total agents from API: ${allAgents.length}`);
    
    // Apply client-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Apply search filters if provided
    let filteredAgents = allAgents;
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase();
      filteredAgents = allAgents.filter(agent => 
        agent.agentName?.toLowerCase().includes(searchTerm) ||
        agent.email?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Get the paginated slice
    const paginatedData = filteredAgents.slice(startIndex, endIndex);
    
    console.log(`📊 Pagination result: Showing ${paginatedData.length} of ${filteredAgents.length} agents`);
    
    return {
      success: true,
      data: paginatedData,
      totalCount: filteredAgents.length,
      currentPage: page,
      totalPages: Math.ceil(filteredAgents.length / limit),
      hasNextPage: endIndex < filteredAgents.length,
      hasPrevPage: page > 1
    };
    
  } catch (error) {
    console.error('Error in pagination:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      totalCount: 0,
      currentPage: page,
      totalPages: 0
    };
  }
}
};