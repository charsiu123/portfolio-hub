type ProjectId = "habit-pwa" | "preset-mall";

type ProjectCard = {
  id: ProjectId;
  name: string;
  field: string;
  record: string;
  status: string;
  summary: string;
  stack: string[];
  notes: string[];
  kind: "habits" | "study" | "presets";
  demoUrl?: string;
};

const demoUrls: Record<ProjectId, string | undefined> = {
  "habit-pwa": "/demos/habits/",
  "preset-mall": "/demos/presets/",
};

const projectCards: ProjectCard[] = [
  {
    id: "habit-pwa",
    name: "Habit PWA",
    field: "生活の記録",
    record: "01 / 手元に残る習慣",
    status: "完成",
    summary: "通信がない時間にも使える、端末内完結の習慣タイマー。積み重ねを静かに記録するためのPWAです。",
    stack: ["HTML", "CSS", "JavaScript", "Service Worker"],
    notes: ["オフライン利用", "端末内の記録", "インストール対応"],
    kind: "habits",
  },
  {
    id: "preset-mall",
    name: "Preset Mall",
    field: "発見の導線",
    record: "02 / 音を探す場所",
    status: "制作中 / prototype in progress",
    summary: "音楽プリセットを探し、作り手の入口へ進む体験を試作した、クライアント側のMVPです。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    notes: ["検索と絞り込み", "作り手への導線", "試作フローの明示"],
    kind: "presets",
  },
].map((project) => ({ ...project, demoUrl: demoUrls[project.id] }));

export default function Home() {
  return (
    <main className="atlas" id="top">
      <nav className="atlas-nav" aria-label="ポートフォリオの案内">
        <a className="atlas-mark" href="#top" aria-label="制作記録の先頭へ">
          <span aria-hidden="true">○</span>
          制作記録
        </a>
        <a className="atlas-nav-link" href="#projects">記録をたどる <span aria-hidden="true">↓</span></a>
      </nav>

      <header className="atlas-hero">
        <div className="hero-sky" aria-hidden="true" />
        <div className="hero-fence" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="hero-stamp" aria-hidden="true">03<br />GATES</div>
        <div className="hero-route" aria-hidden="true"><span /><span /><span /></div>
        <p className="atlas-eyebrow">PORTFOLIO / 2026 / FIELD NOTES</p>
        <h1>小さな実装の、<br />公開掲示板。</h1>
        <div className="hero-caption">
          <p>日々の行動、学びの時間、音を探す道筋。小さな用途から始めた制作物の記録です。</p>
          <p>完成したものと、制作途中のものを、そのまま置いています。</p>
        </div>
      </header>

      <section className="legend" aria-label="この記録について">
        <p><span aria-hidden="true">●</span> 自分で書いた実装と要約</p>
        <p><span aria-hidden="true">△</span> 公開可否をそのまま記載</p>
        <p><span aria-hidden="true">□</span> 個人情報や配布教材は含めていません。</p>
      </section>

      <section className="portfolio-grid" id="projects" aria-labelledby="projects-title">
        <div className="grid-intro">
          <p className="atlas-eyebrow">SELECTED RECORDS</p>
          <h2 id="projects-title">用途ごとに、<br />違う手触りを。</h2>
          <p>それぞれの制作物は、実装の選択と現在の公開状況を一緒に残しています。</p>
        </div>

        {projectCards.map((project) => (
            <article className={`record-card collection-card record-card--${project.kind}`} key={project.name}>
            <div className="record-map" aria-hidden="true"><i /><i /><i /></div>
            <div className="record-head">
              <p>{project.record}</p>
              <span>{project.status}</span>
            </div>
            <div className="record-body">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
            <ul className="record-notes" aria-label={`${project.name} の特徴`}>
              {project.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
            <footer className="record-footer">
              <ul aria-label={`${project.name} の技術`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="demo-area">
                <span className="demo-label">デモの準備状況</span>
                {project.demoUrl ? (
                  <a className="demo-link" href={project.demoUrl}>
                    デモを開く <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="demo-status">公開デモは現在準備中です。</span>
                )}
              </div>
            </footer>
          </article>
        ))}
      </section>

      <section className="field-note" aria-labelledby="note-title">
        <div className="field-note-mark" aria-hidden="true"><span /><span /></div>
        <div>
          <p className="atlas-eyebrow">FIELD NOTE</p>
          <h2 id="note-title">公開できる範囲を、<br />正確に扱う。</h2>
        </div>
        <div className="field-note-copy">
          <p>制作物は安全なクライアント側の操作を中心に構成しています。決済、アカウント登録、アップロード、非公開の認証情報は扱いません。</p>
          <p>ソースや追加資料が必要な場合は、内容に応じて説明します。</p>
        </div>
      </section>

      <footer className="atlas-footer">
        <span>制作記録 / 2026</span>
        <span>静かな実装のための公開入口</span>
      </footer>
    </main>
  );
}
