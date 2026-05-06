import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiMiniSpeakerWave,HiMiniSpeakerXMark } from "react-icons/hi2";
import "./App.css";

import sareeImg from "./assets/saree.jpeg";
import firstTalkImg from "./assets/first talk.webp";
import selfieImg from "./assets/selfie.jpeg";
import firstTripImg from "./assets/first trip.jpeg";
import dressImg from "./assets/Dress.jpeg";
import strongImg from "./assets/strong.jpeg";
import firstChallengeImg from "./assets/first challenge.webp";
import gltiGif from "./assets/glti.gif";
import cuteGif from "./assets/cute.gif";
import kissGif from "./assets/kiss.gif";
import thanksImg from "./assets/Thanks.jpeg";
import musicFile from "./assets/Qayde-se.mp3";

type HeartBurst = { id: number; x: number; y: number };
type LetterProps = { active: boolean };
type ToastType = "success" | "error";
type ToastState = { message: string; type: ToastType } | null;

type Memory = {
  title: string;
  caption: string;
  image: string;
};

const HER_NAME = "Anju";
const SPECIAL_DATE = "0604";
const BIRTHDAY_THIS_YEAR = new Date("2026-05-07T00:00:00");
const REQUIRE_COUNTDOWN_TO_UNLOCK = false; // Set to false to allow opening anytime
const REQUIRE_PERFECT_SCORE_TO_ADVANCE = true; // Set to false to allow moving forward without a perfect quiz score
const ENVELOPE_PAGE_INDEX = 0;
const PASSWORD_PAGE_INDEX = 1;
const QUIZ_PAGE_INDEX = 4;

const memories: Memory[] = [
  {
    title: "Heyyy Gorgeous🫶🏽",
    caption:
      "You look so cute in this😘. Pllllzzzzzzzz wear a saree, pic itti sundr hai, real mei toh behosh he ho jaunga madam🫶🏽🥹",
    image: sareeImg,
  },
  {
    title: "Our First Call🤙🏽",
    caption:
      "Too nervous to talk but excited when you asked me🫶🏽. Never thought I could talk for 5 hrs, it was as easy as breathing 😘 ",
    image: firstTalkImg,
  },
  {
    title: "Our First mirror selfie😘",
    caption:
      "and now there's no stopping us🫶🏽...although we need to explore some more poses",
    image: selfieImg,
  },
  {
    title: "Our memorable trip🫶🏽",
    caption:
      "I wanted to give you the best college trip, but apne toh muje hee meri best trip dedi. Thanks for giving me the most memorable trip of my college life🫂 ",
    image: firstTripImg,
  },
  {
    title: "Exhausted but beautiful🫶🏽🥹",
    caption:
      "Looks so much in pain but still gave 100% for team. They won because of you and not the dress. Proud of you🫂",
    image: dressImg,
  },
  {
    title: "My strong girl🫂",
    caption: `I know you're very strong and don't need anyone to depend on but you are free to share anything with me🫶🏽.`,
    image: strongImg,
  },
  {
    title: "The challenge💪🏽",
    caption:
      "You look so cute doing this🥹🫶🏽. Waiting for another challenge😘",
    image: firstChallengeImg,
  },
  {
    title: "Sb snehil saxena ki galti hai🤓",
    caption:
      "Meri he toh glti hoti hamesha😘. Nai bi hogi tobi maan lunga, apke liye kuch bi🫶🏽",
    image: gltiGif,
  },
];
const futurePlans = [
  "Watch Spider-Man: Brand New Day wiht you💪🏽",
  "Dance with you on Tum se hi🫶🏽",
  "Give you more kisses and hugs so that you miss me more everyday😘",
  "Go on a trip with you to a place of your choice.",
  "Celebrating your next birthday together🥹🫶🏽.",
  "Complete our 2026 bucket list"
  
];

const pageAnimation = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

function SoundIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <HiMiniSpeakerXMark/>
  ) : (
    <HiMiniSpeakerWave/>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-heart">
      <path
        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.08A6.01 6.01 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
        fill="currentColor"
      />
    </svg>
  );
}

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [heartBursts, setHeartBursts] = useState<HeartBurst[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [envelopeUnlocked, setEnvelopeUnlocked] = useState(!REQUIRE_COUNTDOWN_TO_UNLOCK);
  const [quizPerfectUnlock, setQuizPerfectUnlock] = useState(!REQUIRE_PERFECT_SCORE_TO_ADVANCE);
  const audioRef = useRef<HTMLAudioElement>(null);

  const pages = useMemo(
    () => [
      <EnvelopePage key="envelope" isDarkMode={isDarkMode} onUnlock={() => setEnvelopeUnlocked(true)} onContinue={() => setPageIndex(1)} />,
      <PasswordPage
        key="password"
        isDarkMode={isDarkMode}
        onUnlock={() => {
          setIsUnlocked(true);
          setPageIndex(2);
        }}
      />,
      <LandingPage key="landing" isDarkMode={isDarkMode} onStart={() => setPageIndex(3)} />,
      <MemoryTimelinePage key="memories" isDarkMode={isDarkMode} />,
      // <GiftRevealPage key="gift" />,
      <InteractivePage
      key="interactive"
      isDarkMode={isDarkMode}
      onPerfectUnlockChange={setQuizPerfectUnlock}
      onNextPage={() => goToPage("next")}
      />,
      <MessagePage key="message" isDarkMode={isDarkMode} />,
      <FuturePage key="future" isDarkMode={isDarkMode} />,
      <LoveLetterPage key="letter" active={pageIndex === 7} isDarkMode={isDarkMode} />,
      <ThankYouPage key="thanks" isDarkMode={isDarkMode} />,
    ],
    [pageIndex, isDarkMode],
  );

  const canGoPrev = pageIndex > 0;
  const canGoNext =
    pageIndex < pages.length - 1 &&
    ((pageIndex === ENVELOPE_PAGE_INDEX && envelopeUnlocked) ||
      (pageIndex === PASSWORD_PAGE_INDEX && isUnlocked) ||
      (pageIndex === QUIZ_PAGE_INDEX && quizPerfectUnlock) ||
      (pageIndex > PASSWORD_PAGE_INDEX && pageIndex !== QUIZ_PAGE_INDEX));

  const safePlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch {
      // Browsers may block autoplay until user interaction.
    }
  };

  const handleMuteToggle = async () => {
    setIsMuted((prev) => !prev);
    await safePlay();
  };

  const addBurstHeart = (event: React.PointerEvent<HTMLDivElement>) => {
    const burst: HeartBurst = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: event.clientX,
      y: event.clientY,
    };

    setHeartBursts((prev) => [...prev, burst]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((heart) => heart.id !== burst.id));
    }, 1800);
  };

  const goToPage = (direction: "next" | "prev") => {
    setPageIndex((current) => {
      if (direction === "next") {
        const next = current + 1;
        if (next > pages.length - 1) return current;
        if (!envelopeUnlocked && current === ENVELOPE_PAGE_INDEX) return current;
        if (!isUnlocked && current === PASSWORD_PAGE_INDEX) return current;
        if (current === QUIZ_PAGE_INDEX && !quizPerfectUnlock) return current;
        return next;
      }
      const previous = current - 1;
      return previous < 0 ? 0 : previous;
    });
  };

  useEffect(() => {
    void safePlay();
  }, []);

  return (
    <div
      className={`relative min-h-[100svh] overflow-hidden text-[#422b3e] transition-colors duration-300 ${
        isDarkMode
          ? "bg-[radial-gradient(circle_at_top,_#1a1a2e,_#16213e_45%,_#0f3460)]"
          : "bg-[radial-gradient(circle_at_top,_#ffddea,_#f6ebff_45%,_#f8f1e8)]"
      } ${isDarkMode ? "text-white" : ""}`}
      onPointerDown={addBurstHeart}
    >
      <audio ref={audioRef} loop muted={isMuted} preload="auto" playsInline>
        <source
          src={musicFile}
          type="audio/mpeg"
        />
      </audio>

      <FloatingBackground />

      <button
        className="control-btn fixed left-4 top-4 z-30 px-3"
        onClick={() => setIsDarkMode(!isDarkMode)}
        type="button"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <button
        className="control-btn fixed right-4 top-4 z-30 px-3"
        onClick={() => void handleMuteToggle()}
        type="button"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <SoundIcon muted={isMuted} />
      </button>

      <AnimatePresence mode="wait">
        <motion.main
          key={pageIndex}
          variants={pageAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl items-center px-4 pb-28 pt-20"
        >
          {pages[pageIndex]}
        </motion.main>
      </AnimatePresence>

      <nav className="pointer-events-none fixed bottom-6 left-0 right-0 z-30 mx-auto flex w-fit items-center gap-4">
        <button
          className="control-btn pointer-events-auto disabled:opacity-45"
          onClick={() => goToPage("prev")}
          type="button"
          disabled={!canGoPrev}
          aria-label="Previous page"
        >
          &#8592;
        </button>
        <p className="pointer-events-auto rounded-full bg-[#fff7fcaa] px-4 py-2 text-sm font-semibold text-[#8a4f76] backdrop-blur-sm">
          {pageIndex + 1} / {pages.length}
        </p>
        <button
          className="control-btn pointer-events-auto disabled:opacity-45"
          onClick={() => goToPage("next")}
          type="button"
          disabled={!canGoNext}
          aria-label="Next page"
        >
          &#8594;
        </button>
      </nav>

      <div className="pointer-events-none fixed inset-0 z-20">
        {heartBursts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500"
            initial={{ opacity: 1, y: heart.y, x: heart.x, scale: 0.8 }}
            animate={{ opacity: 0, y: heart.y - 120, x: heart.x + 10, scale: 1.5 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <HeartIcon />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FloatingBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${8 + Math.random() * 5}s`,
        symbol: index % 3 === 0 ? "🥳" : "💓",
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="floating-particle absolute bottom-[-12%] text-pink-900/65"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
}

function PageCard({
  title,
  subtitle,
  children,
  isDarkMode = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isDarkMode?: boolean;
}) {
  return (
    <motion.section
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`w-full rounded-[28px] border p-5 shadow-[0_15px_45px_rgba(123,76,103,0.18)] backdrop-blur-sm transition-colors duration-300 sm:p-8 ${
        isDarkMode
          ? "border-gray-600 bg-gray-800/80 text-white"
          : "border-white/40 bg-[#fff9fbcc] text-[#422b3e]"
      }`}
    >
      <h1 className={`font-['Great_Vibes',cursive] text-4xl leading-tight sm:text-5xl ${
        isDarkMode ? "text-pink-300" : "text-[#b23f79]"
      }`}>
        {title}
      </h1>
      {subtitle ? (
        <p className={`mt-2 text-sm leading-relaxed sm:text-base ${
          isDarkMode ? "text-gray-300" : "text-[#6f4c62]"
        }`}>{subtitle}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

function EnvelopePage({ isDarkMode = false, onUnlock, onContinue }: { isDarkMode?: boolean; onUnlock: () => void; onContinue: () => void }) {
  const [remaining, setRemaining] = useState("");
    const [canOpen, setCanOpen] = useState(!REQUIRE_COUNTDOWN_TO_UNLOCK);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = BIRTHDAY_THIS_YEAR.getTime() - now.getTime();
      if (diff <= 0) {
        setRemaining("It's time! Open your surprise now! 🎉");        setCanOpen(true);
        onUnlock();
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setRemaining(`${days}d ${hours}h ${mins}m until you can open this`);
    };
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [onUnlock]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full text-center">
        {/* Envelope Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <svg
            viewBox="0 0 200 140"
            className={`h-40 w-40 ${
              isDarkMode ? "text-pink-300" : "text-[#b23f79]"
            }`}
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
          >
            {/* Envelope body */}
            <rect x="20" y="30" width="160" height="110" rx="8" />
            {/* Top flap line */}
            <line x1="20" y1="30" x2="100" y2="80" />
            <line x1="180" y1="30" x2="100" y2="80" />
            {/* Center horizontal line */}
            <line x1="20" y1="30" x2="180" y2="30" />
          </svg>
        </motion.div>

        {/* Click to Open Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-['Great_Vibes',cursive] text-5xl mb-4 ${
            isDarkMode ? "text-pink-300" : "text-[#b23f79]"
          }`}
        >
          Click to Open
        </motion.h2>

        {/* Countdown Timer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-lg font-semibold mb-8 ${
            isDarkMode ? "text-gray-300" : "text-[#6f4c62]"
          }`}
        >
          {remaining}
        </motion.p>

        {/* Open Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={canOpen ? { scale: 1.05 } : {}}
          whileTap={canOpen ? { scale: 0.95 } : {}}
          disabled={!canOpen}
          onClick={() => {
            if (canOpen) {
              onUnlock();
              onContinue();
            }
          }}
          type="button"
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            canOpen
              ? isDarkMode
                ? "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
                : "bg-[#b23f79] hover:bg-[#8e2d5f] text-white cursor-pointer"
              : isDarkMode
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {canOpen ? "Open Now 💌" : "Locked 🔒"}
        </motion.button>

        {!canOpen && (
          <p className={`mt-4 text-sm ${isDarkMode ? "text-gray-400" : "text-[#8a4f76]"}`}>
            You can proceed to the next page once the countdown reaches zero!
          </p>
        )}
      </div>
    </div>
  );
}

function PasswordPage({ onUnlock, isDarkMode = false }: { onUnlock: () => void; isDarkMode?: boolean }) {
  const [value, setValue] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const unlock = () => {
    if (value === SPECIAL_DATE) {
      showToast("Noooiccee😘🫶🏽...you can move to the next page now", "success");
      onUnlock();
      return true;
    }
    showToast("Awww....try again😘", "error");
  };

  return (
    <PageCard
      title={`For ${HER_NAME}`}
      subtitle="Tiny lock for a big heart. Enter our special date to continue."
      isDarkMode={isDarkMode}
    >
      <label className="mb-2 block text-left text-sm font-semibold text-[#734965]" htmlFor="special-date">
        Enter our special date
      </label>
      <input
        id="special-date"
        value={value}
        inputMode="numeric"
        maxLength={4}
        onChange={(event) => setValue(event.target.value.replace(/\D/g, ""))}
        placeholder="DDMM"
        className="w-full rounded-2xl border border-pink-200 bg-white/95 px-4 py-3 text-lg outline-none transition focus:border-pink-400"
      />
      <button className="romantic-btn mt-4 w-full" onClick={unlock} type="button">
        Unlock Surprise
      </button>
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`toast-inline mt-3 ${toast.type === "success" ? "toast-success" : "toast-error"}`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageCard>
  );
}

function LandingPage({ onStart, isDarkMode = false }: { onStart: () => void; isDarkMode?: boolean }) {
  return (
    <PageCard
      title={`Hey ${HER_NAME}, this is just for you`}
      subtitle="Every page is one little piece of us."
      isDarkMode={isDarkMode}
    >
      <div className="rounded-3xl bg-[linear-gradient(145deg,_#ffd4e8,_#f0dcff)] p-6 text-center shadow-inner">
        <p className="font-['Nunito',sans-serif] text-xl text-[#6b3a58]">
          Happy birthday, cutieee🫶🏽. 
        </p>
        <p className="font-['Nunito',sans-serif] text-md text-[#6b3a58]">
        Can't be with you today but atleast I can make your day special with our memories.
        </p>
        {/* <div className="absolute -inset-2 rounded-[28px] bg-[conic-gradient(from_140deg_at_50%_50%,#f9a8d4,#fde68a,#c4b5fd,#f9a8d4)] opacity-70 blur-md" /> */}
          {/* <div className="relative overflow-hidden rounded-[24px] border-2 border-white/70 bg-white/60 p-2 shadow-2xl backdrop-blur-sm">
            <img
              src="src/assets/cute.gif"
              alt="cute"
              className="h-[370px] w-full rounded-[18px] object-cover sm:h-[430px]"
            />
          </div> */}
          <div className="flex justify-center">

        <img src={cuteGif} alt="cute" className="rounded-[18px] object-cover sm:h-[430px] object-contain"></img>
          </div>
        <button className="romantic-btn mt-6" onClick={onStart} type="button">
          Start the Surprise
        </button>
      </div>
    </PageCard>
  );
}

function MemoryTimelinePage({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <PageCard
      title="B'Day Girl"
      subtitle="Swipe through some beautiful moments."
      isDarkMode={isDarkMode}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`flex flex-col gap-4 rounded-3xl border p-6 shadow-lg transition-colors duration-300 sm:flex-row sm:gap-6 sm:p-8 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800/80"
                  : "border-pink-100 bg-white/95"
              }`}
            >
              {/* Image */}
              <div className="h-64 w-full overflow-hidden rounded-2xl sm:h-80 sm:w-[45%]">
                <img
                  src={memories[currentIndex].image}
                  alt={memories[currentIndex].title}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className={`flex flex-col justify-center gap-3 sm:w-[55%] ${
                isDarkMode ? "text-gray-100" : "text-[#422b3e]"
              }`}>
                <h3 className={`font-['Playfair_Display',serif] text-2xl font-semibold leading-snug sm:text-3xl ${
                  isDarkMode ? "text-pink-300" : "text-[#8e3f6b]"
                }`}>
                  {memories[currentIndex].title}
                </h3>
                <p className={`text-sm leading-relaxed sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-[#67485c]"
                }`}>
                  {memories[currentIndex].caption}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex w-full items-center justify-between">
          <button
            onClick={goToPrevious}
            className={`rounded-full p-3 transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-pink-100 hover:bg-pink-200 text-[#b23f79]"
            }`}
            aria-label="Previous memory"
            type="button"
          >
            &#8592;
          </button>

          {/* Dots Navigation */}
          <div className="flex gap-2">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? isDarkMode
                      ? "w-8 bg-pink-400"
                      : "w-8 bg-pink-500"
                    : isDarkMode
                      ? "w-2.5 bg-gray-600"
                      : "w-2.5 bg-pink-200"
                }`}
                aria-label={`Go to memory ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className={`rounded-full p-3 transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-pink-100 hover:bg-pink-200 text-[#b23f79]"
            }`}
            aria-label="Next memory"
            type="button"
          >
            &#8594;
          </button>
        </div>

        {/* Counter */}
        <p className={`text-sm font-semibold ${
          isDarkMode ? "text-gray-400" : "text-[#8a4f76]"
        }`}>
          {currentIndex + 1} / {memories.length}
        </p>
      </div>
    </PageCard>
  );
}

