import React from "react";

import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function About() {
  const { trans } = useContext(LanguageContext);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-neutral-900">{trans.aboutH1}</h2>
      <p className="mt-2 rounded-2xl bg-neutral-100 p-4 text-neutral-600">
        {trans.aboutP}
      </p>
    </div>
  );
}

export default About;
