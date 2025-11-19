import React from 'react';
import { useAgents } from '../hooks/useAgents';
import AgentList from '../components/agents/AgentList';
import AgentByID from '../components/agents/AgentByID';
import DebugConnection from '../components/DebugConnection'; // Add this
import { useAgentById } from '../hooks/useAgentById';
import Header from './Header';
import { useState } from 'react';
import { agentService } from '../services/agentService';
import { useEffect } from 'react';

// In your parent component (e.g., AgentsPage.js)
const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAgents = async (page = 1, pageSize = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await agentService.getAgentsWithPagination(page, pageSize);
      setAgents(response.data);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   const fetchAllAgents = async (page = 1, pageSize = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await agentService.getAgentsWithPagination(page, pageSize);
      setAgents(response.data);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <AgentList
        agents={agents}
        loading={loading}
        error={error}
        totalCount={totalCount}
        onRefresh={fetchAgents}
      />
    </div>
  );
};
export default AgentsPage;