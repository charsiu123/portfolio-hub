type ProjectCard = {
  name: string;
  eyebrow: string;
  status: string;
  summary: string;
  stack: string[];
  evidence: string[];
  accent: "lime" | "violet" | "coral";
};

const projectCards: ProjectCard[] = [
  {
    name: "Habit PWA",
    eyebrow: "LOCAL-FIRST PWA",
    status: "Demo-ready",
    summary:
      "A browser-native habit timer that stays useful offline and keeps progress on the device.",
    stack: ["HTML", "CSS", "JavaScript", "Service Worker"],
    evidence: ["Offline-capable", "Local progress ledger", "Installable PWA"],
    accent: "lime",
  },
  {
    name: "Study Habit",
    eyebrow: "FOCUS DASHBOARD",
    status: "Demo-ready",
    summary:
      "A local study planning interface with editable blocks, accelerated demo timing, and completion history.",
    stack: ["React", "TypeScript", "Vite", "Local storage"],
    evidence: ["Editable plan", "Persisted state", "History view"],
    accent: "violet",
  },
  {
    name: "Preset Mall",
    eyebrow: "MARKETPLACE MVP",
    status: "Mock product demo",
    summary:
      "A client-side music preset marketplace demonstration focused on browsing, discovery, and creator journeys.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    evidence: ["Search & filters", "Creator routes", "Explicit mock flows"],
    accent: "coral",
  },
];

export default function Home() {
  return (
    <main className="portfolio-shell">
      <nav className="topbar" aria-label="Portfolio navigation">
        <a className="wordmark" href="#top" aria-label="Private CS Portfolio home">
          <span className="wordmark-mark" aria-hidden="true">↗</span>
          PRIVATE / CS
        </a>
        <span className="access-chip">RECRUITER ACCESS ONLY</span>
      </nav>

      <section className="hero" id="top">
        <div>
          <p className="kicker">PORTFOLIO INDEX · 2026</p>
          <h1>Builds with<br /><em>evidence.</em></h1>
        </div>
        <div className="hero-note">
          <p>
            A private record of product thinking, frontend implementation, and
            local-first software experiments.
          </p>
          <a href="#projects">Review selected work <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="trust-strip" aria-label="Portfolio access and data policy">
        <span>01 · PRIVATE REPOSITORIES</span>
        <span>02 · PROTECTED DEMOS</span>
        <span>03 · NO PERSONAL DATA</span>
      </section>

      <section className="projects" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="kicker">SELECTED WORK</p>
          <h2 id="projects-title">Three different ways<br />to make software useful.</h2>
        </div>

        <div className="project-grid">
          {projectCards.map((project, index) => (
            <article className={`project-card ${project.accent}`} key={project.name}>
              <div className="card-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.status}</span>
              </div>
              <div className="card-core">
                <p className="card-eyebrow">{project.eyebrow}</p>
                <h3>{project.name}</h3>
                <p className="card-summary">{project.summary}</p>
              </div>
              <div className="signal-stack" aria-label={`${project.name} implementation evidence`}>
                {project.evidence.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="card-footer">
                <ul aria-label={`${project.name} technology`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <button type="button" disabled aria-label={`${project.name} protected demo link pending access configuration`}>
                  Protected demo <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-grid" aria-labelledby="method-title">
        <div>
          <p className="kicker">IMPLEMENTATION NOTES</p>
          <h2 id="method-title">What this portfolio does—and does not—contain.</h2>
        </div>
        <div className="method-copy">
          <p>
            Every project is prepared from an isolated copy. Production demos are intentionally limited to safe, client-side interactions: no payments, no accounts, no uploads, and no hidden API credentials.
          </p>
          <p className="policy-line">No personal data or course-provided materials are included.</p>
        </div>
      </section>

      <section className="coursework" aria-labelledby="coursework-title">
        <p className="kicker">COURSEWORK HIGHLIGHTS</p>
        <div className="coursework-layout">
          <h2 id="coursework-title">Learning is documented<br />without redistributing it.</h2>
          <div>
            <p>
              Coursework is represented as independently written learning summaries: data modeling, algorithmic organization, state management, testing walkthroughs, and technical writing.
            </p>
            <p>
              Course starter code, assignment prompts, tests, textbooks, and supplied datasets are excluded from this portfolio.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <span>PRIVATE PORTFOLIO · ACCESS IS INVITATION-ONLY</span>
        <span>Built for technical recruiting conversations.</span>
      </footer>
    </main>
  );
}
