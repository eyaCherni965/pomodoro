
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './composants/Timer';
import Statistiques from './composants/Statistiques';
import Pause from './composants/Pause';
import Parametre from './composants/Parametre';


function App() {
  return (
    <div>
   <Router>
  <Routes>
    <Route path="/" element={<Timer />} />
    <Route path="/stats" element={<Statistiques />} />
    <Route path="/pause" element={<Pause />} />
    <Route path="/parametre" element={<Parametre />} />
  </Routes>
</Router>
  </div>
  
  );
}

export default App;

