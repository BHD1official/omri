import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Headphones, Pause, Play, Tv, PenLine, Disc3 } from "lucide-react";
import "./App.css";

// ===== תמונות (תיקיית assets) =====
import bgImg from "./assets/images/background.png";
import profileImgIntro from "./assets/images/profile-intro.png";
import decorImg from "./assets/images/decor.png";
import profileImgAbout from "./assets/images/profile-about.png";

// ===== תמונות מסך הנושאים החדש (מ-Figma, node 1:393 "דף נושאים עידכון") =====
// ⚠️ הקישורים האלה הם קישורי asset זמניים של פיגמה (בתוקף כ-7 ימים).
// תוריד את הקבצים ותשמור אותם ב-src/assets/images/topics/ ואז תחליף כל import
// בשורה כמו: import topicsBg from "./assets/images/topics/bg.png";
const topicsBg =
  "https://www.figma.com/api/mcp/asset/479cb980-4b60-4895-8e17-e4aa526bce04";
const topicsBottomDecor =
  "https://www.figma.com/api/mcp/asset/ca6fd6ec-65eb-4a64-9601-9c9dbefbe8f7";
const dotsGroup =
  "https://www.figma.com/api/mcp/asset/557565e1-7df3-4320-83e0-c4b9d910d47d";
const halfCircleBrown =
  "https://www.figma.com/api/mcp/asset/c5a0eaef-adda-459b-bc91-6b8c4023c83b";
const halfCircleBrown2 =
  "https://www.figma.com/api/mcp/asset/9a4aa6c0-85b4-455d-b874-9f776513b53a";
const profileValues =
  "https://www.figma.com/api/mcp/asset/b518b48a-799a-4f82-bcab-8f4a2a1ae71a";
const profileMilitary =
  "https://www.figma.com/api/mcp/asset/349e3335-0590-4c00-b506-311b8823467f";
const profileLeadership =
  "https://www.figma.com/api/mcp/asset/3f18a2aa-b023-4f72-a14c-d3272f9ed43f";
const profileGrowth =
  "https://www.figma.com/api/mcp/asset/b518b48a-799a-4f82-bcab-8f4a2a1ae71a";
const profileSociety =
  "https://www.figma.com/api/mcp/asset/d80e37bf-b2b4-4816-a821-0f21da541c39";

// ===== תוכן המשפטים =====
const SLIDE1_TEXTS = ["אנחנו כותבים את ההיסטוריה של עם ישראל , איזו זכות."];
const SLIDE2_TEXTS = [
  "על המפקד להיות אומן בפרטים הקטנים ",
  "קפדנות בפרטים הקטנים והמעצבנים מייצרת ביטחון ושקט",
];


const SLIDE3_TEXTS = [
  '"בזכות מסירות נפשן,בזכות הלכתן לפני המחנה , בעוז, עוצמה,וודאות  מוחלטת בטוב ההולך ומופיע ומתוך כך האומץ  והגבורה למסור את נפשם"',
];

// ===== טקסט placeholder למסכי תוכן (להחליף בטקסט האמיתי) =====
const ABOUT_TEXT = Array(12).fill("מלל מלל מלל מלל").join("\n");
const CURRICULUM_TEXT = Array(12).fill("מלל מלל מלל מלל").join("\n") + "\nמלל";
const PLACEHOLDER_BODY = Array(6).fill("מלל מלל מלל מלל מלל מלל").join("\n");

// ===== ציטוט למסך הנושאים החדש =====
const TOPICS_QUOTE =
  "“ מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל “";

