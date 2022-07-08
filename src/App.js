import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import Homepage from "./pages/Homepage";
import POS from "./pages/POS";

function App(){
    
    return(
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/pos" element={<POS/>}/>
        </Routes>
    </Router>
        
      
    )

}

export default App