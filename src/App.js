import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from './pages/Cards';
import AddCard from './pages/AddCard';
import { fetchRandomUserInfo } from "./redux/cardSlice";
import { useEffect } from "react";
import "./App.css";

function App() {
 const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRandomUserInfo());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cards />}/>
        <Route path="/cards" element={<Cards />}/>
        <Route path="/addcard" element={<AddCard/>}/>
      </Routes>
    </div>
  );
}

export default App;
