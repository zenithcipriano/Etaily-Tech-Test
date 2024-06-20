import Signup from "./pages/Signup";
import Users from "./pages/Users";
import { BrowserRouter, Routes, Route } from 'react-router-dom';  

function App() {

  return (
    <div className="App" style={{height: "100%"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Users /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/*" element={ < Navigate to="/"/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
