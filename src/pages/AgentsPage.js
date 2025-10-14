import React from 'react';
import { useAgents } from '../hooks/useAgents';
import AgentList from '../components/agents/AgentList';
import AgentByID from '../components/agents/AgentByID';
import DebugConnection from '../components/DebugConnection'; // Add this
import { useAgentById } from '../hooks/useAgentById';
import Header from './Header';


const AgentsPage = () => {
  console.log("in agent page where useagents before")
  const { agents, loading, error, refetch } = useAgents();
 // const { agentsByID, loading, error,refetchByID } = useAgentById();

  // Add this to see what's happening in console
  console.log('Agents Page state:', { agents, loading, error });

  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h1>
        <p style={{ color: '#666', margin: 0 }}>
          Manage and view all agents in the system
        </p>
      </div> */}
<div>
  
</div>
      {/* Add debug component */}
      {error && <DebugConnection />}
{/* <AgentByID 

 agents={agents} 
        loading={loading} 
        error={error} 
        onRefresh={refetch}>

        </AgentByID> */}
        <Header/>
      <AgentList 
        agents={agents} 
        loading={loading} 
        error={error} 
        onRefresh={refetch}
         // Pass the handler here
      />
    </div>
  );
};

export default AgentsPage;