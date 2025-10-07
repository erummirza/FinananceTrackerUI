import { useState, useEffect } from 'react';
import { agentService } from '../services/agentService';

export const useAgentById = (agentId) => { // ✅ Fixed: Remove default value
  const [agent, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('useAgents hook called with agentId:', agentId);

  // ✅ Fixed: Remove parameter or use different name
  const fetchAgentsByID = async (id = agentId) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🟡  Fetching agent with ID:', id);
      const data = await agentService.getAgentById(id);
      //console.log(data)
      console.log('🟢 Agent data received:', data);
      setAgents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching agent by ID:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🟠 useEffect triggered with agentId:', agentId);
    if (agentId) {
      fetchAgentsByID(agentId);
    } else {
      console.log('No agentId provided, skipping fetch');
      setLoading(false);
    }
  }, [agentId]);

  return {
    agent,
    loading,
    error,
    refetch: () => fetchAgentsByID(agentId), // ✅ Correct
  };
};