function Bio() {
  return (
    <section
      id="bio"
      className="hover-lift rounded-xl bg-white p-6 shadow ring-1 ring-slate-200 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-slate-900 flex items-center justify-center mb-4">
        Bio
      </h3>

      <div className="space-y-3 text-slate-700 text-center max-w-md mx-auto">
        <p>
          A passionate Software Engineer with a strong foundation in open-source
          technologies, Linux system programming, and full-stack development.
          Experienced in building scalable applications using modern frameworks,
          contributing to open-source projects, and applying software
          engineering best practices including CI/CD, version control, and Agile
          methodologies. Seeking a full-time position to leverage my skills in
          designing, developing, and maintaining high-quality software solutions
          in a collaborative, open-source-driven environment.
        </p>

        <div className="flex justify-center mt-4">
          <a
            href="/Mohamed_Nagy___CV.pdf"
            download
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3"
              />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default Bio;
