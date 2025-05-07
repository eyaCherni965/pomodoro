

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timer from './composants/Timer';
import Statistiques from './composants/Statistiques';


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Timer/>}> </Route>
      <Route path="/stats" element={<Statistiques/>}> </Route>
    </Routes>
    </BrowserRouter>
  </div>
  
  );
}

export default App;

