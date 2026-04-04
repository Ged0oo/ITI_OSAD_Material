import React from "react";

import { useLanguage } from "../context/LanguageContext";

function About() {
  const { trans } = useLanguage();
  return (
    <div>
      <h2 className="text-2xl font-bold">{trans.aboutH1}</h2>
      <p className="bg-slate-100 shadow-md rounded-3xl text-slate-600 mt-2 p-4">
        {trans.aboutP}
      </p>
    </div>
  );
}

export default About;
