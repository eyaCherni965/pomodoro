
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './composants/Timer';
import Statistiques from './composants/Statistiques';
import Pause from './composants/Pause';
import Parametre from './composants/Parametre';
import { useEffect } from 'react'; 

//fonction qui sert a déterminer numero de semaine dans l'année pour une date donnée,=>je vais l'utiliser pour mon useEffect de App()
function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisInDay = 86400000;
  return Math.ceil(((date - onejan) / millisInDay + onejan.getDay() + 1) / 7);
}

function App() {

  //ajout d'un useEffect pour rafraichir les données a chaque semaine 
  useEffect(() => {
  const maintenant = new Date();
  const semaineActuelle = `${maintenant.getFullYear()}-W${getWeekNumber(maintenant)}`;
  const semaineEnregistree = localStorage.getItem("derniereSemaine");

  if (semaineEnregistree !== semaineActuelle) {
    // Nouvelle semaine donc on remet les données à zéro
    localStorage.setItem("nbSessions", "0");
    localStorage.setItem("sessionsParJours", JSON.stringify({
      "Dim": 0,
      "Lun": 0,
      "Mar": 0,
      "Mer": 0,
      "Jeu": 0,
      "Ven": 0,
      "Sam": 0
    }));
    localStorage.setItem("derniereSemaine", semaineActuelle);
  }
}, []);

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

