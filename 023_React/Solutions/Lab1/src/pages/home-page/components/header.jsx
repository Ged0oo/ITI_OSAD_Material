function Header() {
  return (
    <header className="hover-lift rounded-xl bg-slate-900 px-6 py-4 text-slate-100 shadow flex items-center justify-between transition-all duration-300">
      <h1 className="text-2xl font-bold tracking-tight transition-transform duration-300 hover:scale-105">
        My Portfolio
      </h1>
      <nav className="flex gap-6 text-sm font-medium">
        <a
          href="#bio"
          className="hover:text-slate-300 transition-all duration-300 hover:-translate-y-0.5"
        >
          Bio
        </a>

        <a
          href="#education"
          className="hover:text-slate-300 transition-all duration-300 hover:-translate-y-0.5"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("education")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Education
        </a>

        <a
          href="#skills"
          className="hover:text-slate-300 transition-all duration-300 hover:-translate-y-0.5"
        >
          Skills
        </a>

        <a
          href="#contacts"
          className="hover:text-slate-300 transition-all duration-300 hover:-translate-y-0.5"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
