import Header from "./components/header";
import Hero from "./components/hero";
import Bio from "./components/bio";
import Skills from "./components/skills";
import Education from "./components/education";
import Contacts from "./components/contacts";
import Footer from "./components/footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
        <div className="reveal-up">
          <Header />
        </div>

        <div className="reveal-up" style={{ animationDelay: "80ms" }}>
          <Hero />
        </div>
        <div className="reveal-up" style={{ animationDelay: "140ms" }}>
          <Bio />
        </div>
        <div className="reveal-up" style={{ animationDelay: "200ms" }}>
          <Education />
        </div>
        <div className="reveal-up" style={{ animationDelay: "260ms" }}>
          <Skills />
        </div>
        <div className="reveal-up" style={{ animationDelay: "320ms" }}>
          <Contacts />
        </div>

        <div className="reveal-up" style={{ animationDelay: "380ms" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
