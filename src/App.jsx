import { useState } from "react";
import { DRINKS } from "./drinks";
import "./App.css";

const CATS = [...new Set(DRINKS.map((d) => d.cat))];
const ASPECTS = ["グラス", "ベース", "量", "割り材", "レモン", "その他（特記）"];

const ASPECT_LABELS = {
  グラス: "使うグラスは？",
  ベース: "ベースのお酒は？",
  量: "量・プッシュ数は？",
  割り材: "割り材は？",
  レモン: "レモンの扱いは？",
  "その他（特記）": "特記事項・イレギュラーは？",
};

function getVal(d, asp) {
  if (asp === "グラス") return d.glass;
  if (asp === "ベース") return d.base;
  if (asp === "量") return d.amount;
  if (asp === "割り材") return d.mixer;
  if (asp === "レモン") return d.lemon;
  if (asp === "その他（特記）") return d.other || "なし";
  return "";
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestion(activeCats, activeAspects) {
  const pool = DRINKS.filter((d) => activeCats.includes(d.cat));
  if (pool.length < 2) return null;
  const drink = pool[Math.floor(Math.random() * pool.length)];
  const eligible = activeAspects.filter((a) => {
    const v = getVal(drink, a);
    return v && v !== "なし" && v !== "";
  });
  if (!eligible.length) return null;
  const asp = eligible[Math.floor(Math.random() * eligible.length)];
  const correct = getVal(drink, asp);
  const allVals = [
    ...new Set(
      pool.map((d) => getVal(d, asp)).filter((v) => v && v !== "なし" && v !== correct)
    ),
  ];
  const wrongs = shuffle(allVals).slice(0, 3);
  const fillers = ["その他", "規定量", "60ml", "30ml", "45ml", "水UP", "ソーダUP", "無地グラス"];
  let fi = 0;
  while (wrongs.length < 3 && fi < fillers.length) {
    const f = fillers[fi++];
    if (!wrongs.includes(f) && f !== correct) wrongs.push(f);
  }
  const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
  return { drink, asp, label: ASPECT_LABELS[asp] || asp, correct, opts };
}

function QuizTab() {
  const [activeCats, setActiveCats] = useState(CATS);
  const [activeAspects, setActiveAspects] = useState(ASPECTS);
  const [score, setScore] = useState({ total: 0, correct: 0 });
  const [question, setQuestion] = useState(() => buildQuestion(CATS, ASPECTS));
  const [answered, setAnswered] = useState(null);

  function nextQuestion(cats = activeCats, aspects = activeAspects) {
    setAnswered(null);
    setQuestion(buildQuestion(cats, aspects));
  }

  function toggleCat(c) {
    let next;
    if (activeCats.includes(c)) {
      if (activeCats.length === 1) return;
      next = activeCats.filter((x) => x !== c);
    } else {
      next = [...activeCats, c];
    }
    setActiveCats(next);
    nextQuestion(next, activeAspects);
  }

  function toggleAspect(a) {
    let next;
    if (activeAspects.includes(a)) {
      if (activeAspects.length === 1) return;
      next = activeAspects.filter((x) => x !== a);
    } else {
      next = [...activeAspects, a];
    }
    setActiveAspects(next);
    nextQuestion(activeCats, next);
  }

  function handleAnswer(opt) {
    if (answered) return;
    const isCorrect = opt === question.correct;
    setScore((s) => ({ total: s.total + 1, correct: s.correct + (isCorrect ? 1 : 0) }));
    setAnswered({ selected: opt, correct: isCorrect });
  }

  const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  const pool = DRINKS.filter((d) => activeCats.includes(d.cat));

  return (
    <div>
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-n">{score.total}</div>
          <div className="stat-l">出題数</div>
        </div>
        <div className="stat">
          <div className="stat-n">{score.correct}</div>
          <div className="stat-l">正解</div>
        </div>
        <div className="stat">
          <div className="stat-n">{pct}%</div>
          <div className="stat-l">正解率</div>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-label">カテゴリ絞り込み：</div>
        <div className="pills">
          {CATS.map((c) => (
            <span
              key={c}
              className={`pill ${activeCats.includes(c) ? "on" : ""}`}
              onClick={() => toggleCat(c)}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-label">出題項目：</div>
        <div className="pills">
          {ASPECTS.map((a) => (
            <span
              key={a}
              className={`pill ${activeAspects.includes(a) ? "on" : ""}`}
              onClick={() => toggleAspect(a)}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {pool.length < 2 ? (
          <div className="empty">カテゴリを1つ以上選んでください</div>
        ) : !question ? (
          <div className="empty">出題できる項目がありません</div>
        ) : (
          <div className="quiz-card">
            <div className="q-sub">このドリンクの…</div>
            <div className="q-name">{question.drink.name}</div>
            <span className="q-cat">{question.drink.cat}</span>
            <div className="q-ask">{question.label}</div>
            <div className="q-opts">
              {question.opts.map((o) => {
                let cls = "q-opt";
                if (answered) {
                  if (o === question.correct) cls += " reveal";
                  if (answered.selected === o && !answered.correct) cls += " wrong";
                  if (answered.selected === o && answered.correct) cls += " correct";
                }
                return (
                  <button
                    key={o}
                    className={cls}
                    disabled={!!answered}
                    onClick={() => handleAnswer(o)}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div>
                <div className={`result-msg ${answered.correct ? "ok" : "ng"}`}>
                  {answered.correct ? "✓ 正解！" : "✗ 不正解"}　正解：{question.correct}
                  <div style={{ marginTop: 6, fontSize: 11, opacity: 0.85 }}>
                    全情報：
                    {[
                      question.drink.glass,
                      question.drink.base,
                      question.drink.amount,
                      question.drink.mixer,
                      question.drink.lemon,
                      question.drink.other,
                    ]
                      .filter((x) => x && x !== "なし" && x !== "")
                      .join(" / ")}
                  </div>
                </div>
                <button className="next-btn" onClick={() => nextQuestion()}>
                  次の問題へ
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuTab() {
  return (
    <div>
      {CATS.map((cat) => (
        <div key={cat}>
          <div className="menu-cat">{cat}</div>
          {DRINKS.filter((d) => d.cat === cat).map((d) => (
            <div className="mcard" key={d.id}>
              <div className="mname">{d.name}</div>
              <div className="tags">
                <span className="tag tg">{d.glass}</span>
                <span className="tag tb">{d.base}</span>
                <span className="tag ta">{d.amount}</span>
                {d.mixer && d.mixer !== "なし" && <span className="tag tb">{d.mixer}</span>}
                {d.lemon && d.lemon !== "なし" && <span className="tag tn">🍋 {d.lemon}</span>}
                {d.other && <span className="tag ts">{d.other}</span>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("quiz");

  return (
    <div className="app">
      <div className="header">
        <h1>マルチネス本山 ドリンク暗記アプリ</h1>
        <p>全メニュー対応版</p>
      </div>
      <div className="tabs">
        <div className={`tab ${tab === "quiz" ? "on" : ""}`} onClick={() => setTab("quiz")}>
          クイズ
        </div>
        <div className={`tab ${tab === "menu" ? "on" : ""}`} onClick={() => setTab("menu")}>
          メニュー一覧
        </div>
      </div>
      {tab === "quiz" ? <QuizTab /> : <MenuTab />}
    </div>
  );
}
