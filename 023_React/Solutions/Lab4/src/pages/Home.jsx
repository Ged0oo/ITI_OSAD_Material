import React from "react";

import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function Home() {
  const { trans } = useContext(LanguageContext);
  return (
    <div>
      <h2 className="text-2xl font-bold">{trans.homeH1}</h2>
      <p className="bg-slate-100 shadow-md rounded-3xl text-slate-600 mt-2 p-4">
        {trans.homeP}
      </p>
    </div>
  );
}

export default Home;
