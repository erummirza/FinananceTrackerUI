import React from 'react';
import { useAgentById } from '../hooks/useAgentById';
import AgentByIDComponent from '../components/agents/AgentByID';
import DebugConnection from '../components/DebugConnection';
import { useParams } from 'react-router-dom';
import AgentList  from '../components/agents/AgentList';
import { useState, useEffect } from 'react';
import AgentByID from '../components/agents/AgentByID';
//import useAgentById from '../hooks/useAgentById';

// ✅ Main component
const AgentByIDPage = () => {
  const { agentId } = useParams(); // Get the agentId from URL
  
  // FIXED: Use backticks for template literals
  console.log('Agent ID from AgentIdbyPage:', agentId);
  //console.log("FDFDFDFFFFFFFFFFFFFFF");
  
  const { agent, loading, error, refetch } = useAgentById(agentId);
 console.log("error is " + error)
// useEffect(() => {
//     refetch(); // Call only when needed
//   }, []);

  // const { agent, loading, error } = useAgentById(agentId);
//   console.log("agentid in hook  " ,agentId)
  console.log("Is agent null?", agent === null);
  console.log("Is agent undefined?", agent === undefined);
//    console.log("Does agent exist?", !!agent);
 //  console.log("agent ===",agent )
  
    console.log("Agent ID:", agent?.id);


  console.log("Agent Name:", agent?.agentName);
  //console.log("use agent by id hook called");

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h1>
        <p style={{ color: '#666', margin: 0 }}>
          Manage and view all agents in the system
        </p>
      </div>
<div>
  
</div>
      {/* Add debug component */}
      {error && <DebugConnection />}
  <AgentByID
        agent={agent} 
        loading={loading} 
        error={error} 
        onRefresh={refetch}
      />
      
    </div>
  );
}
export default AgentByIDPage;