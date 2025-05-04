import React, { useState, useEffect } from "react";

function Timer() {
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
    } else {
      clearInterval(interval);
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

  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-center gap-10">
      <p className="text-blue-700 font-semibold mb-4 absolute top-10 left-10 text-sm sm:text-2xl">
        Concentre-toi. Respire. Progresse.
      </p>

      <button className="absolute top-10 right-20 bg-violet-500 px-4 py-2 rounded-full shadow-xl hover:bg-violet-700">
        <img src="/parametres.png" className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="w-64 h-64 rounded-full border-8 shadow-xl border-violet-500 flex items-center justify-center shadow-md">
        <span className="text-4xl font-bold text-violet-600">
          {formatTemps(tempsRestant)}
        </span>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDemarrer}
          className={`shadow-xl ${
            etat === "demarrer" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600`}
        >
          Démarrer
        </button>

        <button
          onClick={handlePause}
          className={`shadow-xl ${
            etat === "pause" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600`}
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          className={`shadow-xl ${
            etat === "reset" ? "bg-violet-700" : "bg-violet-500"
          } text-white px-6 py-2 rounded-full hover:bg-violet-600`}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}

export default Timer;
