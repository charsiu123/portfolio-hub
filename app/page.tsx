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
  kind: "habits" | "presets";
};

const demoUrls: Record<ProjectId, string> = {
  "habit-pwa": "/demos/habits/",
  "preset-mall": "/demos/presets/",
};

const projectCards: ProjectCard[] = [
  {
    id: "habit-pwa",
    name: "Habit PWA",
    field: "DAILY TOOL",
    record: "COLLECTION 01",
    status: "完成 / ready to try",
    summary: "通信がない時間にも使える、端末内完結の習慣タイマー。続けた時間を、手元で静かに残すためのPWAです。",
    stack: ["HTML", "CSS", "JavaScript", "Service Worker"],
    notes: ["オフライン利用", "端末内の記録", "インストール対応"],
    kind: "habits",
  },
  {
    id: "preset-mall",
    name: "Preset Mall",
    field: "WORK IN PROGRESS",
    record: "COLLECTION 02",
    status: "制作中 / prototype in progress",
    summary: "音楽プリセットを探し、作り手の入口へ進む体験を試作したクライアント側のMVPです。現在は探索フローを検証中です。",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    notes: ["検索と絞り込み", "作り手への導線", "試作フローの明示"],
    kind: "presets",
  },
];

export default function Home() {
  return (
    <main className="noticeboard" id="top">
      <nav className="board-nav" aria-label="ポートフォリオの案内">
        <a className="board-mark" href="#top" aria-label="制作掲示板の先頭へ">
          <span aria-hidden="true">✦</span>
          小さな実装の掲示板
        </a>
        <a className="board-nav-link" href="#collection">展示を見る <span aria-hidden="true">↓</span></a>
      </nav>

      <header className="board-hero">
        <div className="sky-sheet" aria-hidden="true" />
        <div className="boundary-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="notice-stamp" aria-hidden="true">OPEN<br />ARCHIVE</div>
        <div className="thread thread-one" aria-hidden="true" />
        <div className="thread thread-two" aria-hidden="true" />
        <p className="board-eyebrow">PERSONAL BUILD LOG / 2026</p>
        <h1>つくったものを、<br />そのまま見せる。</h1>
        <div className="hero-note">
          <span className="note-pin" aria-hidden="true" />
          <p>完成したPWAと、いま育てている試作。実際に触れる入口だけを、ここに留めています。</p>
        </div>
      </header>

      <section className="board-rules" aria-label="公開方針">
        <p><span aria-hidden="true">01</span> 実演できるものだけを掲載</p>
        <p><span aria-hidden="true">02</span> 制作段階をそのまま明記</p>
        <p><span aria-hidden="true">03</span> 個人情報・教材・認証情報は非掲載</p>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="collection-heading">
          <p className="board-eyebrow">THE COLLECTION</p>
          <h2 id="collection-title">二つの入口。<br />一つは完成、もう一つは途中。</h2>
          <p>カードを開くと、各制作物の実演ページに移動します。</p>
        </div>

        <div className="collection-list">
          {projectCards.map((project) => {
            const isComplete = project.id === "habit-pwa";
            return (
              <article className={`project-slip project-slip--${project.kind}`} key={project.id}>
                <div className="slip-tab" aria-hidden="true">{project.field}</div>
                <div className="slip-topline">
                  <p>{project.record}</p>
                  <span>{project.status}</span>
                </div>
                <div className="slip-content">
                  <div className="slip-seal" aria-hidden="true">{isComplete ? "✓" : "…"}</div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <ul className="slip-notes" aria-label={`${project.name} の特徴`}>
                  {project.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
                <footer className="slip-footer">
                  <ul aria-label={`${project.name} の技術`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a className="gate-link" href={demoUrls[project.id]}>
                    {isComplete ? "完成版を開く" : "制作中デモを開く"} <span aria-hidden="true">↗</span>
                  </a>
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      <section className="board-note" aria-labelledby="note-title">
        <div className="note-number" aria-hidden="true">NOTE<br />07</div>
        <div>
          <p className="board-eyebrow">ON WHAT IS SHOWN</p>
          <h2 id="note-title">見せられる範囲を、<br />正確に。</h2>
        </div>
        <p>このページには、外部決済・登録・アップロードを伴わない実演だけを掲載しています。追加の実装内容については、必要に応じて説明します。</p>
      </section>

      <footer className="board-footer">
        <span>PERSONAL BUILD LOG / 2026</span>
        <span>小さな実装の公開入口</span>
      </footer>
    </main>
  );
}
