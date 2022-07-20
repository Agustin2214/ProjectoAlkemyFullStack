import './App.css';
import { Routes, Route } from "react-router-dom";
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Home } from './Components/Home/Home';
import { Balance } from './Components/Balance/Balance';
import './App.css';
import { AtmEdit } from './Components/AtmEdit/AtmEdit';
import { PostAtm } from './Components/PostAtm/PostAtm';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Balance' element={<Balance/>}/>
        <Route path='/edit/:id' element={<AtmEdit/>}/>
        <Route path='/post' element={<PostAtm/>}/>
   </Routes>
    </div>
  );
}

export default App;





