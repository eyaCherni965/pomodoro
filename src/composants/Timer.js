import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Timer() {
  const navigate = useNavigate();

  const [tempsRestant, setTempsRestant] = useState(1500); // valeur par défaut

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("pomodoro"));
    if (!isNaN(saved)) {
      setTempsRestant(saved * 60);
    }
  }, []);

  const [isRunning, setIsRunning] = useState(false);
  const [etat, setEtat] = useState("");

  // Fonction pour afficher le temps
  const formatTemps = (totalSecondes) => {
    const minutes = Math.floor(totalSecondes / 60);
    const secondes = totalSecondes % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}`;
  };

  // ici je gere le décompte du temps
  useEffect(() => {
    let interval = null;

    if (isRunning && tempsRestant > 0) {
      interval = setInterval(() => {
        setTempsRestant((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);

      // Si le temps est à 0, enregistrer la session et aller à la page pause
      if (isRunning && tempsRestant === 0) {
        enregistrerSession();
        navigate("/pause");
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, tempsRestant]);

  // Fonctions de contrôle du timer
  const handleDemarrer = () => {
    setIsRunning(true);
    setEtat("demarrer");
  };

  const handlePause = () => {
    setIsRunning(false);
    setEtat("pause");
  };

  const handleReset = () => {
    const saved = localStorage.getItem("pomodoro");
    setTempsRestant(saved ? parseInt(saved) * 60 : 1500);
    setIsRunning(false);
    setEtat("reset");
  };

  // Incrémenter les sessions dans le localStorage
  function enregistrerSession() {
    // Incrémenter le total général
    let sessionNb = parseInt(localStorage.getItem("nbSessions")) || 0;
    localStorage.setItem("nbSessions", sessionNb + 1);

    // Enregistrer la durée réelle du Pomodoro utilisé
    const duree = parseInt(localStorage.getItem("pomodoro")) || 25;
    let historique = JSON.parse(localStorage.getItem("historiqueDurees")) || [];
    historique.push(duree);
    localStorage.setItem("historiqueDurees", JSON.stringify(historique));

    // Mise à jour des sessions par jour
    const jours = [
      "Dim",
      "Lun",
      "Mar",
      "Mer",
      "Jeu",
      "Ven",
      "Sam",
    ];
    const today = new Date().getDay();
    const jourActuel = jours[today];

    let sessionsParJours = JSON.parse(
      localStorage.getItem("sessionsParJours")
    ) || {
      Dim: 0,
      Lun: 0,
      Mar: 0,
      Mer: 0,
      Jeu: 0,
      Ven: 0,
      Sam: 0,
    };

    sessionsParJours[jourActuel]++;
    localStorage.setItem("sessionsParJours", JSON.stringify(sessionsParJours));
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-center gap-10">
      <p className="text-blue-600 italic font-semibold absolute top-24 sm:top-10 left-10 text-sm sm:text-2xl">
        Concentre-toi. Respire. Progresse.
      </p>

      {/* Boutons en haut */}
      <div className="absolute top-10 right-10 flex gap-4">
        <button
          onClick={() => navigate("/parametre")}
          className="bg-violet-400 px-4 py-2 rounded-full shadow-xl hover:bg-violet-600 hover:scale-110 transition duration-300"
        >
          <img src="/parametres.png" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => navigate("/stats")}
          className="bg-violet-400 text-white px-4 py-2 rounded-full shadow-xl hover:scale-110 hover:bg-violet-600"
        >
          Statistiques
        </button>
      </div>

      {/* Cercle du timer */}
      <div className="w-64 h-64 rounded-full border-8 shadow-xl border-violet-400 flex items-center justify-center">
        <span className="text-4xl font-bold text-violet-600">
          {formatTemps(tempsRestant)}
        </span>
      </div>

      {/* Contrôles */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDemarrer}
          className={`shadow-xl ${
            etat === "demarrer" ? "bg-violet-700" : "bg-violet-400"
          } hover:bg-violet-600 hover:scale-110 transition duration-300  text-white px-6 py-2 rounded-full`}
        >
          Démarrer
        </button>
        <button
          onClick={handlePause}
          className={`shadow-xl ${
            etat === "pause" ? "bg-violet-700" : "bg-violet-400"
          }  hover:bg-violet-600 hover:scale-110 transition duration-300 text-white px-6 py-2 rounded-full`}
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className={`shadow-xl ${
            etat === "reset" ? "bg-violet-700" : "bg-violet-400"
          } hover:bg-violet-600  hover:scale-110 transition duration-300 text-white px-6 py-2 rounded-full`}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
export default Timer;