function MessagePage({ isDarkMode = false }: { isDarkMode?: boolean }) {
  return (
    <PageCard title="A message for you" subtitle="Play this when you want my voice near you." isDarkMode={isDarkMode}>
      <div className="glow-frame rounded-3xl p-3">
        <video controls className="w-full rounded-2xl" preload="none" poster="https://picsum.photos/seed/video-poster/900/500">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>
      <audio controls className="mt-4 w-full">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
      </audio>
    </PageCard>
  );
}

function LoveLetterPage({ active, isDarkMode = false }: LetterProps & { isDarkMode?: boolean }) {
  const fullText =
    `
    A very Happy B'day cutiee😘🫶,
    On your last B'day ham Gorakhpur mei thebut sath nai the, now we're together but we are not in Gorakhpur. This world is really harsh🥹🫂.....but I'm really thankful to this world because it lead me to you🫶.....you made my past 1 year really fun, joyous and memorable. I was excited to meet you with the same energy everyday.
    I really wanted to be with you today because it's your first B'day together🫂. But maybe someday in the future 🥹🫶. I really wanted to make your B'day special but I had no clue how to do it so I just tried to come up with all the things that will make you think of me when you're in Dharwad. Sorry for being so selfish but I just want to be in all your good memories.🫂
    I'm really proud of you cuttuuu😘. You cleared your interview in just 2 attempts, this is the proof that you don't have to worry much about your future because you're very smart and intelligent. You'll do great in your intern and I'll also try to catch upto your level. And if you do not feel good you can message and call me anytime. I'll do anything to bring that cute smile back to your face🫶🥹.
    I love you Anju Mani and I'm always here for you 🫶🏽.
    Forever yours,
    Snehil`;

  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;
    setTyped("");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 28);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <PageCard title="Love Letter" subtitle="Written with all the words I still never say enough." isDarkMode={isDarkMode}>
      <div className="rounded-[26px] border border-[#f0d6e5] bg-[linear-gradient(160deg,_#fffdfb,_#fff2f8)] p-5 shadow-[inset_0_1px_12px_rgba(220,144,177,0.2)]">
        <p className="whitespace-pre-line text-left font-['Playfair_Display',serif] text-[1.03rem] leading-relaxed text-[#5f3d53]">
          {typed}
          <span className="typing-caret">|</span>
        </p>
      </div>
    </PageCard>
  );
}

