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

        <div className="reveal-up">
          <Hero />
        </div>
        <div className="reveal-up">
          <Bio />
        </div>
        <div className="reveal-up">
          <Education />
        </div>
        <div className="reveal-up">
          <Skills />
        </div>
        <div className="reveal-up">
          <Contacts />
        </div>

        <div className="reveal-up">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
