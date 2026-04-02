const educationData = [
  {
    degree: "Open source Application Development Graduate",
    school: "Information Technology Institute (ITI)",
    year: "2025 - 2026",
    description:
      "Comprehensive training in open-source technologies, Linux system programming, and full-stack development.",
  },
  {
    degree: "Bachelor of Elctronics and Communication Engineering",
    school: "Alexandria University",
    year: "2020 - 2025",
    description:
      "Studied core CS fundamentals, algorithms, and software engineering.",
  },
];

function Education() {
  return (
    <section
      id="education"
      className="hover-lift scroll-mt-6 rounded-xl bg-white p-6 shadow ring-1 ring-slate-200 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-slate-900 flex items-center justify-center mb-6">
        Education
      </h3>

      <div className="relative border-l-2 border-slate-300 ml-4">
        {educationData.map((edu, index) => (
          <div key={index} className="group relative mb-8 ml-6">
            <span className="absolute -left-8 top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-900 shadow transition-transform duration-300 group-hover:scale-110"></span>

            <div className="rounded-lg bg-slate-50 p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-slate-100 group-hover:shadow-md">
              <span className="text-xs font-semibold text-white bg-slate-900 px-3 py-1 rounded-full">
                {edu.year}
              </span>

              <h4 className="text-md font-bold text-slate-800 mt-2">
                {edu.degree}
              </h4>

              <p className="text-sm text-slate-600 font-medium">{edu.school}</p>

              <p className="text-sm text-slate-500 mt-1">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
