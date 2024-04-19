import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Home from "./Home";
import "../input.css"
import TopicForm from "./Forum/TopicForm";

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/topicForm" element={< TopicForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
