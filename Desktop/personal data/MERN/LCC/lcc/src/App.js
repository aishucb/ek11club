import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


import Helloworld from './components/Helloworld';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Helloworld />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;