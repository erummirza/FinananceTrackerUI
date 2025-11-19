import { agentService } from "../services/agentService";
import { useState } from "react";

export const useEditAgent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAgent = async (agentId, updatedData) => {
console.log("agent issssssssssssssssssss" + updatedData)
                setIsLoading(true);

        setError(null);
        
        try {
          // console.log("Editing agent:", agentId);
            //await agentService.getAgentById(agentId);
                   const existingAgent = await agentService.getAgentById(agentId);
console.log("Existing agent data:", existingAgent);
            // 2. Merge with updated fields
            const completeAgent = {
                ...existingAgent,
                ...updatedData,
                createdDate: existingAgent.createdDate,  // This will override only the provided fields
            };
            console.log("Complete agent data to be sent:", completeAgent);
            // 3. Send complete agent to API
            await agentService.editAgent(completeAgent);

            // You might want to return success status or updated data
            return { success: true };
        } catch (err) {
            setError(err.message);
            console.error("Error Editing agent:", err);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateAgent,
        isLoading,
        error
    };
};

export default useEditAgent;