import { useState, useEffect } from 'react';
import { agentService } from '../services/agentService';

export const useAddAgent = (formData) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(' useAddAgents hook called with agenttname :', formData.agentName);
 // console.trace();

 

  

  
  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
   // refetchByID: fetchAgentsByID
  };
};