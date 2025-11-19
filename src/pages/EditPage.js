import React from 'react';
import EditAgent from '../components/agents/EditAgent';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useAgentById } from '../hooks/useAgentById';

import DebugConnection from '../components/DebugConnection';
const EditPage = () => {
  const { id } = useParams();
   const { agent, loading, error, refetch } = useAgentById(id);
    console.log("Is agent null?", agent === null);
  console.log("Is agent undefined?", agent === undefined);
//    console.log("Does agent exist?", !!agent);
 //  console.log("agent ===",agent )
  
    console.log("Agent ID:", agent?.id);


  console.log("Agent Name:", agent?.agentName);
 
console.log(id)
console.log("agent hereeeeeeeeeeeee " +agent)
return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h1>
        <p style={{ color: '#666', margin: 0 }}>
          Manage and view all agents in the system
        </p>
      </div>

      {/* Add debug component */}
      {error && <DebugConnection />}
  <EditAgent
        agent={agent} 
        loading={loading} 
        error={error} 
        onRefresh={refetch}
      />
      
    </div>
  );
}

export default EditPage;