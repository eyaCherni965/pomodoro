import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

function Statistiques() {
  const data = [
    { jour: "L", sessions: 3 },
    { jour: "M", sessions: 5 },
    { jour: "Me", sessions: 2 },
    { jour: "J", sessions: 2 },
    { jour: "V", sessions: 2 },
    { jour: "S", sessions: 2 },
    { jour: "D", sessions: 2 }
  ];
  const navigate = useNavigate();

  // Lire les sessions depuis localStorage
  let nbSession = localStorage.getItem("nbSessions");
  let nbS = parseInt(nbSession);
  if (isNaN(nbS)) {
    nbS = 0;
  }

  // Calcul du temps total
  const totalMinutes = nbS * 25;
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-blue-100 to-violet-300 flex flex-col items-center justify-start pt-10 gap-6">
      <p className="text-center text-blue-700 font-bold mb-4 text-xl sm:text-2xl hover:scale-105 hover:text-violet-600 transition duration-300">
        Statistiques Hebdomadaires
      </p>

      <div className="w-[500px] h-[300px] sm:w-[800px]">
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
        <span className="text-violet-700 font-bold text-sm sm:text-xl hover:scale-110 transition duration-300">
          {nbS}
        </span>
        <span className="text-blue-700 font-bold text-sm sm:text-xl">sessions</span>
        <span className="text-blue-700 font-bold text-sm sm:text-xl">Temps total : </span>
        <span className="text-violet-700 font-bold text-sm sm:text-xl hover:scale-110 transition duration-300">
          {heures}h{minutes}min
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-violet-500 text-white px-6 py-2 rounded-full hover:bg-violet-600 shadow-xl hover:scale-110 transition duration-300"
          onClick={() => navigate("/")}
        >
          Timer
        </button>
        <button className="bg-violet-500 text-white px-6 py-2 rounded-full hover:bg-violet-600 shadow-xl hover:scale-110 transition duration-300">
          Paramètre
        </button>
      </div>
    </div>
  );
}

export default Statistiques;