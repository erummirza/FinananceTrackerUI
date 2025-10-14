import React from "react";
import AgentsPage from "./AgentsPage";
import { useAgents } from "../hooks/useAgents";
import AgentList from "../components/agents/AgentList";
 
function Refresh() {

    return  (
      
      <div>
      {/* <button 
          onClick={onRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh
        </button> */}
        </div>
      );
    }
    export default Refresh;