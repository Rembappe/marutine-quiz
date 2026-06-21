import { useState } from "react";
import { DRINKS } from "./drinks";
import "./App.css";

const CATS = [...new Set(DRINKS.map((d) => d.cat))];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pushLabel(n) {
  return `${n}プッシュ`;
}

function amountText(d) {
  return d.pushes != null ? pushLabel(d.pushes) : d.amountLabel;
}

// このドリンクに対して出題する最大4ステップを組み立てる
// ステップが成立しない項目（割り材が「なし」など）はスキップする
function buildSteps(drink, pool) {
  const steps = [];

  // Step: グラス
  {
    const correct = drink.glass;
    const others = [...new Set(pool.map((d) => d.glass).filter((g) => g !== correct))];
    const opts = shuffle([correct, ...shuffle(others).slice(0, 3)]);
    if (opts.length >= 2) {
      steps.push({
        key: "glass",
        question: "グラスは？",
        correct,
        opts,
        answerDisplay: correct,
      });
    }
  }

  // Step: ベース（spirit→お酒名+量をセットで問う／syrupOnly→量だけ問う）
  if (drink.baseType === "syrupOnly") {
    const correct = amountText(drink);
    // 同じ素材(base)を使う他のドリンクから違う量を集める。無ければ同confusionGroup内の他素材の量も混ぜる
    const sameBaseOtherAmount = [...new Set(
      pool.filter((d) => d.id !== drink.id && d.base === drink.base).map((d) => amountText(d))
    )].filter((v) => v !== correct);
    const sameGroupOtherAmount = [...new Set(
      pool.filter((d) => d.id !== drink.id && d.confusionGroup === drink.confusionGroup).map((d) => amountText(d))
    )].filter((v) => v !== correct);
    let candidates = [...new Set([...sameBaseOtherAmount, ...sameGroupOtherAmount])];
    const fallback = ["30ml", "45ml", "60ml", "80ml", "90ml", "1プッシュ", "2プッシュ"];
    let fi = 0;
    while (candidates.length < 3 && fi < fallback.length) {
      const f = fallback[fi++];
      if (f !== correct && !candidates.includes(f)) candidates.push(f);
    }
    const wrongs = shuffle(candidates).slice(0, 3);
    const opts = shuffle([correct, ...wrongs]);
    steps.push({
      key: "base",
      question: `${drink.base}は何mL使う？`,
      correct,
      opts,
      answerDisplay: correct,
    });
  } else {
    const correct = `${drink.base}　${amountText(drink)}`;
    // 同じconfusionGroup内の他ドリンクから「ベース＋量」のセットを集める（紛らわしい選択肢を意図的に作る）
    const groupCombos = [...new Set(
      pool
        .filter((d) => d.id !== drink.id && d.confusionGroup === drink.confusionGroup && d.baseType === "spirit")
        .map((d) => `${d.base}　${amountText(d)}`)
    )].filter((v) => v !== correct);
    // 同じベースで違う量（プッシュ違いなど）も混ぜる
    const sameBaseOtherAmount = [...new Set(
      pool
        .filter((d) => d.id !== drink.id && d.base === drink.base && d.baseType === "spirit")
        .map((d) => `${d.base}　${amountText(d)}`)
    )].filter((v) => v !== correct);
    let candidates = [...new Set([...groupCombos, ...sameBaseOtherAmount])];
    if (candidates.length < 3) {
      // フォールバック：違うグループの他ドリンクから補充
      const otherSpirits = [...new Set(
        pool
          .filter((d) => d.id !== drink.id && d.baseType === "spirit")
          .map((d) => `${d.base}　${amountText(d)}`)
      )].filter((v) => v !== correct && !candidates.includes(v));
      candidates = [...candidates, ...shuffle(otherSpirits)];
    }
    const wrongs = [...new Set(candidates)].slice(0, 3);
    const opts = shuffle([correct, ...wrongs]);
    if (opts.length >= 2) {
      steps.push({
        key: "base",
        question: "ベースのお酒は？何プッシュ（何mL）？",
        correct,
        opts,
        answerDisplay: correct,
      });
    }
  }

  // Step: 割り材（「なし」の場合はスキップ）
  if (drink.mixer && drink.mixer !== "なし") {
    const correct = drink.mixer;
    const others = [...new Set(pool.map((d) => d.mixer).filter((m) => m && m !== "なし" && m !== correct))];
    const wrongs = shuffle(others).slice(0, 3);
    const opts = shuffle([correct, ...wrongs]);
    if (opts.length >= 2) {
      steps.push({
        key: "mixer",
        question: "何で割る？",
        correct,
        opts,
        answerDisplay: correct,
      });
    }
  }

  // Step: その他必要なもの（レモン or 特記事項。両方あれば両方、無ければスキップ）
  const extras = [];
  if (drink.lemon && drink.lemon !== "なし") extras.push(drink.lemon);
  if (drink.other) extras.push(drink.other);

  if (extras.length > 0) {
    const correct = extras.join(" / ");
    const otherExtras = [
      ...new Set(
        pool
          .filter((d) => d.id !== drink.id)
          .map((d) => {
            const e = [];
            if (d.lemon && d.lemon !== "なし") e.push(d.lemon);
            if (d.other) e.push(d.other);
            return e.join(" / ");
          })
          .filter((v) => v && v !== correct)
      ),
    ];
    const wrongs = shuffle(otherExtras).slice(0, 3);
    if (wrongs.length >= 1) {
      const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
      steps.push({
        key: "extra",
        question: "そのほか必要なものは？",
        correct,
        opts,
        answerDisplay: correct,
      });
    }
  }

  return steps;
}

