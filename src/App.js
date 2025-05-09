
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timer from './composants/Timer';
import Statistiques from './composants/Statistiques';
import Pause from './composants/Pause';
import Parametre from './composants/Parametre';


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Timer/>}> </Route>
      <Route path="/stats" element={<Statistiques/>}> </Route>
       <Route path="/pause" element={<Pause/>}> </Route>
        <Route path="/parametre" element={<Parametre/>}> </Route>
    </Routes>
    </BrowserRouter>
  </div>
  
  );
}

export default App;

