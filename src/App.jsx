import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, ArrowRight, Headphones, Pause, Play, Tv, PenLine, Disc3 } from "lucide-react";
import "./App.css";

// ===== תמונות (תיקיית assets) =====
import bgImg from "./assets/images/background.png";
import profileImgIntro from "./assets/images/profile-intro.png";
import decorImg from "./assets/images/decor.png";
import profileImgAbout from "./assets/images/profile-about.png";

// ===== תמונות מסך הנושאים החדש (מ-Figma, node 1:393 "דף נושאים עידכון") =====
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

// ===== טקסט placeholder למסכי תוכן =====
const ABOUT_TEXT = [ ` 
אומרי חי בן משה הי"ד, נולד בערב ראש השנה, כ"ט באלול תשנ"ט (9.9.1999 )
בנם הבכור של רויטל סוזי ואורן אהרון, ואח לאילון, עמית ואביתר.
אומרי גדל והתחנך במושב צפריה.
כילד, היה סקרן ודעתן, אהב לחקור ולגלות עולמות חדשים, לטייל, ללמוד ולקרוא.
אומרי היה יצירתי ונהג לצייר ולכתוב מכתבים אישיים להוריו ולבני משפחתו.
מכתביו היו מלאי רגש, מחשבה וחום, והאירו את אישיותו הייחודית כבר מגיל צעיר.
בילדותו ובנעוריו, אומרי תמיד ביקש להבין את הדברים לעומק ואהבת הידע הפכה לחלק בלתי נפרד מאישיותו. 
בכיתה י' עבר ללמוד בתיכון מקיף יהוד ועם סיום לימודיו בחר בשירות משמעותי.

ב 18.3.2018 התגייס לצה"ל ושירת בחטיבת הצנחנים כלוחם בגדוד 890 .
בהמשך שימש כמ"כ (מפקד כיתה) יצא לקורס קצינים, ובסיומו קיבל פיקוד על פלוגת לוחמים.
לאחר מכן יצא ללימודים במכללה לפיקוד טקטי, במהלכם השלים תואר ראשון במדעי המדינה, צבא וביטחון באוניברסיטת חיפה.

במהלך לימודיו נישא להדס, ויחד זכו לגדל את שני ילדיהם: כַּּרְְמִִי ורוֹאִִי יִִצְְחָָק.

בבוקר השבעה באוקטובר, כשאומרי בתקופת לימודיו, הוא קפץ יחד עם חבריו ליישובי העוטף, לבארי - שם הקימו את "כוח בן מוש" אשר נלחם בגבורה וביצע משימות חילוץ רבות ונועזות, שבמהלכן הציל את חייהם של עשרות תושבים.
אומרי, כהרגלו, נהג בצניעות רבה ומיעט לספר כל כך בחייו. 
רגישותו המיוחדת באה לידי ביטוי כשהחליט לשחק עם הילדים המפונים במהלך החילוץ "מי מצליח לעצום הכי הרבה זמן עיניים", ובכך מנע מהם להיחשף למראות הזוועה הקשים שסביבם.

עם סיום לימודיו, מונה למפקד פלוגה א', בגדוד 890 והוביל את לוחמיו בקרבות בעזה, בלבנון ובסוריה.

בתום תפקידו כמ"פ, מונה למ"פ פלוגה א' בגדוד "דקל" בבית הספר לקצינים (בה"ד 1(.

בחודש אוגוסט 2025 התקבלה פקודה להפעלת גדוד דקל וחטיבת המילואים של בה"ד 1.

ביום חמישי, כ"ה באלול תשפ"ה (18.9.25) בשעה 9:11 בבוקר, במהלך משימה בדרום רצועת עזה, במזרח רפיח, בשכונת ג'ניינה, עלה ההאמר שבו נסעו החיילים על שלושה מטענים.
											
באירוע נהרגו רס"ן אומרי-חי בן משה, מפקד הפלוגה בגדוד דקל, אשר נהרג בעת שהוביל את חייליו בגבורה והוא בן 26 בלבד, ושלושה לוחמים: סגן רון אריאלי, סגן איתן אבנר בן יצחק וסגן ערן שלם".


אומרי היה אדם שחי מתוך אמונה ומוטיבציה עמוקה, תכונות שבאו לידי ביטוי בכל אורחות חייו. 
הוא הקפיד תמיד לעשות את המיטב, וחי את שליחותו בעולם מתוך אהבת האדם ואהבת הארץ.

היה איש של אנשים, בעל אנושיות מיוחדת ונוכחות מעצבת ומאחדת, הוא ידע לגשר בין דעות וגוונים שונים.
אומרי דבק באמת, חי חיי חסד ונתינה אין סופית והיה איש ספר ורוח.
היה עבור סובביו "איש אשר רוח בו".
אומרי חי את "הכאן ועכשיו" ופעל תמיד בשקט ובעוצמה.

אחד המשפטים שהיו נר לרגליו וליווה אותו בדרכו הפיקודית:
"באין חזון יפרע עם" (משלי כ"ט, י"ח – בהיעדר חזון והכוונה ערכית, העם מאבד כיוון(

אומרי היה מפקד נערץ ואהוב, כדברי חייליו "אגדה בחייו ובמותו".
חייליו אהבו ללכת אחריו, כי ידעו שיש מי שמקשיב להם, מסביר ומלמד.
מפקד שאפשר לסמוך עליו תמיד.

הוא מעולם לא התפשר על מקצועיות ודרש מעצמו את הרמה הגבוהה ביותר בהכל, עוד 
לפני שדרש זאת מאחרים.
אומרי הקפיד על סטנדרט גבוה ובלתי מתפשר, לא כהקפדה טכנית אלא כהכרח מבצעי.
כל דבר שעשה וביצע היה ביסודיות ובמקצועיות מיטבית.
לדבריו "על המפקד להיות אומן בפרטים הקטנים";
"קפדנות בפרטים הקטנים והמעצבנים מייצרת ביטחון ושקט".
אומרי למד והעמיק במקצוע הצבאי ובכל תחום אחר שבו עסק.
הוא הקפיד על אימונים, התאמן בריצה, ואף רץ מרתון.

סימן ההיכר של אומרי היה שמחת החיים והחיוך התמידי שעל פניו.
אומרי חייך לכל אדם, וניגש לכל משימה ולכל תחום בחייו בשמחה ובאנרגיה.
אומרי היה מחובר בכל מהותו לאדמת ארץ ישראל.
הוא ראה בטיול בה וביישובה הגשמה של חזון.

בכל הזדמנות היה אורז תיק ויוצא לטיול רגלי, לטבילה במעיין או לקפה במצפה.
הוא התרגש מציוץ הציפורים, מפכפוך מי הנחלים וממראה הפריחה.

אומרי, חי מתוך תחושת שליחות עמוקה לעם ישראל.
כל החלטה שקיבל וכל פעולה שעשה נבעו מהתחושה שהוא חלק מסיפור גדול כשליח של עם ישראל.

אומרי, חי את חייו מתוך סקרנות וחדוות למידה.
הוא למד בכל רגע פנוי, ולצד לימוד התורה הִִרְְבָָה לקרוא, לחקור ולהעמיק בהיסטוריה, בגיאוגרפיה, בדתות שונות ובתחומים רבים נוספים.
אהבת הידע הייתה חלק בלתי נפרד מזהותו.
אומרי, שהיה מחובר לאדמה וראה בנטיעתה ובבניינה ערך עמוק, האמין כי "צריך לנטוע כרמים ושדות בארץ ישראל" כדבריו, וברוח זו קרא לבתו ְְַכַּרמִִי.


כאדם שחי את החיים במלואם, גם את הזוגיות והאבהות ראה כמשימת חייו.
אומרי היה בעל מסור ואוהב לאשתו הדס, ויחד הם הקימו בית יהודי תורני.
ילדיו, כַּּרְְמִִי וְְרוֹאִִי יִִצְְחָָק, היו עבורו מקור אושר גדול.
הוא היה זמין עבורם, והקפיד להנחיל להם את הערכים והחזון המשותפים לו ולהדס.

שמחת החיים של אומרי, הראיה החיובית והאופטימיות שלו היו מדבקות.
האמונה בצדקת הדרך, הידיעה שאנחנו בתקופה חשובה וגורלית שבה שהדור שלנו כותב פרק משמעותי, ואולי החשוב ביותר בהיסטוריה של העם היהודי.
נהג לומר: "אנחנו כותבים את ההיסטוריה של עם ישראל, איזו זכות".

אומרי, חי את חייו באמונה גדולה בריבונו של עולם.
מתוך דרך של בירור וחקירה מצא את דרכו אל הקב״ה, ומאז דבק באמונה, באהבת האדם, בעשיית הטוב ובעזרה לזולת.
אומרי הקפיד להביט על המציאות בעין טובה ובחיוביות, מתוך ראיית התמונה הגדולה ומתוך כך ידע להתחזק בעצמו ולחזק אחרים.



יהי זכרו ברוך.
`];
const CURRICULUM_TEXT = Array(12).fill("מלל מלל מלל מלל").join("\n") + "\nמלל";
const PLACEHOLDER_BODY = Array(6).fill("מלל מלל מלל מלל מלל מלל").join("\n");