function InteractivePage({
  isDarkMode = false,
  onPerfectUnlockChange,
  onNextPage,
}: {
  isDarkMode?: boolean;
  onPerfectUnlockChange: (unlocked: boolean) => void;
  onNextPage: () => void;
}) {
    const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!REQUIRE_PERFECT_SCORE_TO_ADVANCE) {
      onPerfectUnlockChange(true);
      return;
    }
    onPerfectUnlockChange(completed && score === quiz.length);
  }, [completed, score, onPerfectUnlockChange]);

  const quiz = [
    {
      q: "Best Date?",
      options: ["The regular Rowdy Date", "Bati Chokha at Batipur", "Scooty date", "Long walks"],
      answer: "Scooty date",
    },
    {
      q: "Date of our 1st pic together(Just us)",
      options: ["1st Aug", "9th Aug","11th Aug", "21st Aug"],
      answer: "9th Aug",
    },
    {
      q: "Name the scooty in our 1st scooty date🤓 ",
      options: ["Activa", "Duet","Jupiter", "Pept"],
      answer: "Duet",
    },
    
  ];

  const submitAnswer = () => {
    if (completed) return;
    if (!picked) {
      showToast("Please pick an option first.", "error");
      return;
    }

    const isCorrect = picked === quiz[question].answer;
    const nextScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      showToast("Correct answer.", "success");
    } else {
      showToast("Wrong answer.", "error");
    }

    if (question < quiz.length - 1) {
      setQuestion((prev) => prev + 1);
      setPicked("");
      return;
    }
    setCompleted(true);
    if (nextScore === quiz.length) {
      setShowCelebrationModal(true);
    }
  };

  const finished = completed;
  const isPerfectScore = score === quiz.length;

  const resetQuiz = () => {
    setQuestion(0);
    setScore(0);
    setPicked("");
    setCompleted(false);
    setShowCelebrationModal(false);
    showToast("Quiz reset. Try once more.", "success");
  };

  return (
    <PageCard title="Cute Corner" subtitle="Play our tiny quiz." isDarkMode={isDarkMode}>
      <div className="space-y-5">
    

        <div className="rounded-2xl border border-[#f4d6e5] bg-white/90 p-4">
          <p className="text-left text-sm font-semibold text-[#7a4864]">{quiz[question].q}</p>
          <div className="mt-3 space-y-2">
            {quiz[question].options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setPicked(option)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                  picked === option
                    ? "border-pink-300 bg-pink-100 text-[#813d63]"
                    : "border-pink-100 bg-white text-[#6f4c62]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="romantic-btn mt-4 w-full" onClick={submitAnswer} type="button">
            {question === quiz.length - 1 ? "Finish Quiz" : "Next"}
          </button>
          <AnimatePresence>
            {toast ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`toast-inline mt-3 ${toast.type === "success" ? "toast-success" : "toast-error"}`}
                role="status"
                aria-live="polite"
              >
                {toast.message}
              </motion.div>
            ) : null}
          </AnimatePresence>
          <p className="mt-3 text-sm text-[#7b5470]">Score: {score}/{quiz.length}</p>
          {finished ? (
            <p className="mt-2 text-sm font-semibold text-[#a13e6e]">
              {isPerfectScore ? "Noooiicee...You know us too well" : "Awww.....almost sahi tha"}
            </p>
          ) : null}
          {finished && REQUIRE_PERFECT_SCORE_TO_ADVANCE && !isPerfectScore ? (
            <button className="romantic-btn mt-3 w-full" onClick={resetQuiz} type="button">
              Retry for Perfect Score
            </button>
          ) : null}
        </div>
      </div>
      <AnimatePresence>
        {showCelebrationModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 p-4"
          >
            <motion.div
              initial={{ scale: 0.88, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl ${
                isDarkMode
                  ? "border-pink-300/50 bg-gray-900 text-white"
                  : "border-pink-200 bg-white text-[#422b3e]"
              }`}
            >
              <h3 className="text-center font-['Great_Vibes',cursive] text-5xl text-pink-500">
                Perfect Score!
              </h3>
              <p className="mt-2 text-center text-sm font-semibold">
                You know us so well
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-pink-200">
                <img
                  src={kissGif}
                  alt="Celebration confetti"
                  className="h-48 w-full object-contain"
                />
              </div>
              {/* <audio controls autoPlay className="mt-3 w-full">
                <source src="https://www.w3schools.com/html/party.mp3" type="audio/mpeg" />
              </audio> */}
              <button
                type="button"
                className="romantic-btn mt-4 w-full"
                onClick={() => {
                  setShowCelebrationModal(false);
                  onNextPage();
                }}
              >
                Move to Next Page
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageCard>
  );
}

function FuturePage({ isDarkMode = false }: { isDarkMode?: boolean }) {
  return (
    <PageCard
      title="Us, Next"
      subtitle="The Bucket list(change hoti rahegi 👉🏽👈🏽)"
      isDarkMode={isDarkMode}
    >
      <div className="mt-4 space-y-2">
        {futurePlans.map((plan, index) => (
          <motion.p
            key={plan}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-xl px-3 py-2 text-sm ${
              isDarkMode
                ? "bg-gray-700/80 text-gray-200"
                : "bg-white/75 text-[#66455a]"
            }`}
          >
            {index + 1}. {plan}
          </motion.p>
        ))}
      </div>
    </PageCard>
  );
}

