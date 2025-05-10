import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pause() {
  const navigate = useNavigate();

  // Initialise la durée de la pause depuis le localStorage en secondes
  const [tempsRestantPause, setTempsRestantPause] = useState(() => {
    const saved = parseInt(localStorage.getItem("pause"));
    return !isNaN(saved) ? saved * 60 : 300;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [etat, setEtat] = useState("");

  // Liste de phrases de motivation
  const phrasesMotivantes = [
    "Étire-toi un peu, ça relance l’énergie.",
    "Bois un verre d’eau. Ton cerveau carbure mieux hydraté.",
    "Ferme les yeux 20 secondes. Soulage tes yeux.",
    "Note une chose positive qui vient de se passer.",
    "Marche quelques pas. Ton corps en a besoin.",
  ];

  // Sélection aléatoire d'une phrase de motivation
  const [phraseAleatoire] = useState(() => {
    const index = Math.floor(Math.random() * phrasesMotivantes.length);
    return phrasesMotivantes[index];
  });

  // Formate le temps en mm:ss
  const formatTemps = (totalSecondes) => {
    const minutes = Math.floor(totalSecondes / 60);
    const secondes = totalSecondes % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}`;
  };

  // Gère le décompte du temps
  useEffect(() => {
    let interval = null;

    if (isRunning && tempsRestantPause > 0) {
      interval = setInterval(() => {
        setTempsRestantPause((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, tempsRestantPause]);

  // démarrer le timer
  const handleDemarrer = () => {
    setIsRunning(true);
    setEtat("demarrer");
  };

  //  mettre le timer en pause
  const handlePause = () => {
    setIsRunning(false);
    setEtat("pause");
  };

  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-pink-100 to-violet-300 flex flex-col items-center justify-center gap-10">
      <p className="italic text-blue-700 font-semibold absolute top-10 left-10 text-sm sm:text-2xl">
        Une pause bien méritée !
      </p>

      {/* Navigation en haut à droite */}
      <div className="absolute top-10 right-10 flex gap-4">
        <button
          onClick={() => navigate("/parametre")}
          className="bg-violet-400 px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          <img src="/parametres.png" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => navigate("/stats")}
          className="text-xs sm:text-base px-2 py-1 sm:px-4 sm:py-2 bg-violet-400 text-white rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          Statistiques
        </button>
      </div>

      {/* Cercle avec le temps */}
      <div className="w-64 h-64 rounded-full border-8 shadow-xl border-violet-400 flex items-center justify-center shadow-md">
        <span className="text-4xl font-bold text-violet-600">
          {formatTemps(tempsRestantPause)}
        </span>
      </div>

      {/* Phrase motivante */}
      <div className="px-6 py-3 bg-gradient-to-r from-pink-300 to-violet-400 rounded shadow-xl">
        <p className="text-white font-medium text-center text-base sm:text-xl px-4 italic">
          {phraseAleatoire}
        </p>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDemarrer}
          className={`shadow-xl ${
            etat === "demarrer" ? "bg-violet-700" : "bg-violet-400"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300`}
        >
          Démarrer
        </button>

        <button
          onClick={handlePause}
          className={`shadow-xl ${
            etat === "pause" ? "bg-violet-700" : "bg-violet-400"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300`}
        >
          Pause
        </button>

        <button
          onClick={() => navigate("/")}
          className="shadow-xl bg-violet-400 text-white px-6 py-2 rounded-full hover:bg-violet-600 hover:scale-110 transition duration-300"
        >
          Nouvelle session
        </button>
      </div>
    </div>
  );
}

export default Pause;
