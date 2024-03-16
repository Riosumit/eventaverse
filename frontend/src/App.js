import './App.css';
import Event from './components/event/Event';
import LoginUser from './components/login/LoginUser';
import Signup from './components/signup/Signup';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Likes from './components/Likes/Likes'
import Main from './components/main/Main';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element = {<Main/>} />
        <Route path='/login' element = {<LoginUser/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/event' element = {<Event/>} />
        <Route path='/likes' element = {<Likes/>} />
      </Routes>
      {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