function ThankYouPage({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2.5,
        duration: 1.8 + Math.random() * 2.2,
      })),
    [],
  );

  return (
    <section className="relative w-full overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(145deg,rgba(255,245,252,0.95),rgba(255,223,240,0.88),rgba(245,239,255,0.92))] p-5 shadow-[0_20px_50px_rgba(147,77,111,0.25)] sm:p-8">
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_15%_20%,rgba(255,180,214,0.22),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(196,181,253,0.24),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.2),transparent_45%)]"
            : "bg-[radial-gradient(circle_at_15%_20%,rgba(255,140,191,0.22),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(216,180,254,0.24),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.2),transparent_45%)]"
        }`}
      />

      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute text-lg"
          style={{ left: sparkle.left, top: sparkle.top }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.span>
      ))}

      <div className="relative z-10 grid items-center gap-6 sm:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className={`text-xs font-semibold tracking-[0.28em] ${isDarkMode ? "text-pink-200" : "text-[#9f4b77]"}`}>
            Once Again
          </p>
          <h2
            className={`mt-2 font-['Great_Vibes',cursive] text-6xl leading-[0.95] sm:text-7xl ${
              isDarkMode ? "text-pink-200" : "text-[#b32869]"
            }`}
          >
            Happy Birthday
          </h2>
          <p className={`mt-4 text-base font-semibold sm:text-lg ${isDarkMode ? "text-gray-100" : "text-[#6a3d57]"}`}>
            Thank you for being the best part of my life.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className={`mt-2 text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-[#774f66]"}`}
          >
            I'll pray for your smile, strength, and all the memories we are still going to make together.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-2 rounded-[28px] bg-[conic-gradient(from_140deg_at_50%_50%,#f9a8d4,#fde68a,#c4b5fd,#f9a8d4)] opacity-70 blur-md" />
          <div className="relative overflow-hidden rounded-[24px] border-2 border-white/70 bg-white/60 p-2 shadow-2xl backdrop-blur-sm">
            <img
              src={thanksImg}
              alt="Birthday memory"
              className="h-[370px] w-full rounded-[18px] object-cover sm:h-[430px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default App;
