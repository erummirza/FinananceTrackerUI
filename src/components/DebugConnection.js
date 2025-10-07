import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebugConnection = () => {
  const [errorDetails, setErrorDetails] = useState(null);
  const [responseInfo, setResponseInfo] = useState(null);

  const testConnection = async () => {
    try {
      console.log('Testing connection to: https://localhost:7043/api/agents');
      
      const response = await axios.get('https://localhost:7043/api/agents', {
        timeout: 5000
      });
      
      setResponseInfo({
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      setErrorDetails(null);
      
    } catch (error) {
      console.error('Full error object:', error);
      
      setErrorDetails({
        message: error.message,
        code: error.code,
        responseStatus: error.response?.status,
        responseData: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method
        }
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', border: '2px solid #dc3545', margin: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#dc3545' }}>🔍 Connection Debugger</h3>
      
      <button onClick={testConnection} style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px'
      }}>
        Test Connection Again
      </button>

      {errorDetails ? (
        <div>
          <h4>❌ Error Details:</h4>
          <div style={{ backgroundColor: '#f8d7da', padding: '15px', borderRadius: '4px' }}>
            <p><strong>Message:</strong> {errorDetails.message}</p>
            <p><strong>Error Code:</strong> {errorDetails.code && errorDetails.code === 404 ? 'Record not found' : errorDetails.code || 'N/A'}
            </p>
            <p><strong>HTTP Status:</strong> {errorDetails.responseStatus || 'N/A'}</p>
            <p><strong>URL:</strong> {errorDetails.config?.url}</p>
            <p><strong>Method:</strong> {errorDetails.config?.method}</p>
            
            {errorDetails.responseData && (
              <div>
                <strong>Response Data:</strong>
                <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
                  {JSON.stringify(errorDetails.responseData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      ) : responseInfo ? (
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '4px' }}>
          <h4>✅ Connection Successful!</h4>
          <p><strong>Status:</strong> {responseInfo.status} {responseInfo.statusText}</p>
          <p><strong>Data Received:</strong> {responseInfo.data.length} items</p>
        </div>
      ) : (
        <p>Testing connection...</p>
      )}
    </div>
  );
};

export default DebugConnection;