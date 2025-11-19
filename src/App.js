import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AgentsPage from './pages/AgentsPage';
import AgentByIDPage from './pages/AgentByIDPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import './App.css';
import Header from './pages/Header';
import './styles/agent.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';

// Create a search component that can use useNavigate
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to agent page with search query as parameter
      navigate(`/agent/${searchQuery}`);
      // Clear the input
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        className='form-input'
        type="text"
        placeholder="Search agents by ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </form>
  );
}

function App() {
  console.log("App component is running");
  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Navigation */}
          <nav style={{
            backgroundColor: '#343a40',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px'
            }}>
              {/* Left Side - Navigation Links */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link 
                  to="/" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Home
                </Link>
                <Link 
                  to="/agents" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  agents
                </Link>
                <Link 
                  to="/login" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Login
                </Link>
              </div>

              {/* Right Side - Search Bar */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchBar />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/agent/:agentId" element={<AgentByIDPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createpage" element={<CreatePage />} />
              <Route path="/editpage/:id" element={<EditPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;