import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AgentsPage from './pages/AgentsPage';
import AgentByIDPage from './pages/AgentByIDPage';
import CreatePage from './pages/CreatePage';
import './App.css';
import Header from  './pages/Header'
import './styles/agent.css';


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
    <form onSubmit={handleSearch} 
    // style={{ display: 'flex', gap: '10px' }}
    >
      <input className='form-input'
        type="text"
        placeholder="Search agents by ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // style={{
        //   padding: '8px 12px',
        //   borderRadius: '4px',
        //   border: 'none',
        //   minWidth: '250px'
        // }}
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
  return (
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
                Agents
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
            <Route path="/" element={
              <Header/>
      //         <div>
      //           <h1>Welcome to Finance Tracker</h1>
      //           <p>Select "Agents" from the navigation to manage your agents.</p>
      //        <div style={{ marginBottom: '30px' }}>
      //   <h1 style={{ color: '#333', marginBottom: '10px' }}>Agents Management</h1>
      //   <p style={{ color: '#666', margin: 0 }}>
      //     Manage and view all agents in the system
      //   </p>
      // </div>
      //         </div>
            } />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agent/:agentId" element={<AgentByIDPage />} /> 
           <Route path="/createpage" element={<CreatePage />} /> 
          </Routes>
        </main>
<div>


</div>

      </div>
    </Router>
  );
}

export default App;