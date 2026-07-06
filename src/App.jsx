import { useState, useEffect, useRef } from "react";
import "./App.css";

// ===== תמונות (תיקיית assets) =====
import bgImg from "./assets/images/background.png";
import profileImgIntro from "./assets/images/profile-intro.png";
import decorImg from "./assets/images/decor.png";
import profileImgAbout from "./assets/images/profile-about.png";

// ===== תוכן המשפטים =====
const SLIDE1_TEXTS = ["אנחנו כותבים את ההיסטוריה של עם ישראל , איזו זכות."];
const SLIDE2_TEXTS = [
  "על המפקד להיות אומן בפרטים הקטנים ",
  "קפדנות בפרטים הקטנים והמעצבנים מייצרת ביטחון ושקט",
];
const SLIDE3_TEXTS = [
  '"בזכות מסירות נפשן,בזכות הלכתן לפני המחנה , בעוז, עוצמה,וודאות  מוחלטת בטוב ההולך ומופיע ומתוך כך האומץ  והגבורה למסור את נפשם"',
];

// ===== הגדרות =====
const TYPING_SPEED = 120;

// ===== Hook: אפקט טייפרייטר =====
function useTypewriter(texts, active) {
  const [totalTyped, setTotalTyped] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const totalChars = texts.reduce((sum, t) => sum + t.length, 0);

  useEffect(() => {
    if (!active || paused) return;

    intervalRef.current = setInterval(() => {
      setTotalTyped((prev) => {
        if (prev >= totalChars) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_SPEED);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, paused, totalChars]);

  let remaining = totalTyped;

  const displayed = texts.map((t) => {
    const take = Math.min(remaining, t.length);
    remaining -= take;
    return t.slice(0, take);
  });

  return {
    displayed,
    progress: totalChars ? totalTyped / totalChars : 0,
    done: totalTyped >= totalChars,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}

// ===== רכיב: פס התקדמות =====
function ProgressBar({ progress, current }) {
  return (
    <div className="progress-bar-wrap" dir="rtl">
      {[0, 1, 2].map((i) => (
        <div key={i} className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width:
                i < current ? "100%" : i === current ? `${progress * 100}%` : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ===== רכיב: תמונת עיצוב תחתונה =====
function BgDecor() {
  return (
    <div className="bg-decor">
      <img alt="" className="bg-decor-img" src={decorImg} />
    </div>
  );
}

// ===== רכיב: כרטיס ציטוט =====
function QuoteCard({ top, height }) {
  return <div className="quote-card" style={{ top, height }} />;
}

// ===== רכיב: מרכאה פותחת =====
function OpeningQuote({ top }) {
  return (
    <p className="opening-quote" style={{ top }} dir="auto">
      "
    </p>
  );
}

// ===== רכיב: כפתור המשך =====
function NextButton({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="next-btn"
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <span className="next-btn-text">המשך !</span>
    </button>
  );
}

// ===== רכיב: רקע =====
function Bg() {
  return <img alt="" className="bg-fixed" src={bgImg} />;
}

// ===== מסך: פתיח =====
function IntroScreen({ onStart }) {
  return (
    <div className="screen">
      <Bg />
      <div className="intro-profile-wrap">
        <img alt='רס"ן אומרי חי בן משה' className="intro-profile-img" src={profileImgIntro} />
      </div>
      <div className="intro-name" dir="auto">
        <p>רס"ן אומרי חי</p>
        <p>בן משה הי"ד</p>
      </div>
      <div className="intro-dates" dir="auto">
        <p>נפל בכ"ה באלול תשפ"ה</p>
        <p>18.9.25</p>
      </div>
      <QuoteCard top={481} height={210} />
      <OpeningQuote top={492} />
      <p className="intro-quote-text" dir="auto">
        מבט אמוני , ריאלי ואופטימי
      </p>
      <button onClick={onStart} className="intro-start-btn">
        <span className="next-btn-text">להתחיל !</span>
      </button>
    </div>
  );
}

// ===== מסך: משפט ראשון =====
function Slide1({ onNext }) {
  const { displayed, progress, done, pause, resume } = useTypewriter(SLIDE1_TEXTS, true);
  return (
    <div
      className="screen"
      onMouseDown={pause}
      onMouseUp={resume}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <Bg />
      <ProgressBar progress={progress} current={0} />
      <QuoteCard top={148} height={284} />
      <OpeningQuote top={178.28} />
      <p className="slide-text" style={{ top: 256 }} dir="auto">
        {displayed[0]}
        <span className={`typing-cursor ${done ? "cursor-hidden" : "cursor-blink"}`} />
      </p>
      <BgDecor />
      {done && (
        <div className="next-btn-wrap" style={{ top: 480 }}>
          <NextButton onClick={onNext} />
        </div>
      )}
    </div>
  );
}

// ===== מסך: משפט שני =====
function Slide2({ onNext }) {
  const { displayed, progress, done, pause, resume } = useTypewriter(SLIDE2_TEXTS, true);

  return (
    <div
      className="screen"
      onMouseDown={pause}
      onMouseUp={resume}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <Bg />
      <ProgressBar progress={progress} current={1} />
      <QuoteCard top={148} height={251} />
      <OpeningQuote top={178.28} />
      <p className="slide-text" style={{ top: 239 }} dir="auto">
        {displayed[0]}
        {displayed[0].length < SLIDE2_TEXTS[0].length && (
          <span className="typing-cursor cursor-blink" />
        )}
      </p>
      <QuoteCard top={437} height={281} />
      <OpeningQuote top={467.28} />
      <p className="slide-text" style={{ top: 524 }} dir="auto">
        {displayed[1]}
        {displayed[1].length > 0 && displayed[1].length < SLIDE2_TEXTS[1].length && (
          <span className="typing-cursor cursor-blink" />
        )}
      </p>
      <BgDecor />
      {done && (
        <div className="next-btn-wrap" style={{ top: 760 }}>
          <NextButton onClick={onNext} />
        </div>
      )}
    </div>
  );
}

// ===== מסך: משפט שלישי =====
function Slide3({ onNext }) {
  const { displayed, progress, done, pause, resume } = useTypewriter(SLIDE1_TEXTS, true);

  return (
    <div
      className="screen"
      onMouseDown={pause}
      onMouseUp={resume}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <Bg />
      <ProgressBar progress={progress} current={2} />
      <QuoteCard top={148} height={564} />
      <OpeningQuote top={178.28} />
      <p className="slide-text slide-text-wrap" style={{ top: 239 }} dir="auto">
        {displayed[0]}
        {!done && <span className="typing-cursor cursor-blink" />}
      </p>
      <BgDecor />
      <div className="next-btn-wrap" style={{ top: 759 }}>
        <NextButton onClick={onNext} disabled={!done} />
      </div>
    </div>
  );
}

// ===== מסך: על אומרי =====
function AboutScreen() {
  return (
    <div className="screen screen-scroll">
      <Bg />
      <div className="about-card" />
      <p className="about-title" dir="auto">
        רס"ן אומרי חי בן משה
      </p>
      <div className="about-divider" />
      <div className="about-profile-wrap">
        <img alt='רס"ן אומרי חי בן משה' className="about-profile-img" src={profileImgAbout} />
      </div>
      <div className="about-bar" />
    </div>
  );
}

// ===== אפליקציה ראשית =====
export default function App() {
  const [screen, setScreen] = useState("intro");

  const screens = {
    intro: <IntroScreen onStart={() => setScreen("slide1")} />,
    slide1: <Slide1 onNext={() => setScreen("slide2")} />,
    slide2: <Slide2 onNext={() => setScreen("slide3")} />,
    slide3: <Slide3 onNext={() => setScreen("about")} />,
    about: <AboutScreen />,
  };

  return <div className="app-root">{screens[screen]}</div>;
}