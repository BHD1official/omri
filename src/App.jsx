import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import bgImage from './assets/background.png';
import {
  User,
  Shield,
  Compass,
  Users,
  Scale,
  ScrollText
} from 'lucide-react';

/* ============================================
   CONSTANTS & DATA
   ============================================ */

const SENTENCE_SCREENS = [
  {
    id: 'first',
    label: 'משפט ראשון',
    quote: 'הוא לא רץ אל הסכנה כדי להיות גיבור. הוא רץ כי ידע שמישהו צריך.',
    body: 'מי שהכיר אותו מספר שזה היה הוא בדיוק כך — בלי הרבה מילים, רק מעשים. כשהיה צריך לקום, הוא קם ראשון.',
    buttonLabel: 'המשך'
  },
  {
    id: 'second',
    label: 'משפט שני',
    quote: 'הבית שלו היה בכל מקום שבו חבריו צעדו לצידו.',
    body: 'בקסדה ובמדים מצא את המשפחה השנייה שלו. הוא ידע להקשיב ולתת לאחרים להוביל.',
    buttonLabel: 'המשך'
  },
  {
    id: 'third',
    label: 'משפט שלישי',
    quote: 'הוא נפל בשדה הקרב, אך החיוך שלו נשאר איתנו.',
    body: 'כל מי שפגש בו זוכר משהו אחר — אבל כולם זוכרים את אותה תחושה.',
    buttonLabel: 'להמשך'
  }
];

const TYPING_SPEED = {
  base: 120,
  jitter: 80,
  space: 16
};

const ABOUT_CARDS = [
  {
    id: 'a1',
    text: '[כאן יבוא טקסט קצר על מי שהיה — מאיפה הוא ומה זוכרים ממנו]'
  },
  {
    id: 'a2',
    text: '[כאן יבוא פרק על השירות הצבאי והדרך שעבר]'
  },
  {
    id: 'a3',
    text: '[כאן יבוא פרק על האישיות והערכים שלו]'
  }
];

const TOPICS = [
  {
    id: 1,
    num: '01',
    label: 'תפקיד',
    icon: Compass
  },
  {
    id: 2,
    num: '02',
    label: 'תפקידים מבצעיים',
    icon: Shield
  },
  {
    id: 3,
    num: '03',
    label: 'ערכים וחברות',
    icon: Users
  },
  {
    id: 4,
    num: '04',
    label: 'מערכות ופיקוד',
    icon: Scale
  },
  {
    id: 5,
    num: '05',
    label: 'תיעוד אישי',
    icon: ScrollText
  }
];

const SUBTOPICS_BY_ID = {
  1: [
    'תיאור התפקיד',
    'תחומי אחריות',
    'הכשרה והסמכה'
  ],
  2: [
    'משימות מרכזיות',
    'אזורי פעילות',
    'שיתופי פעולה'
  ],
  3: [
    'טוהר הנשק',
    'רעות בשדה הקרב',
    'אמון בין לוחמים'
  ],
  4: [
    'מבנה הפיקוד',
    'מערכי תקשורת',
    'תהליכי החלטה'
  ],
  5: [
    'יומן אישי',
    'מכתבים ותמונות',
    'זכרונות מהבית'
  ]
};

/* ============================================
   SHARED COMPONENTS
   ============================================ */

function Cursor() {
  return <span className="cursor" />;
}

function Avatar({ size = 96 }) {
  const sizeClass = size === 85 ? 'avatar-small' : '';
  
  return (
    <div className={`avatar ${sizeClass}`}>
      <User size={size * 0.45} color="#83704c" />
    </div>
  );
}

function HillSVG() {
  return (
    <svg
      viewBox="0 0 360 90"
      className="hill-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        d="M0 55 C50 20 100 70 160 38 C220 8 280 60 360 28 L360 90 L0 90Z"
        fill="#d8c79b"
      /> */}
    </svg>
  );
}

function Frame({ children, tone = 'warm' }) {
  const toneClass = tone === 'cool' ? 'cool-tone' : 'warm-tone';

  return (
    <div className={`frame ${toneClass}`}>
      {tone === 'warm' && <HillSVG />}
      <div className="frame-content">{children}</div>
    </div>
  );
}

/* ============================================
   INTRO SCREEN
   ============================================ */

function IntroScreen({ onStart }) {
  return (
<div className="inner-card">


  <h2>הסיפור של אומרי</h2>



  <div className="intro-quote">

    <p className="intro-quote-text">
          <span className="intro-quote-icon">❝</span>

      האדם נמדד לא רק בדרכו, אלא גם בדרך שהשאיר לאחרים.
      <Cursor />
    </p>
  </div>



      <button className="btn-primary" onClick={onStart}>
    לחצו להתחלה כדי להתחיל את המסע
  </button>

</div>
  );
}

/* ============================================
   SENTENCE FLOW SCREEN
   ============================================ */

