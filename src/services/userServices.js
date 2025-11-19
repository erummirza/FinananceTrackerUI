// authService.js - Clean version without controller
const API_URL = 'http://localhost:5227/api/User';

const authService = {
  async login(email, password) {
    try {
      console.log('🔐 Attempting login for:', email);
      console.log('📤 URL:', `${API_URL}/login`);
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }),
      });

      console.log('📡 Response status:', response.status);

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
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the API is running on http://localhost:5227');
      }
      
      throw error;
    }
  },

  // Register user
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

  // Logout user
  logout() {
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user;
  }
};

export default authService;