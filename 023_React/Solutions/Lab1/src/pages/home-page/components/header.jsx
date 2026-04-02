function Header() {
  return (
    <header className="hover-lift rounded-xl bg-slate-900 px-6 py-4 text-slate-100 shadow flex items-center justify-between transition-all duration-300">
      <h1 className="text-2xl font-bold tracking-tight transition-transform duration-300 hover:scale-105">
        My Portfolio
      </h1>

      <nav className="flex gap-6 text-sm font-medium">
        <a id="header-element" href="#bio">
          Bio
        </a>

        <a id="header-element" href="#education">
          Education
        </a>

        <a id="header-element" href="#skills">
          Skills
        </a>

        <a id="header-element" href="#contacts">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
