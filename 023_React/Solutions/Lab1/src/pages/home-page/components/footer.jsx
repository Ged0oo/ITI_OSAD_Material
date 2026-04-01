function Footer() {
  return (
    <footer className="hover-lift rounded-xl border border-slate-300 bg-slate-900 px-6 py-6 text-center text-slate-300 transition-all duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-4 text-sm">
          <a
            href="#bio"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
          >
            Bio
          </a>

          <span>|</span>

          <a
            href="#education"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
          >
            Education
          </a>

          <span>|</span>

          <a
            href="#skills"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
          >
            Skills
          </a>

          <span>|</span>

          <a
            href="#contacts"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
          >
            Contact
          </a>
        </div>
        <p className="text-sm">Copyright © 2026 ITI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
