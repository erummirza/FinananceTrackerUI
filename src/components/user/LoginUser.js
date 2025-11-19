// File: loginUser.js
import React, { useState } from 'react';
import userServices from '../../services/userServices';

const LoginUser = () => {
  const [formData, setFormData] = useState({
    userId: '', 
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (successMessage || errorMessage) {
      setSuccessMessage('');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      // First try normal login
      console.log("🔄 Attempting normal login...");
      const result = await userServices.login(formData);
      console.log("✅ Login successful:", result);
      
      // Show success message
      setSuccessMessage(result.message || 'Login successful!');
      
      // Store user data if token exists
      if (result.token || result.userId) {
        localStorage.setItem('user', JSON.stringify(result));
        console.log("💾 User data stored");
      }
      
      // Reset form after success
      setFormData({ 
        userId: '', 
        password: '' 
      });
      
    } catch (err) {
      console.error("❌ Normal login failed:", err.message);
      
      // If normal login fails with 400, try different payload formats
      if (err.message.includes('400') || err.message.includes('Invalid request format')) {
        console.log("🔄 Trying different payload formats...");
        try {
          const result = await userServices.loginWithDifferentFormats(formData);
          console.log("✅ Login successful with alternative format:", result);
          
          setSuccessMessage(result.message || 'Login successful!');
          
          if (result.token || result.userId) {
            localStorage.setItem('user', JSON.stringify(result));
          }
          
          setFormData({ userId: '', password: '' });
          
        } catch (formatError) {
          console.error("❌ All login attempts failed:", formatError.message);
          setErrorMessage(formatError.message || 'Login failed. Please check your credentials.');
        }
      } else {
        // Handle other errors
        if (err.message.includes('401') || err.message.includes('Invalid credentials')) {
          setErrorMessage('Invalid user ID or password. Please try again.');
        } else if (err.message.includes('Network error') || err.message.includes('unable to connect')) {
          setErrorMessage('Unable to connect to server. Please check if the server is running.');
        } else if (err.message.includes('404')) {
          setErrorMessage('User not found. Please check your user ID.');
        } else {
          setErrorMessage(err.message || 'Login failed. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: '#dc3545' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: '#333'
      }}>
        User Login
      </h2>
      
       <form className='create-agent-form' onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            User ID:
          </label>
          <input
            type="text"
            name="userId"
            placeholder="Enter your user ID"
            value={formData.userId}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            required
            disabled={isLoading}
          />
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            required
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isLoading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Success Message */}
        {successMessage && (
          <div style={{ 
            color: 'green', 
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f0fff0',
            border: '1px solid #00ff00',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            ✅ {successMessage}
          </div>
        )}
        
        {/* Error Message */}
        {errorMessage && (
          <div style={{ 
            color: 'red', 
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#fff0f0',
            border: '1px solid #ff0000',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            ❌ {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginUser;