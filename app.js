const facts = [
  {
    category: "Ursprung",
    title: "Erster Auftritt (1952)",
    text: "Das Marsupilami debütierte 1952 in Spirou et les héritiers von André Franquin.",
  },
  {
    category: "Ursprung",
    title: "Schöpfer",
    text: "André Franquin gilt als Erfinder der Figur und als prägende Größe der frankobelgischen Comics.",
  },
  {
    category: "Merkmale",
    title: "Legendärer Schwanz",
    text: "Der extrem lange Schwanz wird in vielen Storys als Werkzeug, Feder, Lasso oder Schleuder eingesetzt.",
  },
  {
    category: "Merkmale",
    title: "Ruf",
    text: "Der ikonische Laut des Marsupilami ist das bekannte 'Houba!'.",
  },
  {
    category: "Welt",
    title: "Palumbien",
    text: "Das Marsupilami lebt traditionell in Palumbien – einem fiktiven südamerikanischen Land der Comicwelt.",
  },
  {
    category: "Medien",
    title: "Eigenständige Alben",
    text: "Ab den späten 1980ern erhielt die Figur eine eigene Albumreihe, u. a. bei Dupuis.",
  },
  {
    category: "Medien",
    title: "TV-Adaption",
    text: "In den frühen 1990ern erschien in den USA eine Disney-Animationsfassung mit eigener Interpretation.",
  },
  {
    category: "Medien",
    title: "Kinofilm 2012",
    text: "Mit Sur la piste du Marsupilami erschien 2012 eine erfolgreiche französische Live-Action-Adaption.",
  },
];

const stats = [
  { value: "1952", label: "Erstauftritt" },
  { value: "8m+", label: "Comichaft dargestellte Schwanzlänge" },
  { value: "5", label: "Quizfragen" },
  { value: "4", label: "Referenzquellen" },
];

const powers = [
  { name: "Akrobatik", score: 98 },
  { name: "Schwanz-Kontrolle", score: 100 },
  { name: "Dschungel-Instinkt", score: 93 },
  { name: "Intelligenz", score: 79 },
  { name: "Chaos-Potenzial", score: 95 },
];

const timelineEvents = [
  { year: 1952, text: "Debüt in Spirou et les héritiers." },
  { year: 1955, text: "Weitere Auftritte machen die Figur zum Publikumsliebling." },
  { year: 1987, text: "Start der eigenständigen Marsupilami-Comicreihe." },
  { year: 1993, text: "US-TV-Serie bringt internationale Aufmerksamkeit." },
  { year: 2012, text: "Realfilm (Sur la piste du Marsupilami) mit großem Publikumserfolg in Frankreich." },
  { year: "2020+", text: "Die Figur bleibt durch neue Ausgaben und Nostalgie-Kultur präsent." },
];

const quiz = [
  {
    q: "Wer erschuf das Marsupilami?",
    a: ["Peyo", "André Franquin", "Hergé", "Morris"],
    correct: 1,
  },
  {
    q: "Wo lebt das Marsupilami in der klassischen Comicwelt?",
    a: ["Sibirien", "Atlantis", "Palumbien", "Ruritanien"],
    correct: 2,
  },
  {
    q: "Welcher Laut ist typisch für das Marsupilami?",
    a: ["Houba!", "Bang!", "Clonk!", "Wubba!"],
    correct: 0,
  },
  {
    q: "Wann erschien der französische Realfilm?",
    a: ["1999", "2008", "2012", "2018"],
    correct: 2,
  },
  {
    q: "In welchem Medium trat das Marsupilami zuerst auf?",
    a: ["Comic", "Film", "Fernsehen", "Videospiel"],
    correct: 0,
  },
];

const heroStats = document.getElementById("heroStats");
const filters = document.getElementById("filters");
const factsGrid = document.getElementById("factsGrid");
const powerGrid = document.getElementById("powerGrid");
const timeline = document.getElementById("timeline");
const toast = document.getElementById("toast");
const randomFactBtn = document.getElementById("randomFactBtn");

function renderStats() {
  heroStats.innerHTML = "";
  stats.forEach((s) => {
    const el = document.createElement("article");
    el.className = "stat";
    el.innerHTML = `<b>${s.value}</b><span>${s.label}</span>`;
    heroStats.appendChild(el);
  });
}

const categories = ["Alle", ...new Set(facts.map((fact) => fact.category))];
let selectedCategory = "Alle";

function renderFilters() {
  filters.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${cat === selectedCategory ? "active" : ""}`;
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      selectedCategory = cat;
      renderFilters();
      renderFacts();
    });
    filters.appendChild(btn);
  });
}

function renderFacts() {
  factsGrid.innerHTML = "";
  const visibleFacts = selectedCategory === "Alle" ? facts : facts.filter((f) => f.category === selectedCategory);

  visibleFacts.forEach((fact) => {
    const card = document.createElement("article");
    card.className = "fact-card";
    card.innerHTML = `<small>${fact.category}</small><h4>${fact.title}</h4><p>${fact.text}</p>`;
    factsGrid.appendChild(card);
  });
}

function renderPowers() {
  powerGrid.innerHTML = "";
  powers.forEach((power) => {
    const item = document.createElement("article");
    item.className = "power-item";
    item.innerHTML = `
      <div class="power-head"><strong>${power.name}</strong><span>${power.score}/100</span></div>
      <div class="bar"><span style="width:${power.score}%"></span></div>
    `;
    powerGrid.appendChild(item);
  });
}

function renderTimeline() {
  timeline.innerHTML = "";
  timelineEvents.forEach((event) => {
    const el = document.createElement("article");
    el.className = "event";
    el.innerHTML = `<strong>${event.year}</strong><p>${event.text}</p>`;
    timeline.appendChild(el);
  });
}

randomFactBtn.addEventListener("click", () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  toast.textContent = `${fact.title}: ${fact.text}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
});

const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const progressBar = document.getElementById("progressBar");

let idx = 0;
let score = 0;
let answered = false;

function renderQuiz() {
  answered = false;
  const current = quiz[idx];
  progressBar.style.width = `${(idx / quiz.length) * 100}%`;
  quizQuestion.textContent = `Frage ${idx + 1}/${quiz.length}: ${current.q}`;
  quizFeedback.textContent = "";
  quizAnswers.innerHTML = "";

  current.a.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => handleAnswer(i, btn));
    quizAnswers.appendChild(btn);
  });
}

function handleAnswer(i, btn) {
  if (answered) return;
  answered = true;
  const current = quiz[idx];
  const buttons = [...document.querySelectorAll(".answer-btn")];

  if (i === current.correct) {
    score += 1;
    btn.classList.add("correct");
    quizFeedback.textContent = "Stark! Das war richtig.";
  } else {
    btn.classList.add("wrong");
    buttons[current.correct].classList.add("correct");
    quizFeedback.textContent = `Knapp vorbei. Richtig ist: ${current.a[current.correct]}.`;
  }
}

nextQuestion.addEventListener("click", () => {
  if (idx < quiz.length - 1) {
    idx += 1;
    renderQuiz();
    return;
  }

  progressBar.style.width = "100%";
  quizQuestion.textContent = `Quiz beendet: ${score}/${quiz.length} Punkten.`;
  quizAnswers.innerHTML = "";
  quizFeedback.textContent = "Houba! Du kannst oben neue Fakten filtern und weiterstöbern.";
  nextQuestion.disabled = true;
  nextQuestion.style.opacity = "0.6";
  nextQuestion.style.cursor = "not-allowed";
});

renderStats();
renderFilters();
renderFacts();
renderPowers();
renderTimeline();
renderQuiz();
