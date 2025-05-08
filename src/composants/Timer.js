import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Timer() {
  const navigate = useNavigate();
  const [tempsRestant, settempsRestant] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [etat, setEtat] = useState("");


  const formatTemps = (totalSecondes) => {
    const minutes = Math.floor(totalSecondes / 60);
    const seconde = totalSecondes % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconde
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval = null;

    if (isRunning && tempsRestant > 0) {
      interval = setInterval(() => {
        settempsRestant((prev) => prev - 1);
      }, 1000);
    } 
    else {
      clearInterval(interval);
      if(isRunning && tempsRestant==0){
        enregistrerSession();
              }
    }

    return () => clearInterval(interval);
  }, [isRunning, tempsRestant]);

  const handleDemarrer = () => {
    setIsRunning(true);
    setEtat("demarrer");
  };

  const handlePause = () => {
    setIsRunning(false);
    setEtat("pause");
  };

  const handleReset = () => {
    setIsRunning(false);
    settempsRestant(1500);
    setEtat("reset");
  };

function enregistrerSession(){
const sessions=  localStorage.getItem("nbSessions");
let sessionNb=parseInt(sessions);

if(isNaN(sessionNb)){

  sessionNb=0;
}
sessionNb++;
localStorage.setItem("nbSessions",sessionNb);



}


  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-center gap-10">
  
      <p className="text-blue-700 font-semibold mb-4 absolute top-10 left-10 text-1xl sm:text-2xl">
        Concentre-toi. Respire. Progresse.
      </p>

      <div className="absolute top-10 right-10 flex gap-4">
        <button className="bg-violet-500 px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300">
          <img src="/parametres.png" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => navigate("/stats")}
          className="text-xs sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-violet-500 text-white px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          Statistiques
        </button>
      </div>

      {/* Cercle du timer */}
      <div className="w-64 h-64 rounded-full border-8 shadow-xl border-violet-500 flex items-center justify-center shadow-md">
        <span className="text-4xl font-bold text-violet-600">
          {formatTemps(tempsRestant)}
        </span>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDemarrer}
          className={`shadow-xl ${
            etat === "demarrer" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300`}
        >
          Démarrer
        </button>

        <button
          onClick={handlePause}
          className={`shadow-xl ${
            etat === "pause" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300`}
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          className={`shadow-xl ${
            etat === "reset" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300`}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}

export default Timer;
