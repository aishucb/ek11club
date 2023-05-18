import './App.css';
import { useEffect, useState } from "react";
import Helloworld from './components/helloWorld';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://ek11.onrender.com")
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  

  return (
    <div className="App">
       <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Helloworld />} />
          </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;