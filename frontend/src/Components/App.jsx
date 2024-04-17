import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
