import { useState } from "react";

const MAILCHIMP_ACTION_URL = "https://aprilmaycoaching.us3.list-manage.com/subscribe/post?u=6ebbfcb7cd3a7b75de589d891&id=1024340aec&f_id=00babee2f0";

function subscribeToMailchimp(email) {
  // Create a hidden iframe so the Mailchimp confirmation never shows
  const iframe = document.createElement("iframe");
  iframe.name = "mailchimp-hidden";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = MAILCHIMP_ACTION_URL;
  form.target = "mailchimp-hidden";

  const emailInput = document.createElement("input");
  emailInput.type = "hidden";
  emailInput.name = "EMAIL";
  emailInput.value = email;
  form.appendChild(emailInput);

  const honeypot = document.createElement("input");
  honeypot.type = "hidden";
  honeypot.name = "b_6ebbfcb7cd3a7b75de589d891_1024340aec";
  honeypot.value = "";
  form.appendChild(honeypot);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
  setTimeout(() => document.body.removeChild(iframe), 3000);
}


const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyySbTw8UbewmCgBeOcOVcSG79XTrDrbeMlpr-UP0ejoSOkvsZsRewTjQCTpO9U_mssPA/exec";

function saveToGoogleSheet(name, email, areas, temperature, overallScore, scores) {
  const params = [
    "email=" + encodeURIComponent(email),
    "temperature=" + encodeURIComponent(temperature),
    "overallScore=" + Math.round(overallScore),
    "owning=" + Math.round((scores.find(s => s.id === 1) || {}).pct || 0),
    "aliveness=" + Math.round((scores.find(s => s.id === 2) || {}).pct || 0),
    "naming=" + Math.round((scores.find(s => s.id === 3) || {}).pct || 0),
    "lettingGo=" + Math.round((scores.find(s => s.id === 4) || {}).pct || 0),
    "holdingParadoxes=" + Math.round((scores.find(s => s.id === 5) || {}).pct || 0),
    "creatingAgreements=" + Math.round((scores.find(s => s.id === 6) || {}).pct || 0),
    "gettingSupport=" + Math.round((scores.find(s => s.id === 7) || {}).pct || 0),
    "antifragility=" + Math.round((scores.find(s => s.id === 8) || {}).pct || 0),
    "playingWithLife=" + Math.round((scores.find(s => s.id === 9) || {}).pct || 0),
    "commitment=" + Math.round((scores.find(s => s.id === 10) || {}).pct || 0),
    "askingQuestions=" + Math.round((scores.find(s => s.id === 11) || {}).pct || 0),
    "seeingPossibilities=" + Math.round((scores.find(s => s.id === 12) || {}).pct || 0),
    "creating=" + Math.round((scores.find(s => s.id === 13) || {}).pct || 0),
  ].join("&");
  fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

const SPECTRUMS = [
  { id: 1, left: "Blaming", right: "Owning" },
  { id: 2, left: "Performance", right: "Aliveness" },
  { id: 3, left: "Hiding", right: "Naming" },
  { id: 4, left: "Clinging", right: "Letting Go" },
  { id: 5, left: "Taking Sides", right: "Holding Paradoxes" },
  { id: 6, left: "Expectation", right: "Creating Agreements" },
  { id: 7, left: "Doing It Alone", right: "Getting Support" },
  { id: 8, left: "Fragility", right: "Antifragility" },
  { id: 9, left: "Enduring Life", right: "Playing with Life" },
  { id: 10, left: "Hesitation", right: "Commitment" },
  { id: 11, left: "Looking for Answers", right: "Asking Questions" },
  { id: 12, left: "Picking from Options", right: "Seeing Possibilities" },
  { id: 13, left: "Consuming", right: "Creating" },
];

const SCENARIOS = [
  {
    id: 1,
    situation: "You're in a conversation — with a colleague, a friend, a manager. They say something you disagree with. You have a clear opinion about it. You:",
    spectrums: [2, 3, 9],
    options: [
      { text: "Let it go. You tell yourself it's not worth making it awkward.", score: 0 },
      { text: "Stay quiet in the moment but can't stop thinking about it afterward.", score: 1 },
      { text: "Say what you think, even if it makes the conversation uncomfortable.", score: 4 },
      { text: "Look for a way to bring your view in without it sounding like a direct challenge.", score: 2 },
    ],
  },
  {
    id: 2,
    situation: "You've been working with someone for a while. They keep doing something that frustrates you. You've never said anything directly. You:",
    spectrums: [1, 3, 6],
    options: [
      { text: "Work around it. You've adjusted your whole approach just to avoid the issue.", score: 0 },
      { text: "Bring it up — this is what's been happening, this is what works better for me, what works for you?", score: 4 },
      { text: "Have quietly decided they are just difficult and lowered your expectations.", score: 0 },
      { text: "Drop hints here and there, hoping they eventually get it.", score: 1 },
    ],
  },
  {
    id: 3,
    situation: "There's something you've been wanting to do — start something, change something, build something. You:",
    spectrums: [10, 12, 13],
    options: [
      { text: "Wait for the right time and the right circumstances.", score: 0 },
      { text: "Start researching. You want to go in prepared.", score: 1 },
      { text: "Talk to people about it to hear their thoughts.", score: 2 },
      { text: "Dive in and figure it out on the way.", score: 4 },
    ],
  },
  {
    id: 4,
    situation: "Something you counted on — a plan, a role, a relationship — falls apart unexpectedly. In the days that follow, you:",
    spectrums: [4, 7, 8],
    options: [
      { text: "Focus on getting back to normal as quickly as possible.", score: 1 },
      { text: "Keep functioning but something underneath isn't okay.", score: 1 },
      { text: "Start thinking about what this changes and what you do next.", score: 4 },
      { text: "Tell people you're fine. Meanwhile you're falling apart quietly.", score: 0 },
    ],
  },
  {
    id: 5,
    situation: "You're in a heated discussion. Two people you respect are on opposite sides and both are making valid points. You:",
    spectrums: [5, 7, 11],
    options: [
      { text: "Pick the stronger argument and go with it. Someone needs to move things forward.", score: 1 },
      { text: "Stay out of it. These situations rarely end well when you interfere.", score: 0 },
      { text: "Say that both sides are pointing at something real, even if it makes the conversation harder.", score: 4 },
      { text: "Try to find a middle ground. You want the tension to end.", score: 2 },
    ],
  },
  {
    id: 6,
    situation: "You're in a work-related or a social event. You're being nice and polite, as it's expected of you. But what you actually want to say or do is completely different. You:",
    spectrums: [2, 3, 9],
    options: [
      { text: "Keep being nice. You know you'll survive the event.", score: 0 },
      { text: "Feel something is off but can't quite put your finger on what you'd rather be doing.", score: 1 },
      { text: "Find one moment to say what you really want to say, even if it feels awkward.", score: 4 },
      { text: "Start calculating how much of your life is gone like this.", score: 2 },
    ],
  },
  {
    id: 7,
    situation: "A project you're leading isn't going well. The team isn't delivering. When you look at what's really happening, you:",
    spectrums: [1, 6, 10],
    options: [
      { text: "Feel frustrated that people are not doing their job as expected.", score: 0 },
      { text: "Realize you were never clear enough about what you actually needed.", score: 3 },
      { text: "Have already had the direct conversations — what needs to change, by when.", score: 4 },
      { text: "Know something needs to be said but keep waiting for the right moment.", score: 1 },
    ],
  },
  {
    id: 8,
    situation: "You've been working on a project for a while. It's not going the way you hoped. Deep down you know it might be time to let it go. You:",
    spectrums: [4, 5, 8],
    options: [
      { text: "Look at the facts seriously and make the call if the evidence is strong enough.", score: 3 },
      { text: "Let both possibilities exist for a while without forcing a decision.", score: 4 },
      { text: "Find reasons why this particular situation still has potential.", score: 0 },
      { text: "Start working on something else, hoping you can keep both going.", score: 1 },
    ],
  },
  {
    id: 9,
    situation: "You look at your week ahead. It's full. Most of it is things you agreed to or things people expect from you. Honestly, you feel:",
    spectrums: [9, 12, 13],
    options: [
      { text: "Fine. This is what a full life looks like.", score: 0 },
      { text: "Drained already just looking at it.", score: 1 },
      { text: "Frustrated. You know what you'd rather be doing but can't see how to get there.", score: 2 },
      { text: "Already making changes — cutting what doesn't belong, protecting what does.", score: 4 },
    ],
  },
  {
    id: 10,
    situation: "Someone comes to you with a problem they're stuck on. They've tried things. Nothing worked. You're listening and you already have an idea. You:",
    spectrums: [7, 11, 12],
    options: [
      { text: "Tell them what to do. You can see it clearly and they need help.", score: 0 },
      { text: "Ask what they've already tried before you say anything.", score: 2 },
      { text: "Ask what they actually want to end up with, not just what they're trying to fix.", score: 4 },
      { text: "Share what worked for you in something similar.", score: 1 },
    ],
  },
  {
    id: 11,
    situation: "A relationship that matters to you has been feeling off for a while. There's distance, something unspoken. You:",
    spectrums: [1, 3, 6],
    options: [
      { text: "Know what you want from them, but don't have the guts to say it.", score: 0 },
      { text: "Recognize that you're probably contributing to it too, even if they're also part of it.", score: 3 },
      { text: "Ask directly: \"Can we talk?\"", score: 4 },
      { text: "Give it time. These things usually sort themselves out.", score: 1 },
    ],
  },
  {
    id: 12,
    situation: "You have a free afternoon. Nothing urgent, nowhere to be. After a few minutes, you:",
    spectrums: [7, 9, 13],
    options: [
      { text: "Pick up your phone. You need to switch off before you can do anything useful.", score: 0 },
      { text: "Find something productive to do. Doing nothing makes you uncomfortable.", score: 1 },
      { text: "Let your mind go until something comes up that you actually want to do or make.", score: 4 },
      { text: "Make a list of things you've been meaning to get to.", score: 2 },
    ],
  },
  {
    id: 13,
    situation: "Something new is available to you — a role, a direction, an opportunity. Taking it means leaving something behind that has been part of you for a long time. You:",
    spectrums: [4, 10, 12],
    options: [
      { text: "Stay where you are. What you have is solid and you've worked hard for it.", score: 0 },
      { text: "Keep the new thing on the back burner while you figure out if you're really ready to let go.", score: 1 },
      { text: "Take it. You've known for a while the current thing has run its course.", score: 4 },
      { text: "Say yes before you've fully processed what you're leaving behind. You'll deal with that later.", score: 2 },
    ],
  },
];

const TEMPERATURES = [
  { label: "Frozen", range: [0, 20], color: "#4a90c4", description: "Most of the time, life is happening to you. You're reacting, managing, getting through. There's another way to move." },
  { label: "Cold", range: [20, 40], color: "#6aabda", description: "You're aware something isn't working but you're not quite moving yet. The gap between where you are and where you want to be is starting to show." },
  { label: "Warm", range: [40, 60], color: "#c87840", description: "You're in motion. Not always, not in every area — but you know the difference between reacting and creating, and you're choosing more often." },
  { label: "Hot", range: [60, 80], color: "#e06020", description: "You move. You name things, own things, create things. Not perfectly — but deliberately." },
  { label: "On Fire", range: [80, 101], color: "#ff4500", description: "You're not waiting for life to happen. You're making it move." },
];

function getTemperature(pct) {
  return TEMPERATURES.find(t => pct >= t.range[0] && pct < t.range[1]) || TEMPERATURES[4];
}

function getBarColor(pct) {
  if (pct <= 25) return "#4a90c4";
  if (pct <= 50) return "#8a9aaa";
  if (pct <= 75) return "#c87840";
  return "#e06020";
}

function computeResults(answers) {
  const spectrumData = {};
  SPECTRUMS.forEach(s => { spectrumData[s.id] = { total: 0, count: 0 }; });
  SCENARIOS.forEach(scenario => {
    const answerIdx = answers[scenario.id];
    if (answerIdx === undefined) return;
    const score = scenario.options[answerIdx].score;
    scenario.spectrums.forEach(sid => {
      spectrumData[sid].total += score;
      spectrumData[sid].count += 1;
    });
  });
  const scores = SPECTRUMS.map(s => ({
    ...s,
    score: spectrumData[s.id].count > 0 ? spectrumData[s.id].total / spectrumData[s.id].count : 2,
    pct: spectrumData[s.id].count > 0 ? (spectrumData[s.id].total / spectrumData[s.id].count / 4) * 100 : 50,
  }));
  const overall = scores.reduce((sum, s) => sum + s.pct, 0) / scores.length;
  const coldest = [...scores].sort((a, b) => a.pct - b.pct).slice(0, 3);
  const hottest = [...scores].sort((a, b) => b.pct - a.pct).slice(0, 3);
  return { scores, overall, coldest, hottest };
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [areas, setAreas] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function toggleArea(area) {
    setAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  }

  function handleSelect(idx) {
    if (!fading) setSelected(idx);
  }

  function handleNext() {
    if (selected === null || fading) return;
    setFading(true);
    const newAnswers = { ...answers, [SCENARIOS[current].id]: selected };
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < SCENARIOS.length) setCurrent(c => c + 1);
      else setPhase("email");
      setFading(false);
    }, 300);
  }

  function handleEmailSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !/\S+@\S+\.\S+/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    subscribeToMailchimp(trimmed);
    const r = computeResults(answers);
    const t = getTemperature(r.overall);
