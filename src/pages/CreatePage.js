import React, { useState } from 'react';
//import { useAddAgent } from '../hooks/useAddAgent';
import CreateAgent from '../components/agents/CreateAgent';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    agentName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({

      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.agentName.trim()) {
      newErrors.agentName = 'Agent name is required';
    } else if (formData.agentName.trim().length < 2) {
      newErrors.agentName = 'Agent name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  return (
 <CreateAgent></CreateAgent>
    
  );
};

export default CreatePage;