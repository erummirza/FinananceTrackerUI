import { agentService } from "../services/agentService";
import { useState } from "react";

export const useAddAgent = () => {
  console.log("in use add agent")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ Add error state
  
  const addAgent = async (formData) => {
    console.log("Form data received:", formData);
    setIsLoading(true);
    setError(null); // ✅ Reset error on new request
    
    try {
      console.log("i im in try block")
      
      // ✅ CORRECT: Use agentService which handles the API call
      const result = await agentService.addAgent(formData);
      console.log("✅ Agent added successfully: in hook", result);
      
      return result; // ✅ Return the result
      
    } catch (err) {
      console.error('API call failed:', err);
      setError(err.message); // ✅ Set error state
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  //console.log ("just beforeeeeeeeeeeeeeeee"+ result);
  return { addAgent, isLoading, error  }; // ✅ Return error too
};