import heroImg from "../../../assets/1.jpg";

function Hero() {
  return (
    <section className="hover-lift rounded-xl bg-white p-6 shadow ring-1 ring-slate-200 transition-all duration-300">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src={heroImg}
          alt="Profile"
          className="h-40 w-40 rounded-full object-cover ring-4 ring-slate-300 shadow-lg transition-all duration-500 hover:scale-105 hover:ring-slate-500"
        />
        <h2 className="text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-slate-700">
          Hi, I am a Software Engineer
        </h2>
        <p className="text-slate-600 text-center max-w-md">
          I specialize in building web applications using React and Node.js. I
          have experience in both frontend and backend development.
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="#contacts"
            className="rounded-lg bg-slate-900 px-6 py-2 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md"
          >
            Contact Me
          </a>
          <a
            href="#bio"
            className="rounded-lg border border-slate-900 px-6 py-2 text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