// ===== תמונות רקע + עיטור תחתון לכל עמוד נושא (מ-Figma, לינקים זמניים - להחליף ל-import מקומי) =====
const topicBg = {
  values: "https://www.figma.com/api/mcp/asset/1747ebf8-21a4-41c2-9466-15c2e528afa1",
  military: "https://www.figma.com/api/mcp/asset/130cb352-162b-46e9-921e-8410577511ef",
  society: "https://www.figma.com/api/mcp/asset/982476d5-0624-49c1-aa39-1b0e6c4dc12d",
  growth: "https://www.figma.com/api/mcp/asset/913977a7-9cbb-414e-a9cc-1b0ec2bc5c67",
  leadership: "https://www.figma.com/api/mcp/asset/04962e14-c6a7-4b88-8264-22e0ab326644",
};
const topicBottomDecor = {
  values: "https://www.figma.com/api/mcp/asset/8100bbd5-1de8-48c5-883c-9486eb0d4081",
  military: "https://www.figma.com/api/mcp/asset/9ff48cfa-433c-4b8e-907c-d3587377a432",
  society: "https://www.figma.com/api/mcp/asset/6fbaed65-966d-494d-b0e6-e7351f703856",
  growth: "https://www.figma.com/api/mcp/asset/a8341e5e-f028-4914-a65c-eba7f2a3d585",
  leadership: "https://www.figma.com/api/mcp/asset/c4159b5d-a4da-4c6a-bb5d-c0d5bf3ccf33",
};

// צבעי השורות בכל עמוד נושא, לפי הסדר הקבוע שמופיע בעיצוב (חוזר במעגל)
const ROW_COLORS = ["#e7f2ee", "#bed2d1", "#ebdabc", "#fefefb", "#f2eadf"];

