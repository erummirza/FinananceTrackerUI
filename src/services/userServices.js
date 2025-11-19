// userServices.js
import axios from 'axios';

const API_URL = 'http://localhost:5227/api/User';

const userServices = {
  async login(userData) {
    try {
      console.log('🔐 Attempting login for:', userData);
      
      // Ensure proper field names - try different variations
      const payload = {
        // Try different field name combinations
        userID: userData.userId,
        userId: userData.userId,
        username: userData.userId,
        email: userData.userId,
        password: userData.password,
      };

      console.log("📤 Sending payload to API:", payload);
      
      // Use axios with better error handling
      const response = await axios.post(`${API_URL}/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Don't throw on 400 errors - handle them manually
        validateStatus: function (status) {
          return status < 500; // Resolve only if status code is less than 500
        }
      });

      console.log("📥 Response status:", response.status);
      console.log("📥 Response data:", response.data);

      // Handle 400 Bad Request specifically
      if (response.status === 400) {
        console.log("⚠️ 400 Bad Request - checking response content");
        
        // If 400 but contains success message, treat as success
        if (response.data && 
            (response.data.message?.toLowerCase().includes('success') ||
             response.data.message?.toLowerCase().includes('welcome') ||
             response.data.success === true)) {
          console.log("✅ Login successful despite 400 status");
          return response.data;
        } else {
          // It's a real 400 error
          throw new Error(response.data?.message || 'Invalid request format. Please check your input.');
        }
      }

      // Handle 401 Unauthorized
      if (response.status === 401) {
        console.log("⚠️ 401 Unauthorized - checking response content");
        if (response.data && response.data.message?.toLowerCase().includes('success')) {
          console.log("✅ Login successful despite 401 status");
          return response.data;
        } else {
          throw new Error(response.data?.message || 'Invalid credentials');
        }
      }

      // Normal success cases (200, 201)
      if (response.status === 200 || response.status === 201) {
        console.log("✅ Login successful");
        return response.data;
      }

      // If we reach here, it's an unexpected status
      throw new Error(response.data?.message || `Login failed with status ${response.status}`);

    } catch (error) {
      console.error("❌ Login failed in service:", error);
      
      // Handle network errors
      if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        throw new Error('Unable to connect to server. Please check if the server is running.');
      }
      
      throw error;
    }
  },

  // Test different payload formats
  async loginWithDifferentFormats(userData) {
    const payloads = [
      { userID: userData.userId, password: userData.password },
      { userId: userData.userId, password: userData.password },
      { username: userData.userId, password: userData.password },
      { email: userData.userId, password: userData.password },
      { UserID: userData.userId, Password: userData.password },
      { UserName: userData.userId, Password: userData.password },
    ];

    for (let i = 0; i < payloads.length; i++) {
      try {
        console.log(`🔄 Trying payload format ${i + 1}:`, payloads[i]);
        const response = await axios.post(`${API_URL}/login`, payloads[i], {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: function (status) {
            return status < 500;
          }
        });

        if (response.status === 200 || response.status === 201) {
          console.log(`✅ Success with format ${i + 1}`);
          return response.data;
        }

        // Check if 400/401 but successful
        if ((response.status === 400 || response.status === 401) && 
            response.data?.message?.toLowerCase().includes('success')) {
          console.log(`✅ Success with format ${i + 1} (special status)`);
          return response.data;
        }

      } catch (error) {
        console.log(`❌ Format ${i + 1} failed:`, error.message);
        // Continue to next format
      }
    }

    throw new Error('All login attempts failed. Please check your credentials and try again.');
  },

  // ... other methods (register, logout, etc.)
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('User with this email already exists');
        }
        throw new Error('Registration failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user;
  }
};

export default userServices;