function SentenceFlow({ onFinish }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [segIndex, setSegIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timeoutRef = useRef(null);

  const current = SENTENCE_SCREENS[screenIndex];
  const segments = [current.quote, current.body];
  const totalChars = segments.reduce((sum, text) => sum + text.length, 0);

  // Main typing function
  const typeNext = useCallback(
    (si, ci) => {
      // If paused, stop here
      if (paused) return;

      // All segments done
      if (si >= segments.length) {
        setDone(true);
        setProgress(100);
        return;
      }

      const text = segments[si];

      // Current segment finished, move to next
      if (ci > text.length) {
        timeoutRef.current = setTimeout(() => {
          typeNext(si + 1, 0);
        }, 400);
        return;
      }

      // Update current position
      setSegIndex(si);
      setCharIndex(ci);

      // Calculate progress
      const typedChars = segments.slice(0, si).reduce((sum, t) => sum + t.length, 0) + ci;
      setProgress((typedChars / totalChars) * 100);

      // Schedule next character
      const ch = text[ci];
      const delay =
        ch === ' '
          ? TYPING_SPEED.space
          : TYPING_SPEED.base + Math.random() * TYPING_SPEED.jitter;

      timeoutRef.current = setTimeout(() => {
        typeNext(si, ci + 1);
      }, delay);
    },
    [paused, segments, totalChars]
  );

  // Start typing when screen changes
  useEffect(() => {
    setSegIndex(0);
    setCharIndex(0);
    setDone(false);
    setProgress(0);

    clearTimeout(timeoutRef.current);
    typeNext(0, 0);

    return () => clearTimeout(timeoutRef.current);
  }, [screenIndex]);

  // Resume typing when unpaused
  useEffect(() => {
    if (!paused && !done) {
      clearTimeout(timeoutRef.current);
      typeNext(segIndex, charIndex);
    }
  }, [paused]);

  // Move to next screen when done
  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        if (screenIndex < SENTENCE_SCREENS.length - 1) {
          setScreenIndex((i) => i + 1);
        } else {
          onFinish();
        }
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [done, screenIndex, onFinish]);

  const handleMouseDown = () => {
    setPaused(true);
    clearTimeout(timeoutRef.current);
  };

  const handleMouseUp = () => {
    setPaused(false);
  };

  return (
    <div
      className="sentence-flow-wrapper"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <Frame>
        {/* Progress Bars */}
        <div className="progress-bar-container">
          {SENTENCE_SCREENS.map((_, i) => {
            let width = 0;
            if (i < screenIndex) {
              width = 100;
            } else if (i === screenIndex) {
              width = progress;
            }

            return (
              <div key={i} className="progress-bar">
                <div
                  className={`progress-bar-fill ${paused ? 'paused' : 'playing'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Quote Card */}
        <div className="inner-card">
          <span className="quote-mark">"</span>

          <div className="sentence-content">
            {segments.map((text, i) => {
              let display = '';

              if (done || i < segIndex) {
                display = text;
              } else if (i === segIndex) {
                display = text.slice(0, charIndex);
              } else {
                return null;
              }

              return (
                <p key={i} className={i === 0 ? 'quote-text' : 'body-text'}>
                  {display}
                  {!done && i === segIndex && <Cursor />}
                </p>
              );
            })}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ============================================
   ABOUT SCREEN
   ============================================ */

function AboutScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const card = ABOUT_CARDS[index];

  function next() {
    if (index < ABOUT_CARDS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onFinish();
    }
  }

  return (
    <Frame>
      <div className="inner-card">
        <span className="about-label">על אומרי</span>
        <Avatar size={96} />
        <h3 className="about-name">רס"ן אומרי חי בן משה</h3>
        <p className="about-description">{card.text}</p>
      </div>

      <button className="btn-primary" onClick={next}>
        {index === ABOUT_CARDS.length - 1 ? 'להמשך' : 'המשך'}
      </button>
    </Frame>
  );
}

/* ============================================
   TOPICS SCREEN
   ============================================ */

function TopicButton({ topic, onClick }) {
  const Icon = topic.icon;

  return (
    <button className="btn-topic" onClick={onClick}>
      <Icon size={20} />
      <span>{topic.label}</span>
    </button>
  );
}

function TopicsScreen({ onSelect }) {
  return (
    <Frame tone="cool">
      <Avatar size={85} />
      <h2 className="topics-title">להכיר אותו לעומק</h2>

      <div className="topics-grid">
        {TOPICS.map((topic) => (
          <TopicButton
            key={topic.id}
            topic={topic}
            onClick={() => onSelect(topic)}
          />
        ))}
      </div>
    </Frame>
  );
}

/* ============================================
   SUBTOPICS SCREEN
   ============================================ */

function SubtopicsScreen({ topic, onBack }) {
  const Icon = topic.icon;
  const items = SUBTOPICS_BY_ID[topic.id] || [];

  return (
    <Frame>
      <button className="btn-back" onClick={onBack}>
        ←
      </button>

      <h3>{topic.label}</h3>

      <div className="subtopics-list">
        {items.map((item) => (
          <div key={item} className="subtopic-item">
            <Icon size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ============================================
   MAIN APP COMPONENT
   ============================================ */

export default function App() {
  const [mainScreen, setMainScreen] = useState('intro');
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="viewport">
        {mainScreen === 'intro' && (
          <IntroScreen onStart={() => setMainScreen('sentence')} />
        )}

        {mainScreen === 'sentence' && (
          <SentenceFlow onFinish={() => setMainScreen('about')} />
        )}

        {mainScreen === 'about' && (
          <AboutScreen onFinish={() => setMainScreen('topics')} />
        )}

        {mainScreen === 'topics' && (
          <TopicsScreen
            onSelect={(topic) => {
              setSelectedTopic(topic);
              setMainScreen('subtopics');
            }}
          />
        )}

        {mainScreen === 'subtopics' && selectedTopic && (
          <SubtopicsScreen
            topic={selectedTopic}
            onBack={() => setMainScreen('topics')}
          />
        )}
      </div>
    </div>
  );
}