// authService.js
const API_URL = 'http://localhost:5227/api/User';

const authService = {
  async login(email, password) {
    try {
      console.log('🔐 Attempting login for:', email);
      
      // Add timeout to avoid hanging requests
    //   const controller = new AbortController();
    //   const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }),
        signal: controller.signal
      });

//      clearTimeout(timeoutId);

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      if (!response.ok) {
        let errorMessage = 'Login failed';
        
        try {
          const errorData = await response.text();
          console.log('❌ Error response:', errorData);
          errorMessage = errorData || `Server error: ${response.status}`;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        if (response.status === 401) {
          throw new Error('Invalid email or password');
        }
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error(errorMessage);
      }

      const user = await response.json();
      console.log('✅ Login successful:', user);
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return user;
    } catch (error) {
      console.error('💥 Login error details:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Server is not responding');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please check if the API is running.');
      }
      if (error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection.');
      }
      
      throw error;
    }
  },

  // ... other methods remain the same
};

export default authService;