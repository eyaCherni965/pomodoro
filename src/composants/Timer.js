import React from "react";

function Timer(){
    return(
<div className="bg-pink-100 flex flex-col items-center justify-center mt-10 gap-20">
<p className="text-left mtext-lg text-pink-700">Concentre-toi. Respire. Progresse.</p>
<div className="rounded-full border-2 border-pink-800 flex items-center">
   25:00 
</div>
<div className="flex gap-4 ">
<button className="bg-pink-600 rounded-md">Démarer</button>
<button className="bg-pink-600 rounded-md">Pause</button>
<button className="bg-pink-600 rounded-md">Statistique</button>
</div>
</div>

    );
}
export default Timer; 