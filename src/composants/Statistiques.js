import React from "react";
//librairie pour grapgique
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

function Statistiques() {
  let sessionsParJours = localStorage.getItem("sessionsParJours");
  if (sessionsParJours) {
    sessionsParJours = JSON.parse(sessionsParJours);
  } else {
    sessionsParJours = {
      Dimanche: 0,
      Lundi: 0,
      Mardi: 0,
      Mercredi: 0,
      Jeudi: 0,
      Vendredi: 0,
      Samedi: 0,
    };
  }
  // Transforme l’objet en tableau pour le graphique
  const data = Object.keys(sessionsParJours).map((jour) => ({
    jour: jour,
    sessions: sessionsParJours[jour],
  }));

  const navigate = useNavigate();

  // Lire les sessions depuis localStorage
  let nbSession = localStorage.getItem("nbSessions");
  let nbS = parseInt(nbSession);
  if (isNaN(nbS)) {
    nbS = 0;
  }

  // Calcul du temps total
  const historique = JSON.parse(localStorage.getItem("historiqueDurees")) || [];
  const totalMinutes = historique.reduce((somme, duree) => somme + duree, 0);
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-start pt-10 gap-6">
      <p className="italic text-center text-blue-600 font-bold mb-4 text-xl sm:text-2xl hover:scale-105 hover:text-violet-600 transition duration-300">
        Statistiques Hebdomadaires
      </p>
      {/*Construction visuel du graphique */}
      <div className="w-[400px] h-[200px] sm:w-[800px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="sessions"
              fill="#8884d8"
              activeBar={<Rectangle fill="purple" stroke="blue" />}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Résumé sessions */}
      <div className="flex gap-1">
        <span className="text-violet-600 font-bold text-sm sm:text-xl hover:scale-110 transition duration-300">
          {nbS}
        </span>
        <span className="text-blue-600 font-bold text-sm sm:text-xl">
          sessions. Temps total :{" "}
        </span>
        <span className="text-violet-500 font-bold text-sm sm:text-xl hover:scale-110 transition duration-300">
          {heures}h et {minutes}min
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-violet-400 text-white px-6 py-2 rounded-full hover:bg-violet-600 shadow-xl hover:scale-110 transition duration-300"
          onClick={() => navigate("/")}
        >
          Timer
        </button>
        <button
          onClick={() => navigate("/parametre")}
          className="bg-violet-400 px-4 py-2 rounded-full shadow-xl hover:bg-violet-700 hover:scale-110 transition duration-300"
        >
          <img src="/parametres.png" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default Statistiques;
