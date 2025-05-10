import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Parametre() {
  const navigate = useNavigate();

  const [pomodoro, setPomodoro] = useState(
    () => parseInt(localStorage.getItem("pomodoro")) || 25
  );
  const [pause, setPause] = useState(
    () => parseInt(localStorage.getItem("pause")) || 5
  );

  const handlePomodoroChange = (e) => {
    const value = parseInt(e.target.value);
    setPomodoro(value);
    localStorage.setItem("pomodoro", value); // Enregistrement dans localStorage
  };

  const handlePauseChange = (e) => {
    const value = parseInt(e.target.value);
    setPause(value);
    localStorage.setItem("pause", value);
  };
  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-center">
      {/* Titre principal */}
      <p className="italic text-violet-700 font-semibold absolute top-10 left-10 text-1xl sm:text-2xl">
        Tes préférences, ton efficacité.
      </p>

      {/* Boutons de navigation */}
      <div className="absolute top-10 right-10 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-xs sm:text-base bg-violet-400 text-white px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          Timer
        </button>

        <button
          onClick={() => navigate("/stats")}
          className="text-xs sm:text-base bg-violet-400 text-white px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          Statistiques
        </button>
      </div>

      {/* Cadre des paramètres */}
      <div className="w-[90%] max-w-md border-8 border-violet-400 bg-violet-200 rounded-xl shadow-xl p-6 flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="font-semibold text-violet-700 mb-1">
            Durée du Pomodoro (en minutes)
          </label>
          <input
            type="number"
            min="0"
            onChange={handlePomodoroChange}
            value={pomodoro}
            className="rounded px-3 py-2 border bg-violet-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-violet-700 mb-1">
            Durée de la pause (en minutes)
          </label>
          <input
            type="number"
            min="0"
            onChange={handlePauseChange}
            value={pause}
            className="rounded px-3 py-2 border bg-violet-100"
          />
        </div>
      </div>
    </div>
  );
}

export default Parametre;