saveToGoogleSheet(name.trim(), trimmed, (areas || []).join('|'), t.label, r.overall, r.scores);
    setPhase("results");
  }

  const results = phase === "results" ? computeResults(answers) : null;
  const temp = results ? getTemperature(results.overall) : null;

  const base = {
    minHeight: "100vh",
    background: "#f5f0eb",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    color: "#1a1510",
  };

  const brand = {
    fontSize: 10,
    letterSpacing: "0.45em",
    textTransform: "uppercase",
    color: "#c87840",
    marginBottom: 48,
    fontFamily: "'Georgia', serif",
  };

  return (
    <div style={base}>

      {/* INTRO */}
      {phase === "intro" && (
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <div style={brand}>safaxperienx</div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 54px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 24, fontStyle: "italic" }}>
            How are you moving<br />through life?
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6a5f54", marginBottom: 12 }}>
            13 situations. No right answers.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#9a8f84", marginBottom: 56 }}>
            Pick the answer that feels most true —<br />not the one you wish were true.
          </p>
          <button
            onClick={() => setPhase("areas")}
            onMouseEnter={e => e.target.style.background = "#c87840"}
            onMouseLeave={e => e.target.style.background = "#1a1510"}
            style={{ background: "#1a1510", border: "none", color: "#f5f0eb", padding: "18px 52px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Georgia', serif", transition: "background 0.2s" }}
          >
            Start
          </button>
        </div>
      )}


      {/* AREA SELECTOR */}
      {phase === "areas" && (
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 48 }}>
            {SCENARIOS.map((_, i) => (
              <div key={i} style={{ height: 2, flex: 1, background: "#d8d0c8" }} />
            ))}
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#9a8f84", textTransform: "uppercase", marginBottom: 24 }}>
            Before we start
          </div>
          <p style={{ fontSize: "clamp(17px, 2.5vw, 20px)", lineHeight: 1.75, color: "#1a1510", marginBottom: 36 }}>
            Which area is not moving as you wish?
          </p>
          <p style={{ fontSize: 13, color: "#9a8f84", marginBottom: 28 }}>You can select more than one.</p>
          {["Work relationships", "Personal relationships", "Thoughts to action"].map(area => (
            <button
              key={area}
              onClick={() => toggleArea(area)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: areas.includes(area) ? "#1a1510" : "transparent",
                border: `1px solid ${areas.includes(area) ? "#1a1510" : "#c8bfb4"}`,
                color: areas.includes(area) ? "#f5f0eb" : "#4a3f34",
                padding: "17px 20px", marginBottom: 10, cursor: "pointer",
                fontSize: 15, lineHeight: 1.65,
                fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                transition: "all 0.15s", borderRadius: 1,
              }}
            >
              {area}
            </button>
          ))}
          <div style={{ textAlign: "right", marginTop: 24 }}>
            <button
              onClick={() => setPhase("questions")}
              style={{
                background: areas.length > 0 ? "#c87840" : "#d8d0c8",
                border: "none", color: areas.length > 0 ? "#fff" : "#9a8f84",
                padding: "14px 36px", fontSize: 11, letterSpacing: "0.25em",
                textTransform: "uppercase", cursor: areas.length > 0 ? "pointer" : "not-allowed",
                fontFamily: "'Georgia', serif", transition: "all 0.2s",
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      {phase === "questions" && (
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "60px 32px", opacity: fading ? 0 : 1, transition: "opacity 0.3s" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 48 }}>
            {SCENARIOS.map((_, i) => (
              <div key={i} style={{ height: 2, flex: 1, background: i <= current ? "#c87840" : "#d8d0c8", transition: "background 0.4s" }} />
            ))}
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#9a8f84", textTransform: "uppercase", marginBottom: 20 }}>
            {current + 1} / {SCENARIOS.length}
          </div>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", lineHeight: 1.75, color: "#1a1510", marginBottom: 36 }}>
            {SCENARIOS[current].situation}
          </p>
          <div>
            {SCENARIOS[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                onMouseEnter={e => { if (selected !== idx) { e.currentTarget.style.borderColor = "#1a1510"; e.currentTarget.style.color = "#1a1510"; } }}
                onMouseLeave={e => { if (selected !== idx) { e.currentTarget.style.borderColor = "#c8bfb4"; e.currentTarget.style.color = "#4a3f34"; } }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: selected === idx ? "#1a1510" : "transparent",
                  border: `1px solid ${selected === idx ? "#1a1510" : "#c8bfb4"}`,
                  color: selected === idx ? "#f5f0eb" : "#4a3f34",
                  padding: "17px 20px", marginBottom: 10, cursor: "pointer",
                  fontSize: 15, lineHeight: 1.65,
                  fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                  transition: "all 0.15s", borderRadius: 1,
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
          <div style={{ textAlign: "right", marginTop: 24 }}>
            <button
              onClick={handleNext}
              style={{
                background: selected !== null ? "#c87840" : "#d8d0c8",
                border: "none", color: selected !== null ? "#fff" : "#9a8f84",
                padding: "14px 36px", fontSize: 11, letterSpacing: "0.25em",
                textTransform: "uppercase", cursor: selected !== null ? "pointer" : "not-allowed",
                fontFamily: "'Georgia', serif", transition: "all 0.2s",
              }}
            >
              {current + 1 === SCENARIOS.length ? "See results" : "Next"}
            </button>
          </div>
        </div>
      )}

      {/* EMAIL CAPTURE */}
      {phase === "email" && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <div style={brand}>safaxperienx</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.3, marginBottom: 16 }}>
            Your results are ready.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6a5f54", marginBottom: 40 }}>
            Enter your email and I'll also send you a video explaining what your results mean.
          </p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: 15,
              fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
              border: "1px solid #c8bfb4",
              background: "transparent",
              color: "#1a1510",
              marginBottom: 10,
              boxSizing: "border-box",
              outline: "none",
              borderRadius: 1,
            }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleEmailSubmit()}
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: 15,
              fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
              border: "1px solid #c8bfb4",
              background: "transparent",
              color: "#1a1510",
              marginBottom: 8,
              boxSizing: "border-box",
              outline: "none",
              borderRadius: 1,
            }}
          />
          {emailError && (
            <p style={{ fontSize: 12, color: "#c87840", marginBottom: 16, textAlign: "left" }}>{emailError}</p>
          )}
          <button
            onClick={handleEmailSubmit}
            disabled={submitting}
            onMouseEnter={e => { if (!submitting) e.target.style.background = "#c87840"; }}
            onMouseLeave={e => { if (!submitting) e.target.style.background = "#1a1510"; }}
            style={{
              width: "100%",
              background: "#1a1510",
              border: "none",
              color: "#f5f0eb",
              padding: "16px",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: submitting ? "not-allowed" : "pointer",
              fontFamily: "'Georgia', serif",
              transition: "background 0.2s",
              marginTop: 8,
            }}
          >
            {submitting ? "One moment..." : "See my results"}
          </button>

        </div>
      )}

      {/* RESULTS */}
      {phase === "results" && results && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "80px 32px 120px" }}>
          <div style={brand}>safaxperienx</div>

          <div style={{ marginBottom: 56, paddingBottom: 48, borderBottom: "1px solid #d8d0c8" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a8f84", marginBottom: 14 }}>
              Your temperature
            </div>
            <div style={{ fontSize: "clamp(56px, 10vw, 86px)", fontWeight: 400, fontStyle: "italic", color: temp.color, lineHeight: 1, marginBottom: 22 }}>
              {temp.label}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#4a3f34", maxWidth: 460, marginBottom: 28 }}>
              {temp.description}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9a8f84", marginBottom: 6 }}>
              <span>Reactive</span><span>Creative</span>
            </div>
            <div style={{ height: 5, background: "#d8d0c8", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${results.overall}%`, background: `linear-gradient(90deg, #4a90c4, ${temp.color})`, borderRadius: 3 }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid #d8d0c8" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4a90c4", marginBottom: 18 }}>Most reactive</div>
              {results.coldest.map(s => (
                <div key={s.id} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: "#1a1510", marginBottom: 5, fontStyle: "italic" }}>{s.left} → {s.right}</div>
                  <div style={{ height: 3, background: "#d8d0c8", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: "#4a90c4", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e06020", marginBottom: 18 }}>Most creative</div>
              {results.hottest.map(s => (
                <div key={s.id} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: "#1a1510", marginBottom: 5, fontStyle: "italic" }}>{s.left} → {s.right}</div>
                  <div style={{ height: 3, background: "#d8d0c8", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: "#e06020", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowDetail(d => !d)}
            onMouseEnter={e => { e.target.style.borderColor = "#1a1510"; e.target.style.color = "#1a1510"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#c8bfb4"; e.target.style.color = "#4a3f34"; }}
            style={{ background: "transparent", border: "1px solid #c8bfb4", color: "#4a3f34", padding: "12px 28px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Georgia', serif", marginBottom: 32, transition: "all 0.2s" }}
          >
            {showDetail ? "Hide detail" : "See all dimensions"}
          </button>

          {showDetail && (
            <div style={{ marginBottom: 48 }}>
              {results.scores.map(s => (
                <div key={s.id} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9a8f84", marginBottom: 4 }}>
                    <span>{s.left}</span><span>{s.right}</span>
                  </div>
                  <div style={{ height: 4, background: "#d8d0c8", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: getBarColor(s.pct), borderRadius: 2, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <p style={{ fontSize: 22, fontStyle: "italic", color: "#c87840" }}>Move it.</p>
          </div>
        </div>
      )}
    </div>
  );
}
