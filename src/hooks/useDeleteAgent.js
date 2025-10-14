import { agentService } from "../services/agentService";
import { useState } from "react";

export const useDeleteAgent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAgent = async (agentId) => {
        console.log("id issssssssssssssssssss" + agentId)
                setIsLoading(true);

        setError(null);
        
        try {
            console.log("Deleting agent:", agentId);
            await agentService.deleteAgent(agentId);
            // You might want to return success status or updated data
            return { success: true };
        } catch (err) {
            setError(err.message);
            console.error("Error deleting agent:", err);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteAgent,
        isLoading,
        error
    };
};

export default useDeleteAgent;