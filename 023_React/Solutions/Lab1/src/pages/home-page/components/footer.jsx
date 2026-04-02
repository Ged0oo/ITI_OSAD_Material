function Footer() {
  return (
    <footer className="hover-lift rounded-xl border border-slate-300 bg-slate-900 px-6 py-6 text-center text-slate-300 transition-all duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-4 text-sm">
          <a id="footer-element" href="#bio">
            Bio
          </a>

          <span>|</span>

          <a id="footer-element" href="#education">
            Education
          </a>

          <span>|</span>

          <a id="footer-element" href="#skills">
            Skills
          </a>

          <span>|</span>

          <a id="footer-element" href="#contacts">
            Contact
          </a>
        </div>
        <p className="text-sm">Copyright © 2026 ITI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
