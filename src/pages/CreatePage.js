import React, { useState } from 'react';
//import { useAddAgent } from '../hooks/useAddAgent';
import CreateAgent from '../components/agents/CreateAgent';
import Header from './Header';
const CreatePage =() => {

 return (
   <div>
        <Header/>
    
    <CreateAgent/></div>
  );
}
export default CreatePage;