// ===== ציטוט למסך הנושאים החדש =====
const TOPICS_QUOTE =
  "“ מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל מלל “";

// ===== תמונות רקע + עיטור תחתון לכל עמוד נושא =====
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

const ROW_COLORS = ["#e7f2ee", "#bed2d1", "#ebdabc", "#fefefb", "#f2eadf"];

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

// =========================================================
// רספונסיביות גלובלית: כל העיצוב ב-CSS בנוי על מסגרת פיגמה
// קבועה בגודל 402x874. ה-hook הזה מחשב פקטור scale יחיד כך
// שהמסגרת הזו תמיד תיכנס בשלמותה למסך המכשיר (טלפון קטן,
// גדול, טאבלט, מחשב) בלי לשבור אף מיקום px - כי כל מה שבתוך
// הבמה גדל/קטן יחד כיחידה אחת. זה גם הפתרון לבאג הדפדוף
// במובייל: בלי wrapper כזה, 100vh לא תמיד תואם את גובה המסך
// האמיתי במובייל (בגלל סרגל הכתובת שמופיע/נעלם), והדף היה
// "קופץ" תוך כדי גרירה.
// =========================================================
const DESIGN_WIDTH = 402;
const DESIGN_HEIGHT = 874;

function useAppScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nextScale = Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT);
      setScale(nextScale);
    };

    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  return scale;
}

