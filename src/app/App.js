import { Routes, Route,  } from "react-router-dom";

import Account from "../pages/account";

function App() {
  // toast.success("jurray")
  
  return (
    <>
<Routes>
       <Route path="/" element={<Account />} exact />
      
    </Routes>
    </>
    
  );
}

export default App;