function FlowQuiz() {
  const [activeCats, setActiveCats] = useState(CATS);
  const [score, setScore] = useState({ total: 0, correct: 0 });
  const [drink, setDrink] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answered, setAnswered] = useState(null);

  function startNewDrink(cats = activeCats) {
    const pool = DRINKS.filter((d) => cats.includes(d.cat));
    if (pool.length < 2) {
      setDrink(null);
      setSteps([]);
      return;
    }
    const d = pool[Math.floor(Math.random() * pool.length)];
    const s = buildSteps(d, pool);
    setDrink(d);
    setSteps(s);
    setStepIndex(0);
    setAnswered(null);
  }

  useState(() => {
    startNewDrink(CATS);
  });

  function toggleCat(c) {
    let next;
    if (activeCats.includes(c)) {
      if (activeCats.length === 1) return;
      next = activeCats.filter((x) => x !== c);
    } else {
      next = [...activeCats, c];
    }
    setActiveCats(next);
    startNewDrink(next);
  }

  function handleAnswer(opt) {
    if (answered) return;
    const step = steps[stepIndex];
    const isCorrect = opt === step.correct;
    setScore((s) => ({ total: s.total + 1, correct: s.correct + (isCorrect ? 1 : 0) }));
    setAnswered({ selected: opt, correct: isCorrect });
  }

  function handleNext() {
    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
      setAnswered(null);
    } else {
      startNewDrink();
    }
  }

  const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  const pool = DRINKS.filter((d) => activeCats.includes(d.cat));
  const step = steps[stepIndex];

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

      <div style={{ marginTop: "1rem" }}>
        {pool.length < 2 ? (
          <div className="empty">カテゴリを1つ以上選んでください</div>
        ) : !drink || !step ? (
          <div className="empty">出題できる項目がありません</div>
        ) : (
          <div className="quiz-card">
            <div className="q-sub">このドリンクの…</div>
            <div className="q-name">{drink.name}</div>
            <span className="q-cat">{drink.cat}</span>

            <div className="step-progress">
              {steps.map((s, i) => (
                <span
                  key={s.key}
                  className={`step-dot ${i === stepIndex ? "current" : ""} ${i < stepIndex ? "done" : ""}`}
                >
                  {i + 1}
                </span>
              ))}
            </div>

            <div className="q-ask">
              Q{stepIndex + 1}. {step.question}
            </div>
            <div className="q-opts">
              {step.opts.map((o) => {
                let cls = "q-opt";
                if (answered) {
                  if (o === step.correct) cls += " reveal";
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
                  {answered.correct ? "✓ 正解！" : "✗ 不正解"}　正解：{step.answerDisplay}
                </div>
                <button className="next-btn" onClick={handleNext}>
                  {stepIndex + 1 < steps.length ? "次のステップへ" : "次のドリンクへ"}
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
                <span className="tag tb">
                  {d.base} {amountText(d)}
                </span>
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
        <p>1杯ずつ、最初から最後まで通しで覚える</p>
      </div>
      <div className="tabs">
        <div className={`tab ${tab === "quiz" ? "on" : ""}`} onClick={() => setTab("quiz")}>
          クイズ
        </div>
        <div className={`tab ${tab === "menu" ? "on" : ""}`} onClick={() => setTab("menu")}>
          メニュー一覧
        </div>
      </div>
      {tab === "quiz" ? <FlowQuiz /> : <MenuTab />}
    </div>
  );
}