// =========================================================
// שכבת רקע שמכסה את כל מסך הטלפון (לא רק את מסגרת ה-402x874).
// היא "fixed" ליחס הגובה/רוחב של המכשיר עצמו, עם object-fit:
// cover, כך שגם אם המכשיר "רחב"/"צר" יותר מהיחס של מסגרת
// העיצוב, לא נראים פסים כהים בצדדים/מעל/מתחת - כל המסך מכוסה
// באותה תמונת רקע של המסך הנוכחי.
// =========================================================
function FullScreenBg({ src }) {
  if (!src) return null;
  return <img alt="" className="app-fullscreen-bg" src={src} />;
}

function AppScaleWrapper({ bgSrc, children }) {
  const scale = useAppScale();
  return (
    <div className="app-scale-viewport">
      <FullScreenBg src={bgSrc} />
      <div
        className="app-scale-stage"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

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

// ===== עוזר: מחלק טקסט ארוך ל"עמודים" =====
function paginateText(text, maxCharsPerPage) {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pages = [];
  let current = "";

  const pushCurrent = () => {
    if (current) {
      pages.push(current.trim());
      current = "";
    }
  };

  for (const para of paragraphs) {
    if (para.length > maxCharsPerPage) {
      const words = para.split(" ");
      let chunk = "";
      for (const w of words) {
        const candidate = chunk ? `${chunk} ${w}` : w;
        if (candidate.length > maxCharsPerPage) {
          const combined = current ? `${current}\n\n${chunk}` : chunk;
          if (combined.length > maxCharsPerPage) {
            pushCurrent();
            current = chunk;
          } else {
            current = combined;
          }
          pushCurrent();
          chunk = w;
        } else {
          chunk = candidate;
        }
      }
      if (chunk) {
        const combined = current ? `${current}\n\n${chunk}` : chunk;
        if (combined.length > maxCharsPerPage) {
          pushCurrent();
          current = chunk;
        } else {
          current = combined;
        }
      }
    } else {
      const candidate = current ? `${current}\n\n${para}` : para;
      if (candidate.length > maxCharsPerPage) {
        pushCurrent();
        current = para;
      } else {
        current = candidate;
      }
    }
  }
  pushCurrent();

  return pages.length ? pages : [text];
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

// ===== מסך: פתיח =====
function IntroScreen({ onStart }) {
  return (
    <div className="screen">
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

// ===== מסך: על אומרי - דפדוף עם חצים (+ עדיין אפשר גם swipe) =====
// דפדוף בין העמודים נעשה עם שני כפתורי חץ קבועים בתחתית הכרטיס.
// כל מעבר עמוד מציג אנימציית החלקה+דהייה קלה (לא flip תלת-ממדי).
// בנוסף עדיין אפשר לגלוש באצבע/עכבר על הכרטיס - זה נשאר כתוספת,
// לא כדרך היחידה לנווט.
// תיקון הדפדוף במובייל: ב-pointermove אנחנו "נועלים" כיוון
// (אופקי/אנכי) לפי התזוזה הראשונה, ואם ננעל כיוון אופקי - קוראים
// ל-preventDefault כדי לחסום את הדפדפן מלקחת את המחווה לגלילה
// אנכית טבעית (שגורמת ל-pointercancel ומבטלת את הגרירה).
const ABOUT_PAGE_CHAR_LIMIT = 560;
const SWIPE_MIN_DISTANCE = 40;
const SWIPE_DIRECTION_LOCK_THRESHOLD = 8;

function AboutScreen({ onNext }) {
  const pages = useMemo(
    () => paginateText(ABOUT_TEXT.join("\n\n"), ABOUT_PAGE_CHAR_LIMIT),
    []
  );
  const total = pages.length;

  const [pageIndex, setPageIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const dragStart = useRef(null);
  const dragDirection = useRef(null); // null | "horizontal" | "vertical"

  const goToPage = (index, direction) => {
    setPageIndex(index);
    setAnimClass(direction === "next" ? "anim-next" : "anim-prev");
  };

  const goNext = () => {
    if (pageIndex >= total - 1) {
      onNext();
      return;
    }
    goToPage(pageIndex + 1, "next");
  };

  const goPrev = () => {
    if (pageIndex <= 0) return;
    goToPage(pageIndex - 1, "prev");
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragDirection.current = null;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // אפשר להתעלם
      }
    }
  };

  const onPointerMove = (e) => {
    const start = dragStart.current;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    if (!dragDirection.current) {
      if (
        Math.abs(dx) > SWIPE_DIRECTION_LOCK_THRESHOLD ||
        Math.abs(dy) > SWIPE_DIRECTION_LOCK_THRESHOLD
      ) {
        dragDirection.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }
    }

    if (dragDirection.current === "horizontal" && e.cancelable) {
      e.preventDefault();
    }
  };

  const onPointerUp = (e) => {
    const start = dragStart.current;
    const direction = dragDirection.current;
    dragStart.current = null;
    dragDirection.current = null;
    if (!start) return;
    if (direction !== "horizontal") return;

    const dx = e.clientX - start.x;
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const onPointerCancel = () => {
    dragStart.current = null;
    dragDirection.current = null;
  };

  return (
    <div className="screen book-screen" dir="auto">
      <div className="book-header">
        <img
          alt='רס"ן אומרי חי בן משה'
          className="book-header-img"
          src={profileImgAbout}
        />
        <p className="book-header-title" dir="auto">
          רס"ן אומרי חי בן משה
        </p>
      </div>

      <div
        className="book-card"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerCancel}
      >
        <div
          key={pageIndex}
          className={`book-page-inner ${animClass}`}
          dir="auto"
          onAnimationEnd={() => setAnimClass("")}
        >
          {pages[pageIndex]}
        </div>

        <button
          type="button"
          className="book-nav-btn book-nav-prev"
          onClick={goPrev}
          disabled={pageIndex === 0}
          aria-label="העמוד הקודם"
        >
          <ArrowRight size={20} />
        </button>

        <div className="book-page-counter">
          {pageIndex + 1} / {total}
        </div>

        <button
          type="button"
          className="book-nav-btn book-nav-next"
          onClick={goNext}
          aria-label="העמוד הבא"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
}

// ===== מסך: על הלומדה =====
function CurriculumScreen({ onNext }) {
  return (
    <div className="screen screen-scroll">
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

// ===== רכיב: בועת נושא =====
function TopicBubble({ topic, onSelect }) {
  const { label, count, profileImg, halfCircleImg, top, left, width, wide } = topic;

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

// ===== רכיב: אייקון פלייסהולדר קטן לפי סוג תוכן =====
function TopicTypeIcon({ type, size = 18 }) {
  if (type === "song") return <Disc3 size={size} />;
  if (type === "video") return <Tv size={size} />;
  return <PenLine size={size} />;
}

// ===== מסך: עמוד נושא פרטני =====
function TopicDetailScreen({ topic, onBack, onSelectItem }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
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

// ===== מסך: תוכן תת-נושא מסוג "שיר" =====
function SongItemScreen({ topic, item, onBack }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const audio = audioRef.current;
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

// ===== מסך: תוכן תת-נושא מסוג "סרטון" =====
function VideoItemScreen({ topic, item, onBack }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
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

// ===== מסך: תוכן תת-נושא מסוג "טקסט" =====
function TextItemScreen({ topic, item, onBack }) {
  return (
    <div className="screen screen-scroll topic-detail-screen">
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

// ===== מסך: רשת נושאים =====
function TopicsScreen({ onAbout, onSelectTopic }) {
  return (
    <div className="screen screen-scroll topics2-screen">
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

  if (screen === "intro") content = <IntroScreen onStart={() => setScreen("topics")} />;
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

  // ===== קביעת תמונת הרקע של המסך הנוכחי (עבור שכבת הרקע במסך המלא) =====
  let currentBg = bgImg;
  if (screen === "topics") currentBg = topicsBg;
  else if ((screen === "topicDetail" || screen === "item") && selectedTopic) currentBg = selectedTopic.bgImg;

  return (
    <AppScaleWrapper bgSrc={currentBg}>
      <div className="app-root">{content}</div>
    </AppScaleWrapper>
  );
}