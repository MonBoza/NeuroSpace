import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import UserProfile from "./UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* <Route path="/forum" element={<Forum/>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
