import { useState, useEffect } from 'react';
import { agentService } from '../services/agentService';

export const useAgents = (agentId = null) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //console.log(' useAgents hook called with agentId:', agentId);
 // console.trace();

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await agentService.getAllAgents();
      setAgents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentsByID = async (id = agentId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await agentService.getAgentById(id);
      // If getAgentById returns a single agent, wrap it in an array
      setAgents(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching agent by ID:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //if (agentId) {
   ///   fetchAgentsByID(agentId); // Fetch specific agent by ID
  //  } else {
      fetchAgents(); // Fetch all agents when agentId is null/undefined
  //  }
  }, []); // Re-run when agentId changes

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
   // refetchByID: fetchAgentsByID
  };
};