// ===== נושאים (מסך topics) - עודכן לפי העיצוב החדש בפיגמה =====
// items: תת-הנושאים שמופיעים בעמוד הפרטני של כל קטגוריה (בדיוק כמו שמעוצב בפיגמה)
// כל item מכיל type ("song" | "video" | "text") שקובע איזה עמוד תוכן ייפתח בלחיצה עליו.
// ⚠️ ה-type כאן הוא לדוגמה בלבד (אין עדיין רשימה סופית של כל הכותרות) - עדכן כשתדע את התוכן האמיתי.
const TOPICS = [
  {
    id: "values",
    label: "ערכים",
    count: 5,
    profileImg: profileValues,
    halfCircleImg: halfCircleBrown,
    top: 294,
    left: 217,
    width: 144,
    wide: false,
    bgImg: topicBg.values,
    bottomDecorImg: topicBottomDecor.values,
    items: [
      { id: "mission", label: "שליחות", type: "text" },
      {
        id: "purity",
        label: "טוהר הנשק",
        subtitle: "אבן מארץ ישראל",
        type: "song",
        heading: "הפקודה האחרונה לפלוגה 890",
        date: "12.03.2008",
        body:
          'תחנות לואי כן קודקוד, אנחנו בפקודה בפעם האחרונה, אני מסיים היום אה... תפקיד מ"פ א אין שבוז ממני, אני יותר שחור מכולכם ביחד תאמינו לי, אני עכשיו מסיים את תפקיד השיא שלי בחיי, להיות מ"פ א בגדוד 890, במלחמת התקומה.',
      },
      { id: "statemanship", label: "ממלכתיות", type: "text" },
      { id: "personal-example", label: "דוגמא אישית", type: "video" },
      { id: "right-path", label: "צדקת דרך", type: "text" },
    ],
  },
  {
    id: "military",
    label: "המקצוע הצבאי",
    count: 3,
    profileImg: profileMilitary,
    halfCircleImg: halfCircleBrown2,
    top: 294,
    left: 42,
    width: 144,
    wide: false,
    bgImg: topicBg.military,
    bottomDecorImg: topicBottomDecor.military,
    items: [
      { id: "top-five", label: 'מפק"ץ בגפן - TOP 5', type: "video" },
      { id: "war-summary", label: "סיכום מקצועי למלחמה", type: "text" },
      { id: "interview", label: "סיכום ריאיון", type: "video" },
    ],
  },
  {
    id: "leadership",
    label: "מנהיגות ופיקוד",
    // ⚠️ במסך רשימת הנושאים כתוב "6 נושאים", אבל בעמוד הפרטני בפיגמה מעוצבים כרגע רק 4 - עדכן כשיתווספו עוד
    count: 4,
    profileImg: profileLeadership,
    halfCircleImg: halfCircleBrown,
    top: 463,
    left: 42,
    width: 144,
    wide: false,
    bgImg: topicBg.leadership,
    bottomDecorImg: topicBottomDecor.leadership,
    items: [
      { id: "role-entry", label: "כניסה לתפקיד", subtitle: "מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל", type: "text" },
      { id: "procedures", label: "נהלים", subtitle: "מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל", type: "text" },
      { id: "command-spirit", label: "רוח המפקד", subtitle: "מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל", type: "video" },
      { id: "top-ten", label: "טופ 10 למפקד", type: "text" },
    ],
  },
  {
    id: "growth",
    label: "פיתוח אישי",
    count: 4,
    profileImg: profileGrowth,
    halfCircleImg: halfCircleBrown,
    top: 463,
    left: 217,
    width: 144,
    wide: false,
    bgImg: topicBg.growth,
    bottomDecorImg: topicBottomDecor.growth,
    items: [
      { id: "signature", label: "סדנת חותם אישי", type: "video" },
      { id: "goals", label: 'יעדים לבה"ד 1', type: "text" },
      { id: "approach", label: "תפיסה פיקודית", type: "text" },
      { id: "beginning", label: "תחילת הדרך", type: "video" },
    ],
  },
  {
    id: "society",
    label: "צבא וחברה",
    count: 5,
    profileImg: profileSociety,
    halfCircleImg: halfCircleBrown,
    top: 636,
    left: 41,
    width: 320,
    wide: true,
    bgImg: topicBg.society,
    bottomDecorImg: topicBottomDecor.society,
    items: [
      { id: "commitment", label: "בין מחוייבות צבאית לחוסן לאומי", type: "text" },
      { id: "society-strength", label: "כוחה של חברה בעמידה לצד המשרתים", type: "video" },
      { id: "unity", label: "כוחנו באחדותנו", type: "text" },
      { id: "example", label: "דוגמא אישית", type: "text" },
      { id: "path", label: "צדקת דרך", type: "song", heading: "צדקת הדרך", date: "01.01.2024" },
    ],
  },
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
{[0, 1].map((i) => (
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
function NextButton({ onClick, disabled = false, label = "המשך !" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="next-btn"
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <span className="next-btn-text">{label}</span>
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

// ===== מסך: על אומרי =====

function AboutScreen({ onNext }) {
  const [shrunk, setShrunk] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const shrinkTimer = setTimeout(() => setShrunk(true), 500);
    const textTimer = setTimeout(() => setTextVisible(true), 500 + 900); // אחרי שהאנימציה של התמונה מסתיימת
    const buttonTimer = setTimeout(() => setButtonEnabled(true), 500 + 900 + 4000); // כמה שניות אחרי שהטקסט מופיע
    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="screen screen-scroll">
      <Bg />
      <div className="about-card" />
      <p className="about-title" dir="auto">
        רס"ן אומרי חי בן משה
      </p>
      <div className="about-divider" />
      <div
        className={`about-profile-wrap ${shrunk ? "about-profile-small" : "about-profile-large"}`}
      >
        <img alt='רס"ן אומרי חי בן משה' className="about-profile-img" src={profileImgAbout} />
      </div>
      <p
        className={`content-text about-text-centered about-fade ${
          textVisible ? "about-fade-visible" : "about-fade-hidden"
        }`}
        dir="auto"
      >
        {ABOUT_TEXT}
      </p>
      <div className="content-next-btn-wrap">
        <NextButton onClick={onNext} disabled={!buttonEnabled} label="המשך !" />
      </div>
    </div>
  );
}

// ===== מסך: על הלומדה =====
function CurriculumScreen({ onNext }) {
  return (
    <div className="screen screen-scroll">
      <Bg />
      <div className="about-card" />
      <p className="about-title" dir="auto">
        על הלומדה
      </p>
      <div className="about-divider" />
      <p className="content-text curriculum-text" dir="auto">
        {CURRICULUM_TEXT}
      </p>
      <div className="content-next-btn-wrap">
        <NextButton onClick={onNext} label="הבנתי !" />
      </div>
    </div>
  );
}


// ===== רכיב: בועת נושא (מסך הנושאים החדש) =====
// כל בועה = תמונת פרופיל עגולה שחופפת לכרטיס גרדיאנט, "חצי עיגול" דקורטיבי בתפר,
// תווית, מונה נושאים וכפתור הרחבה קטן בפינה.
function TopicBubble({ topic, onSelect }) {
  const { label, count, profileImg, halfCircleImg, top, left, width, wide } = topic;

  // שתי "פרסטים" של יחסים פנימיים: כרטיס רגיל (144px) וכרטיס רחב (הכרטיס התחתון, 320px)
  const preset = wide
    ? { cardTop: 59, cardHeight: 142, labelTop: 114, countTop: 145, badgeTop: 158, arrowTop: 162 }
    : { cardTop: 59, cardHeight: 118, labelTop: 97, countTop: 128.5, badgeTop: 139.6, arrowTop: 143.78 };

  const height = preset.cardTop + preset.cardHeight;
  const profileSize = 94;
  const halfCircleW = 90.904;
  const halfCircleH = 35;

  return (
    <button
      className="topic-bubble"
      style={{ top, left, width, height }}
      onClick={() => onSelect(topic)}
      dir="auto"
    >
      <img
        alt=""
        className="topic-bubble-halfcircle"
        src={halfCircleImg}
        style={{
          top: preset.cardTop,
          left: (width - halfCircleW) / 2,
          width: halfCircleW,
          height: halfCircleH,
        }}
      />
      <div
        className="topic-bubble-card"
        style={{ top: preset.cardTop, height: preset.cardHeight }}
      />
      <img
        alt=""
        className="topic-bubble-profile"
        src={profileImg}
        style={{ left: (width - profileSize) / 2, width: profileSize, height: profileSize }}
      />
      <span className="topic-bubble-label" style={{ top: preset.labelTop }}>
        {label}
      </span>
      <span className="topic-bubble-count" style={{ top: preset.countTop }}>
        {count} נושאים
      </span>
      <span className="topic-bubble-badge" style={{ top: preset.badgeTop, left: 15 }} />
      <ArrowLeft
        className="topic-bubble-arrow"
        size={13}
        style={{ top: preset.arrowTop, left: 19.75 }}
      />
    </button>
  );
}

// ===== רכיב: אייקון פלייסהולדר קטן לפי סוג תוכן (וידאו / טקסט / שיר) =====
function TopicTypeIcon({ type, size = 18 }) {
  if (type === "song") return <Disc3 size={size} />;
  if (type === "video") return <Tv size={size} />;
  return <PenLine size={size} />;
}

// ===== מסך: עמוד נושא פרטני (ערכים / המקצוע הצבאי / צבא וחברה / פיתוח אישי / מנהיגות ופיקוד) =====
// רכיב גנרי אחד שמתאים לכל 5 העמודים, כי הם חולקים אותה תבנית עיצובית בפיגמה:
// רקע ייחודי לנושא, כרטיס לבן עם כותרת, רשימת שורות צבעוניות עם מספור גדול ברקע, וכפתור חזרה.
// כל שורה ניתנת ללחיצה - ולוחצים עליה עוברים לעמוד התוכן שלה (onSelectItem).
function TopicDetailScreen({ topic, onBack, onSelectItem }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
      <img alt="" className="topic-detail-bg" src={topic.bgImg} />

      <button className="topic-detail-back" onClick={onBack} aria-label="חזרה">
        <ArrowRight size={20} color="#0a1416" />
      </button>

      <div className="topic-detail-card">
        <div className="topic-detail-handle" />
        <p className="topic-detail-title" dir="auto">
          {topic.label}
        </p>
        <div className="topic-detail-divider" />

        <div className="topic-detail-list">
          {topic.items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="topic-detail-row"
              style={{ background: ROW_COLORS[i % ROW_COLORS.length] }}
              dir="rtl"
              onClick={() => onSelectItem(item)}
            >
              <span className="topic-detail-row-number">{String(i + 1).padStart(2, "0")}</span>
              <div className="topic-detail-row-text">
                <p className="topic-detail-row-label">{item.label}</p>
                {item.subtitle && <p className="topic-detail-row-subtitle">{item.subtitle}</p>}
              </div>
              {/* פלייסהולדר: אייקון לפי סוג התוכן, עד שתתווסף תמונה אמיתית לכל תת-נושא */}
              <span className="topic-detail-row-thumb">
                <TopicTypeIcon type={item.type} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="topics2-bottom-decor">
        <img alt="" className="topics2-bottom-decor-img" src={topic.bottomDecorImg} />
      </div>
    </div>
  );
}

// ===== מסך: תוכן תת-נושא מסוג "שיר" (בהשראת "קודקוד לואי" / "האזנה מופעלת") =====
function SongItemScreen({ topic, item, onBack }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const audio = audioRef.current;
    // ⚠️ אין עדיין קובץ שמע אמיתי (item.audioSrc) - כרגע רק מחליף מצב ויזואלית.
    // כשיהיה קובץ שמע, הוסף audioSrc ל-item והשמעה תעבוד בפועל.
    if (!audio || !item.audioSrc) {
      setPlaying((v) => !v);
      return;
    }
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying((v) => !v);
  };

  return (
    <div className="screen screen-scroll topic-detail-screen">
      <img alt="" className="topic-detail-bg" src={topic.bgImg} />

      <button className="topic-detail-back" onClick={onBack} aria-label="חזרה">
        <ArrowRight size={20} color="#0a1416" />
      </button>

      <div className="topic-detail-card item-card">
        <div className="topic-detail-handle" />

        {item.audioSrc && <audio ref={audioRef} src={item.audioSrc} onEnded={() => setPlaying(false)} />}

        <button className="item-listen-btn" onClick={toggle}>
          {playing ? <Pause size={20} fill="currentColor" /> : <Headphones size={20} />}
          <span>{playing ? "עצור" : "האזן"}</span>
        </button>

        <p className="topic-detail-title item-title" dir="auto">
          {item.label}
        </p>
        <div className="topic-detail-divider" />

        {item.date && <p className="item-date">{item.date}</p>}
        {item.heading && (
          <p className="item-heading" dir="auto">
            {item.heading}
          </p>
        )}

        <div className="item-audio-bar-wrap">
          <button className="item-audio-bar" onClick={toggle}>
            <span className="item-audio-bar-fill" style={{ width: playing ? "48%" : "0%" }} />
            <span className="item-audio-bar-play">
              {playing ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" />}
            </span>
          </button>
        </div>

        <p className="item-body" dir="auto">
          {item.body || PLACEHOLDER_BODY}
        </p>
      </div>

      <div className="topics2-bottom-decor">
        <img alt="" className="topics2-bottom-decor-img" src={topic.bottomDecorImg} />
      </div>
    </div>
  );
}

// ===== מסך: תוכן תת-נושא מסוג "סרטון" (פלייסהולדר טלוויזיה) =====
function VideoItemScreen({ topic, item, onBack }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
      <img alt="" className="topic-detail-bg" src={topic.bgImg} />

      <button className="topic-detail-back" onClick={onBack} aria-label="חזרה">
        <ArrowRight size={20} color="#0a1416" />
      </button>

      <div className="topic-detail-card item-card">
        <div className="topic-detail-handle" />
        <p className="topic-detail-title item-title" dir="auto">
          {item.label}
        </p>
        <div className="topic-detail-divider" />

        {item.videoSrc ? (
          <video controls className="item-video" src={item.videoSrc} />
        ) : (
          <div className="item-media-placeholder">
            <Tv size={56} strokeWidth={1.5} />
            <span>כאן יוצג הסרטון (פלייסהולדר)</span>
          </div>
        )}

        <p className="item-body" dir="auto">
          {item.body || PLACEHOLDER_BODY}
        </p>
      </div>

      <div className="topics2-bottom-decor">
        <img alt="" className="topics2-bottom-decor-img" src={topic.bottomDecorImg} />
      </div>
    </div>
  );
}

// ===== מסך: תוכן תת-נושא מסוג "טקסט" (פלייסהולדר "מישהו כותב") =====
function TextItemScreen({ topic, item, onBack }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
      <img alt="" className="topic-detail-bg" src={topic.bgImg} />

      <button className="topic-detail-back" onClick={onBack} aria-label="חזרה">
        <ArrowRight size={20} color="#0a1416" />
      </button>

      <div className="topic-detail-card item-card">
        <div className="topic-detail-handle" />
        <p className="topic-detail-title item-title" dir="auto">
          {item.label}
        </p>
        <div className="topic-detail-divider" />

        <div className="item-media-placeholder">
          <PenLine size={48} strokeWidth={1.5} />
          <span>כאן תוצג תמונה של מישהו כותב (פלייסהולדר)</span>
        </div>

        <p className="item-body" dir="auto">
          {item.body || PLACEHOLDER_BODY}
        </p>
      </div>

      <div className="topics2-bottom-decor">
        <img alt="" className="topics2-bottom-decor-img" src={topic.bottomDecorImg} />
      </div>
    </div>
  );
}

// ===== מסך: רשת נושאים (עודכן לפי Figma "דף נושאים עידכון") =====
function TopicsScreen({ onAbout, onSelectTopic }) {
  return (
    <div className="screen screen-scroll topics2-screen">
      <img alt="" className="topics2-bg" src={topicsBg} />

      <p className="topics2-title" dir="auto">
        לומדה לזכרו של רס"ן אומרי בן משה הי'ד
      </p>

      <button className="topics2-quote-wrap" onClick={onAbout}>
        <QuoteCard top={155} height={139} />
        <OpeningQuote top={175} />
        <p className="topics2-quote-text" dir="auto">
          {TOPICS_QUOTE}
        </p>
      </button>

      <img alt="" className="topics2-dots" src={dotsGroup} />

      {TOPICS.map((topic) => (
        <TopicBubble key={topic.id} topic={topic} onSelect={onSelectTopic} />
      ))}

      <div className="topics2-bottom-decor">
        <img alt="" className="topics2-bottom-decor-img" src={topicsBottomDecor} />
      </div>
    </div>
  );
}

// ===== אפליקציה ראשית =====
export default function App() {
  const [screen, setScreen] = useState("intro");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const selectedTopic = TOPICS.find((t) => t.id === selectedTopicId) || null;
  const selectedItem =
    (selectedTopic && selectedTopic.items.find((it) => it.id === selectedItemId)) || null;

  const handleSelectTopic = (topic) => {
    setSelectedTopicId(topic.id);
    setScreen("topicDetail");
  };

  const handleSelectItem = (item) => {
    setSelectedItemId(item.id);
    setScreen("item");
  };

  const backToTopics = () => setScreen("topics");
  const backToTopicDetail = () => setScreen("topicDetail");

  let content = null;

  if (screen === "intro") content = <IntroScreen onStart={() => setScreen("slide1")} />;
  else if (screen === "slide1") content = <Slide1 onNext={() => setScreen("slide2")} />;
  else if (screen === "slide2") content = <Slide2 onNext={() => setScreen("about")} />;
  else if (screen === "about") content = <AboutScreen onNext={() => setScreen("curriculum")} />;
  else if (screen === "curriculum") content = <CurriculumScreen onNext={() => setScreen("topics")} />;
  else if (screen === "topics")
    content = <TopicsScreen onAbout={() => setScreen("about")} onSelectTopic={handleSelectTopic} />;
  else if (screen === "topicDetail" && selectedTopic)
    content = (
      <TopicDetailScreen topic={selectedTopic} onBack={backToTopics} onSelectItem={handleSelectItem} />
    );
  else if (screen === "item" && selectedTopic && selectedItem) {
    if (selectedItem.type === "song")
      content = <SongItemScreen topic={selectedTopic} item={selectedItem} onBack={backToTopicDetail} />;
    else if (selectedItem.type === "video")
      content = <VideoItemScreen topic={selectedTopic} item={selectedItem} onBack={backToTopicDetail} />;
    else content = <TextItemScreen topic={selectedTopic} item={selectedItem} onBack={backToTopicDetail} />;
  }

  return <div className="app-root">{content}</div>;
}