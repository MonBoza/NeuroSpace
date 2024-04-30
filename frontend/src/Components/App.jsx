import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Home from "./Home";
import "../input.css"
import TopicForm from "./Forum/TopicForm";
import ForumList from "./Forum/ForumList";
import Resource from "./Resource";
import Footer from "./Footer";
import Nav from "./Header";
import EditProfileForm from "./EditProfileForm";


function App() {
  return (
    <BrowserRouter> 
    <Nav/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/topicForm" element={< TopicForm/>}/>
          <Route path="/forumList" element={< ForumList/>}/>
          <Route path="/Resources" element={<Resource />} />
          <Route path="/editProfile" element={<EditProfileForm />} />
          
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
